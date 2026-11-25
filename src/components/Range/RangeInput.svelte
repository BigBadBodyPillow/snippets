<script lang="ts">
  import soundUrl from './comb.mp3';

  let value = $state(50);
  let track: HTMLDivElement | undefined;
  let selector: HTMLDivElement | undefined;
  let isDragging: boolean = false;
  let dragOffset = 0;
  const minimumSoundIntervalMs = 30;
  let lastSoundPlayedAt = 0;
  const volume = 0.1;

  function playSound() {
    const now = performance.now();

    // limit instances of sound
    if (now - lastSoundPlayedAt < minimumSoundIntervalMs) return;

    const sound = new Audio(soundUrl);
    sound.volume = volume;
    lastSoundPlayedAt = now;
    sound.play();
  }

  function setValue(nextValue: number) {
    if (nextValue === value) return;

    value = nextValue;
    playSound();
  }

  function updateValue(centerX: number) {
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    if (bounds.width === 0) return;

    setValue(Math.round(Math.max(0, Math.min(1, (centerX - bounds.left) / bounds.width)) * 100));
  }

  function handlePointerDown(event: PointerEvent) {
    if (!selector || event.button !== 0) return;

    const selectorBounds = selector.getBoundingClientRect();
    dragOffset = event.clientX - (selectorBounds.left + selectorBounds.width / 2);
    isDragging = true;
    selector.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent) {
    if (isDragging) updateValue(event.clientX - dragOffset);
  }

  function handlePointerUp() {
    isDragging = false;
  }

  // keyboard events
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setValue(Math.max(0, value - 1));
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setValue(Math.min(100, value + 1));
    }
  }
</script>

<section>
  <div class="demo">
    <div class="slider">
      <div
        class="selector"
        role="slider"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={value}
        tabindex="0"
        style:left={`${value}%`}
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerUp}
        onkeydown={handleKeyDown}
        bind:this={selector}
      >
        <!-- redundant to show otehrwise becuiase of aria lables -->
        <span aria-hidden="true">{value}</span>
      </div>

      <div class="track" bind:this={track}></div>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Range Input Slider</h2>
    <p class="description">
      Description

      <a href="https://easingwizard.com/">Easing Wizard</a> for animations
    </p>
  </div>
</section>

<style>
  section {
    --selector-width: 18px;
    --selector-color: var(--accent);
    --track-width: 200px;
    --track-thickness: 5px;
    --track-background: light-dark(rgb(170, 170, 170), rgb(63, 62, 62));
    --value-color: hsl(0 0% 88%);
    --selector-border-color: light-dark(
      hsl(from var(--selector-color) h s calc(l - 8)),
      hsl(from var(--selector-color) h s calc(l - 15))
    );
    --spring-timing-function: linear(
      0,
      0.033 1%,
      0.142 2.2%,
      0.981 8.5%,
      1.122 10.5%,
      1.161 11.5%,
      1.181 12.6%,
      1.183 13.8%,
      1.163 15.2%,
      1 22%,
      0.977 23.8%,
      0.967 25.8%,
      1.006 38.9%,
      0.999 52%,
      1
    );

    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    position: relative;

    width: 100%;
    aspect-ratio: 7/2;

    display: grid;
    place-items: center;
  }

  .slider {
    display: grid;
    place-items: center;
    position: relative;
    width: var(--track-width);
  }

  /* this is the hover detector. the hover is the acutall element */
  .selector {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    display: grid;
    place-items: center;

    height: calc(var(--selector-width) + 10px);
    width: calc(var(--selector-width) + 10px);

    border-radius: 100%;
    background-color: transparent;

    cursor: pointer;

    touch-action: none;
    user-select: none;
  }
  .selector::before {
    content: '';
    inset: 0;

    height: var(--selector-width);
    width: var(--selector-width);

    border: 2px solid var(--selector-border-color);
    border-radius: 999px;
    background-color: var(--selector-color);

    transition: width 0.5s var(--spring-timing-function);
  }
  .selector:hover::before {
    width: calc(var(--selector-width) / 2);
    transform: scale(1.1);
  }
  .selector:active::before,
  .selector:focus-visible::before {
    width: calc(var(--selector-width) / 3);
  }

  .selector span {
    position: absolute;
    top: 0;

    font-family: var(--font-roboto-mono);
    font-size: var(--font-10);
    font-weight: bold;
    color: var(--value-color);

    border: 2px solid var(--selector-border-color);
    background-color: var(--selector-color);

    text-align: center;

    border-radius: 4px;
    min-width: 4.6ch; /*Magic number*/

    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 1000px;
    }

    padding: 0.25rem 0.5rem;

    visibility: hidden;
    opacity: 0;
    transition:
      opacity 0.25s,
      top 1s var(--spring-timing-function);
  }
  .selector:hover span {
    top: calc(-1 * (var(--selector-width) * 1.5));
    opacity: 1;
    visibility: visible;
  }
  .track {
    width: var(--track-width);
    height: var(--track-thickness);
    background-color: var(--track-background);
    border-radius: 999px;
  }
</style>
