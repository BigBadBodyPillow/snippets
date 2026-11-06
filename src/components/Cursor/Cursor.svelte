<script lang="ts">
  interface Coordinates {
    x: number;
    y: number;
  }

  const petOffset = 16;
  const petSize = 16;
  const petSpeed = 300;

  let petPosition = $state<Coordinates>({ x: 0, y: 0 });
  let moveArea: HTMLDivElement;
  let petElement: HTMLDivElement;
  let moveDuration = $state(0);
  let previousPosition: Coordinates | undefined;
  let facingLeft = $state(true);

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }
  function calculatePadding(size: number) {
    return Math.min(petOffset, Math.max(0, (size - petSize) / 2));
  }

  function setLimit(position: number, padding: number, size: number) {
    return clamp(position, padding, size - padding - petSize);
  }

  function handleMove(event: PointerEvent) {
    const area = moveArea.getBoundingClientRect();

    const x = event.clientX - area.left - moveArea.clientLeft;
    const y = event.clientY - area.top - moveArea.clientTop;

    const horizontalPadding = calculatePadding(moveArea.clientWidth);
    const verticalPadding = calculatePadding(moveArea.clientHeight);

    const nextX = setLimit(x - petOffset / 2, horizontalPadding, moveArea.clientWidth);
    const nextY = setLimit(y - petOffset / 2, verticalPadding, moveArea.clientHeight);
    const petBounds = petElement.getBoundingClientRect();
    const currentX = petBounds.left - area.left - moveArea.clientLeft;
    const currentY = petBounds.top - area.top - moveArea.clientTop;

    moveDuration = (Math.hypot(nextX - currentX, nextY - currentY) / petSpeed) * 1000;
    petPosition.x = nextX;
    petPosition.y = nextY;

    // isMoving = true;

    if (previousPosition && Math.abs(x - previousPosition.x) > 2) {
      facingLeft = x < previousPosition.x;
    }

    previousPosition = { x, y };
  }

  function handleLeave() {
    previousPosition = undefined;
  }
</script>

<section>
  <div
    class="demo"
    bind:this={moveArea}
    onpointermove={handleMove}
    onpointerleave={handleLeave}
    role="presentation"
  >
    <div
      class="pet"
      class:faces-left={facingLeft}
      bind:this={petElement}
      style="--move-duration: {moveDuration}ms; transform: translate({petPosition.x}px, {petPosition.y}px)"
      aria-hidden="true"
    ></div>

    <div class="display">
      <span>y : {petPosition.x}</span>
      <div class="separator">|</div>
      <span>y : {petPosition.y}</span>
      <div class="separator">|</div>
      <span>direction : {facingLeft ? 'Left' : 'Right'}</span>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Cursor cat</h2>
    <p class="description">Move your pointer around the box and the cat will follow.</p>
  </div>
</section>

<style>
  section {
    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    --pet-size: 16px;

    width: 100%;
    aspect-ratio: 16/9;
    border: 2px dashed var(--border);
    cursor: url('myArrow.svg'), auto;
    position: relative;
  }

  .pet {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--pet-size);
    height: var(--pet-size);
    background-color: var(--accent);
    border-radius: 100%;
    pointer-events: none;

    transition: transform var(--move-duration) linear;
  }

  .display {
    font-family: var(--font-roboto-mono);
    font-size: var(--font-12);
    display: flex;
    gap: 8px;
  }
</style>
