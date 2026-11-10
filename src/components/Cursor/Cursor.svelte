<script lang="ts">
  import { onDestroy } from 'svelte';

  type Direction = 'left' | 'right' | 'up' | 'down';
  interface Coordinates {
    x: number;
    y: number;
  }

  const petOffset = 10;
  const petSize = 48;
  const cursorBufferRadius = 10;
  const cursorResumeRadius = 15;
  const petRadius = Math.hypot(petSize / 2, petSize / 2);
  const petSpeed = 300;
  const directionEnterTolerance = 12;
  const directionExitTolerance = directionEnterTolerance / 2;
  const directionDeadZone = 0.1;

  let petPosition = $state<Coordinates>({ x: 0, y: 0 });
  let moveArea: HTMLDivElement;
  let movementDirections = $state<Direction[]>([]);
  let petRotation = $state(0);
  let targetPosition: Coordinates = { x: 0, y: 0 };
  let animationFrame: number | null = null;
  let lastFrameTime: number | null = null;
  let isFollowing = false;

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }
  function calculatePadding(size: number) {
    return Math.min(petOffset, Math.max(0, (size - petSize) / 2));
  }

  function setLimit(position: number, padding: number, size: number) {
    return clamp(position, padding, size - padding - petSize);
  }

  function animatePet(timestamp: number) {
    animationFrame = null;
    // prevent jumping / frame skipping after a blocked or backgrounded frame.
    const elapsed = lastFrameTime === null ? 0 : Math.min(timestamp - lastFrameTime, 50);
    lastFrameTime = timestamp;

    const deltaX = targetPosition.x - petPosition.x;
    const deltaY = targetPosition.y - petPosition.y;
    const distance = Math.hypot(deltaX, deltaY);
    const distanceToMove = (petSpeed * elapsed) / 1000;

    if (distance <= distanceToMove || distance < 0.1) {
      updatePetDirection({ x: deltaX, y: deltaY });
      petPosition = { ...targetPosition };
      lastFrameTime = null;
      isFollowing = false;
      return;
    }

    const progress = distanceToMove / distance;
    const movement = { x: deltaX * progress, y: deltaY * progress };
    updatePetDirection(movement);
    petPosition = {
      x: petPosition.x + movement.x,
      y: petPosition.y + movement.y
    };
    animationFrame = requestAnimationFrame(animatePet);
  }

  function startAnimation() {
    if (animationFrame !== null) return;
    lastFrameTime = null;
    animationFrame = requestAnimationFrame(animatePet);
  }

  function stopFollowing() {
    isFollowing = false;
    targetPosition = { ...petPosition };
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    lastFrameTime = null;
  }

  function getPointerPosition(event: PointerEvent): Coordinates {
    const area = moveArea.getBoundingClientRect();
    return {
      x: event.clientX - area.left - moveArea.clientLeft,
      y: event.clientY - area.top - moveArea.clientTop
    };
  }

  function getDistanceFromPet(pointer: Coordinates) {
    const centerX = petPosition.x + petSize / 2;
    const centerY = petPosition.y + petSize / 2;
    return Math.max(0, Math.hypot(pointer.x - centerX, pointer.y - centerY) - petRadius);
  }

  function shouldFollowPointer(pointer: Coordinates): boolean {
    const distanceFromPet = getDistanceFromPet(pointer);
    if (!isFollowing) {
      if (distanceFromPet <= cursorResumeRadius) return false;
      isFollowing = true;
    } else if (distanceFromPet <= cursorBufferRadius) {
      stopFollowing();
      return false;
    }

    return true;
  }

  function getTargetPosition(pointer: Coordinates): Coordinates {
    const centerX = petPosition.x + petSize / 2;
    const centerY = petPosition.y + petSize / 2;
    const offsetX = pointer.x - centerX;
    const offsetY = pointer.y - centerY;
    const centerDistance = Math.hypot(offsetX, offsetY);
    const directionX = centerDistance > 0 ? offsetX / centerDistance : 1;
    const directionY = centerDistance > 0 ? offsetY / centerDistance : 0;
    const minimumDistance = petRadius + cursorBufferRadius;
    const horizontalPadding = calculatePadding(moveArea.clientWidth);
    const verticalPadding = calculatePadding(moveArea.clientHeight);

    return {
      x: setLimit(
        pointer.x - directionX * minimumDistance - petSize / 2,
        horizontalPadding,
        moveArea.clientWidth
      ),
      y: setLimit(
        pointer.y - directionY * minimumDistance - petSize / 2,
        verticalPadding,
        moveArea.clientHeight
      )
    };
  }

  function handleMove(event: PointerEvent) {
    const pointer = getPointerPosition(event);
    if (!shouldFollowPointer(pointer)) return;

    targetPosition = getTargetPosition(pointer);
    startAnimation();
  }

  onDestroy(() => {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
  });

  function calcTolerance(degrees: number) {
    return Math.tan((degrees * Math.PI) / 180);
  }

  function updatePetDirection(delta: Coordinates) {
    const horizontalMovement = Math.abs(delta.x);
    const verticalMovement = Math.abs(delta.y);
    if (Math.hypot(horizontalMovement, verticalMovement) < directionDeadZone) return;

    const hadVerticalDirection = movementDirections.some(
      (direction) => direction === 'up' || direction === 'down'
    );
    const hadHorizontalDirection = movementDirections.some(
      (direction) => direction === 'left' || direction === 'right'
    );
    // taper angle to avoid flickering with digfaognals
    const horizontalTolerance = calcTolerance(
      hadVerticalDirection ? directionExitTolerance : directionEnterTolerance
    );
    const verticalTolerance = calcTolerance(
      hadHorizontalDirection ? directionExitTolerance : directionEnterTolerance
    );
    const isHorizontal = verticalMovement <= horizontalMovement * horizontalTolerance;
    const isVertical = horizontalMovement <= verticalMovement * verticalTolerance;
    const nextDirections: Direction[] = [];

    if (!isHorizontal) {
      if (delta.y < 0) nextDirections.push('up');
      else if (delta.y > 0) nextDirections.push('down');
    }

    if (!isVertical) {
      if (delta.x > 0) nextDirections.push('right');
      else if (delta.x < 0) nextDirections.push('left');
    }

    movementDirections = nextDirections;
    updatePetAppearance();
  }

  function updatePetAppearance() {
    switch (movementDirections.join(',')) {
      case 'up':
        petRotation = 90;
        break;
      case 'up,right':
        petRotation = 135;
        break;
      case 'right':
        petRotation = 180;
        break;
      case 'down,right':
        petRotation = -135;
        break;
      case 'down':
        petRotation = -90;
        break;
      case 'down,left':
        petRotation = -45;
        break;
      case 'left':
        petRotation = 0;
        break;
      case 'up,left':
        petRotation = 45;
        break;
    }
  }
</script>

<section>
  <div
    class="demo"
    style="--pet-size: {petSize}px"
    bind:this={moveArea}
    onpointermove={handleMove}
    role="presentation"
  >
    <div
      class="pet"
      style="transform: translate3d({petPosition.x}px, {petPosition.y}px, 0) rotate({petRotation}deg)"
      aria-hidden="true"
    ></div>
  </div>

  <div class="about">
    <h2 class="title">Cursor pet</h2>
    <p class="description">Move your pointer around the box and the cat will follow.</p>
  </div>
</section>

<style>
  section {
    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
  }

  .demo {
    width: 100%;
    aspect-ratio: 16/9;
    border: 2px dashed var(--border);
    position: relative;
  }

  .pet {
    position: absolute;
    width: var(--pet-size);
    height: var(--pet-size);

    background: url('./cat.svg');
    background-repeat: no-repeat;
    pointer-events: none;
    will-change: transform;
  }
</style>
