<script lang="ts">
  type Direction = 'left' | 'right' | 'up' | 'down';
  interface Coordinates {
    x: number;
    y: number;
  }

  const petOffset = 10;
  const petSize = 96;
  const petSpeed = 300;
  const directionEnterTolerance = 12;
  const directionExitTolerance = 6;
  const directionDeadZone = 8;

  let petPosition = $state<Coordinates>({ x: 0, y: 0 });
  let moveArea: HTMLDivElement;
  let petElement: HTMLDivElement;
  let moveDuration = $state(0);
  let movementDirections = $state<Direction[]>([]);
  // let directionSymbol = $state('•');
  let petRotation = $state('0');

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }
  function calculatePadding(size: number) {
    return Math.min(petOffset, Math.max(0, (size - petSize) / 2));
  }

  function setLimit(position: number, padding: number, size: number) {
    return clamp(position, padding, size - padding - petSize);
  }

  function getCurrentTranslation(): Coordinates {
    const translation = getComputedStyle(petElement).translate;
    if (translation === 'none') return petPosition;

    // convert string "12px 8px" to an their own values in numbers
    const [x, y] = translation.split(' ').map(parseFloat);

    return { x: x, y: y };
  }

  function handleMove(event: PointerEvent) {
    const area = moveArea.getBoundingClientRect();

    const x = event.clientX - area.left - moveArea.clientLeft;
    const y = event.clientY - area.top - moveArea.clientTop;

    const horizontalPadding = calculatePadding(moveArea.clientWidth);
    const verticalPadding = calculatePadding(moveArea.clientHeight);

    const nextX = setLimit(x - petOffset / 2, horizontalPadding, moveArea.clientWidth);
    const nextY = setLimit(y - petOffset / 2, verticalPadding, moveArea.clientHeight);
    const currentPosition = getCurrentTranslation();

    const deltaX = nextX - currentPosition.x;
    const deltaY = nextY - currentPosition.y;

    moveDuration = (Math.hypot(deltaX, deltaY) / petSpeed) * 1000;
    petPosition.x = nextX;
    petPosition.y = nextY;

    handleDirection({ x: deltaX, y: deltaY });
    changeSymbol();
  }

  function calcTolerance(degrees: number) {
    return Math.tan((degrees * Math.PI) / 180);
  }

  function handleDirection(delta: Coordinates) {
    const horizontalMovement = Math.abs(delta.x);
    const verticalMovement = Math.abs(delta.y);
    if (Math.hypot(horizontalMovement, verticalMovement) < directionDeadZone) return;

    const hadVerticalDirection = movementDirections.some(
      (direction) => direction === 'up' || direction === 'down'
    );
    const hadHorizontalDirection = movementDirections.some(
      (direction) => direction === 'left' || direction === 'right'
    );
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
  }

  function changeSymbol() {
    switch (movementDirections.join(',')) {
      case 'up':
        // directionSymbol = '↑';
        petRotation = '90';
        break;
      case 'up,right':
        // directionSymbol = '↗';
        petRotation = '135';
        break;
      case 'right':
        // directionSymbol = '→';
        petRotation = '180';
        break;
      case 'down,right':
        // directionSymbol = '↘';
        petRotation = '-135';
        break;
      case 'down':
        // directionSymbol = '↓';
        petRotation = '-90';
        break;
      case 'down,left':
        // directionSymbol = '↙';
        petRotation = '-45';
        break;
      case 'left':
        // directionSymbol = '←';
        petRotation = '0';
        break;
      case 'up,left':
        // directionSymbol = '↖';
        petRotation = '45';
        break;
    }
  }
</script>

<section>
  <div class="demo" bind:this={moveArea} onpointermove={handleMove} role="presentation">
    <div
      class="pet"
      bind:this={petElement}
      // style=" --move-duration: {moveDuration}ms; translate: {petPosition.x}px {petPosition.y}px; rotate: {petRotation}deg"
      style="--move-duration: {moveDuration}ms; translate: {petPosition.x}px {petPosition.y}px; rotate: {petRotation}deg"
      // style="--direction:'{directionSymbol}'; --move-duration: {moveDuration}ms; translate: {petPosition.x}px {petPosition.y}px"
      aria-hidden="true"
    ></div>

    <div class="display">
      <span>x : {petPosition.x}</span>
      <div class="separator">|</div>
      <span>y : {petPosition.y}</span>
      <div class="separator">|</div>
      <span>tolerance : {directionEnterTolerance}deg</span>
      <div class="separator">{movementDirections.length ? '|' : undefined}</div>
      <span>{movementDirections.length ? movementDirections.join(', ') : undefined}</span>
    </div>
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
    margin-bottom: var(--spacing-32);
  }

  .demo {
    /* --pet-size: 52px; */
    --pet-size: 96px;

    width: 100%;
    aspect-ratio: 16/9;
    border: 2px dashed var(--border);
    cursor: url('myArrow.svg'), auto;
    position: relative;
  }

  .pet {
    --rotation: 0deg;
    position: absolute;
    /* top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
    width: var(--pet-size);
    height: var(--pet-size);
    /* background-color: var(--accent); */
    /* border-radius: 100%; */

    background: url('$lib/assets/cat.svg');
    /* background: url('$lib/assets/output.gif');
    background-size: cover;
    background-position: center; */
    background-repeat: no-repeat;
    pointer-events: none;
    will-change: transform;
    rotate: var(--rotation);

    transition: translate var(--move-duration) linear;
  }

  .pet::before {
    content: var(--direction);
    /* font-size: var(--font-12); */
    line-height: 0;
    color: rgb(255, 255, 255);
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .display {
    font-family: var(--font-roboto-mono);
    font-size: var(--font-12);
    display: flex;
    gap: 8px;
  }
</style>
