export function smoothScroll() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wheelAcceleration = 0.012;
  const maxVelocity = 33;
  const momentumRetention = 0.9;
  let velocity = 0;
  let animationFrame = 0;
  let lastFrameTime = 0;

  function stopMomentum() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastFrameTime = 0;
    velocity = 0;
  }

  function hasScrollableAncestor(target: EventTarget | null, deltaY: number) {
    for (const element of eventPath(target)) {
      if (
        !(element instanceof HTMLElement) ||
        element === document.body ||
        element === document.documentElement
      ) {
        continue;
      }

      const { overflowY } = window.getComputedStyle(element);
      const canScroll = element.scrollHeight > element.clientHeight;
      const scrollsVertically =
        overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
      const hasRoomToScroll =
        deltaY < 0
          ? element.scrollTop > 0
          : element.scrollTop + element.clientHeight < element.scrollHeight;

      if (canScroll && scrollsVertically && hasRoomToScroll) {
        return true;
      }
    }

    return false;
  }

  function eventPath(target: EventTarget | null) {
    const path: EventTarget[] = [];
    let element = target;

    while (element) {
      path.push(element);
      element = element instanceof Node ? element.parentNode : null;
    }

    return path;
  }

  function animateScroll(time: number) {
    const elapsed = lastFrameTime === 0 ? 16.67 : Math.min(time - lastFrameTime, 32);
    lastFrameTime = time;

    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const nextScrollY = Math.max(0, Math.min(maxScrollY, window.scrollY + velocity * elapsed));
    window.scrollTo(0, nextScrollY);

    if ((nextScrollY === 0 && velocity < 0) || (nextScrollY === maxScrollY && velocity > 0)) {
      velocity = 0;
    } else {
      velocity *= Math.pow(momentumRetention, elapsed / 16.67);
    }

    if (Math.abs(velocity) < 0.02) {
      animationFrame = 0;
      lastFrameTime = 0;
      velocity = 0;
      return;
    }

    animationFrame = requestAnimationFrame(animateScroll);
  }

  function handleWheel(event: WheelEvent) {
    if (
      reducedMotion.matches ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.deltaX !== 0 ||
      event.deltaY === 0
    ) {
      stopMomentum();
      return;
    }

    if (hasScrollableAncestor(event.target, event.deltaY)) {
      stopMomentum();
      return;
    }

    const deltaY =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? event.deltaY * 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? event.deltaY * window.innerHeight
          : event.deltaY;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const canScrollPage = deltaY < 0 ? window.scrollY > 0 : window.scrollY < maxScrollY;
    if (!canScrollPage) {
      return;
    }

    event.preventDefault();
    velocity = Math.max(-maxVelocity, Math.min(maxVelocity, velocity + deltaY * wheelAcceleration));

    if (animationFrame === 0) {
      animationFrame = requestAnimationFrame(animateScroll);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' '].includes(event.key)) {
      stopMomentum();
    }
  }

  function handleMotionPreferenceChange() {
    if (reducedMotion.matches) {
      stopMomentum();
    }
  }

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('pointerdown', stopMomentum);
  window.addEventListener('touchstart', stopMomentum, { passive: true });
  reducedMotion.addEventListener('change', handleMotionPreferenceChange);

  return () => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('pointerdown', stopMomentum);
    window.removeEventListener('touchstart', stopMomentum);
    reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    cancelAnimationFrame(animationFrame);
  };
}
