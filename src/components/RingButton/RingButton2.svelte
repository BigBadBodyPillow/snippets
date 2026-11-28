<section>
  <div class="demo">
    <div class="ring-buttons">
      <button aria-label="1"></button>
      <button aria-label="2"></button>
      <button aria-label="3"></button>
      <button aria-label="4"></button>
      <button aria-label="5"></button>
      <button aria-label="6"></button>
      <button aria-label="7"></button>
      <button aria-label="8"></button>
      <div class="cover"></div>
    </div>
    <div class="edge-fade" aria-hidden="true"></div>
  </div>

  <div class="about">
    <h2 class="title">RingButton2</h2>
    <p class="description">
      <a href="https://web.poecdn.com/image/passive-skill/atlas-background-4.webp?">background</a> is
      the PoE 1 3.30 atlas tree background
    </p>
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
    --ring-size: 200px;
    --number-of-buttons: 8;
    --button-thickness: calc((pi * var(--ring-size)) / var(--number-of-buttons));
    --button-height: calc(var(--ring-size) - var(--ring-size) * 0.15);
    --button-background: rgb(50, 45, 45);
    --button-hover: var(--accent);

    width: 100%;
    aspect-ratio: 8/3;

    display: grid;
    place-items: center;
    position: relative;
    isolation: isolate;
    container-type: inline-size;

    --atlas-background: #0a0b14;
    background-color: var(--atlas-background);

    overflow: hidden;
  }
  .demo::after,
  .demo::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;

    aspect-ratio: 1;
    translate: -50% -50%;
  }
  .demo::before {
    background: url('./inner.svg') center / cover no-repeat;
    animation: spin 500s linear infinite;
  }
  .demo::after {
    background: url('./ring.svg') center / cover no-repeat;

    animation: ringRotation 50s ease-in-out infinite;
  }
  @keyframes ringRotation {
    12.5% {
      transform: rotate(60deg);
    }
    25% {
      transform: rotate(-40deg);
    }
    37.5% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(45deg);
    }
    62.5% {
      transform: rotate(-20deg);
    }
    75% {
      transform: rotate(40deg);
    }
    87.5% {
      transform: rotate(-90deg);
    }
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  .edge-fade {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image: linear-gradient(
      to right,
      var(--atlas-background),
      transparent 20%,
      transparent 80%,
      var(--atlas-background)
    );
  }

  .ring-buttons {
    position: relative;
    width: var(--ring-size);
    height: var(--ring-size);
    z-index: 1;

    border-radius: 100%;

    display: grid;
    place-items: center;
    overflow: hidden;
  }

  button {
    position: absolute;
    width: calc(var(--ring-size) / 2);
    height: var(--button-thickness);
    text-align: right;
    left: 50%;

    border: none;
    background-color: var(--button-background);
    cursor: pointer;

    --center: 45deg / 2;
    --normalise: calc(90deg - var(--center));
    --offset: 45deg;

    transform-origin: left center;
    transform: rotate(calc(var(--index) * var(--offset) - var(--normalise)));

    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);

    transition: background-color 0.25s;
  }
  button:nth-child(1) {
    --index: 0;
  }
  button:nth-child(2) {
    --index: 1;
  }
  button:nth-child(3) {
    --index: 2;
  }
  button:nth-child(4) {
    --index: 3;
  }
  button:nth-child(5) {
    --index: 4;
  }
  button:nth-child(6) {
    --index: 5;
  }
  button:nth-child(7) {
    --index: 6;
  }
  button:nth-child(8) {
    --index: 7;
  }
  button:hover {
    z-index: 10;
    background-color: var(--button-hover);
  }
  button:active {
    background-color: hsl(from var(--button-hover) h s calc(l - 20));
  }

  .cover {
    width: var(--button-height);
    aspect-ratio: 1;

    background: url('./inner.svg') center / 100cqw no-repeat;
    overflow: hidden;

    border-radius: 100%;
    z-index: 10;

    animation: spin 500s linear infinite;
  }
</style>
