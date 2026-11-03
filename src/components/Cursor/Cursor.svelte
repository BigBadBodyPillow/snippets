<script lang="ts">
  interface Coordinates {
    x: number;
    y: number;
  }
  const cursor = $state<Coordinates>({ x: 0, y: 0 });
  const petOffsetX = 20;
  let pet: HTMLDivElement;
  let moveArea: HTMLDivElement;

  function normaliseMovement(position: Coordinates): Coordinates {
    const area = moveArea.getBoundingClientRect();

    const xFromLeft = position.x - area.left;
    const maxX = area.width - pet.offsetWidth;
    const yFromTop = position.y - area.top;
    const maxY = area.height - pet.offsetHeight;

    return {
      x: Math.max(0, Math.min(xFromLeft, maxX - petOffsetX * 2)),
      y: Math.max(0, Math.min(yFromTop + petOffsetX, maxY - petOffsetX))
    };
  }

  function handleMove(event: PointerEvent) {
    const position = normaliseMovement(event);

    cursor.x = position.x;
    cursor.y = position.y;

    pet.style.left = `${cursor.x + petOffsetX}px`;
    pet.style.top = `${cursor.y}px`;

    if (pet.style.display === 'block') return;
    pet.style.display = 'block';
  }
</script>

<section>
  <div class="demo" bind:this={moveArea} onpointermove={handleMove} role="presentation">
    <div class="pet" bind:this={pet}></div>

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

    display: none;
    position: absolute;
  }
</style>
