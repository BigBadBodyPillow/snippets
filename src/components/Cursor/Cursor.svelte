<script lang="ts">
  interface Coordinates {
    x: number;
    y: number;
  }
  type MovementDirection =
    'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
  const cursor: Coordinates = $state({ x: 0, y: 0 });
  const petOffsetX = 20;
  let pet: HTMLDivElement;
  let moveArea: HTMLDivElement;
  let previousPosition: Coordinates | undefined;
  let movementDirection: MovementDirection = $state('left');

  function normaliseMovement(position: Coordinates): Coordinates {
    const area = moveArea.getBoundingClientRect();

    const xFromLeft = position.x - area.left;
    const maxX = area.width - pet.offsetWidth;
    const yFromTop = position.y - area.top;
    const maxY = area.height - pet.offsetHeight;

    return {
      x: Math.max(0, Math.min(xFromLeft, maxX - petOffsetX * 2)),
      y: Math.max(petOffsetX, Math.min(yFromTop, maxY - petOffsetX))
    };
  }

  function handleMove(event: PointerEvent) {
    const position = normaliseMovement(event);

    cursor.x = position.x;
    cursor.y = position.y;

    pet.style.transform = `translate(${cursor.x + petOffsetX}px, ${cursor.y}px)`;

    if (pet.style.display === 'block') return;
    pet.style.visibility = 'visible';

    updateDirection(position);
  }

  function updateDirection(position: Coordinates) {
    if (!previousPosition) {
      previousPosition = position;
      return;
    }

    const deltaX = position.x - previousPosition.x;
    const deltaY = position.y - previousPosition.y;
    previousPosition = position;

    if (deltaX === 0 && deltaY === 0) return;

    const horizontal = deltaX < 0 ? 'left' : 'right';
    const vertical = deltaY < 0 ? 'up' : 'down';
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absY < absX * Math.tan(Math.PI / 8)) {
      movementDirection = deltaX < 0 ? 'left' : 'right';
    } else if (absX < absY * Math.tan(Math.PI / 8)) {
      movementDirection = deltaY < 0 ? 'up' : 'down';
    } else {
      movementDirection =
        vertical === 'up'
          ? horizontal === 'left'
            ? 'up-left'
            : 'up-right'
          : horizontal === 'left'
            ? 'down-left'
            : 'down-right';
    }
  }
</script>

<section>
  <div class="demo" bind:this={moveArea} onpointermove={handleMove} role="presentation">
    <div class="pet" bind:this={pet}>{movementDirection}</div>

    <div class="display">
      <span>x : {cursor.x}</span>
      <span>y : {cursor.y}</span>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Cursor</h2>
    <p class="description">Follows the curour</p>
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
    width: 100%;
    aspect-ratio: 16/9;
    border: 2px dashed var(--border);

    cursor: url('myArrow.svg'), auto;

    position: relative;
  }

  .pet {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: var(--accent);

    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s linear;

    color: rgb(100, 89, 246);
  }
</style>
