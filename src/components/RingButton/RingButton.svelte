<script lang="ts">
  import Segment from './Segment.svelte';
</script>

<section>
  <div class="demo">
    <div class="ring-buttons" role="group" aria-label="Ring segments">
      <Segment ariaLabel="1" />
      <Segment ariaLabel="2" />
      <Segment ariaLabel="3" />
      <Segment ariaLabel="4" />
      <Segment ariaLabel="5" />
      <Segment ariaLabel="6" />
      <Segment ariaLabel="7" />
      <Segment ariaLabel="8" />
    </div>
  </div>

  <div class="about">
    <h2 class="title">Ring Button</h2>
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
    --button-size: 200px;

    width: 100%;
    aspect-ratio: 8/3;

    display: grid;
    place-items: center;
    position: relative;

    --atlas-background: #0a0b14;
    background-color: var(--atlas-background);

    overflow: hidden;

    mask-image:
      linear-gradient(
        to right,
        transparent,
        var(--atlas-background) 20%,
        var(--atlas-background) 80%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent,
        var(--atlas-background) 8%,
        var(--atlas-background) 92%,
        transparent 100%
      );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-composite: intersect;
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

    z-index: -1;
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

  .ring-buttons {
    position: relative;
    width: var(--button-size);
    height: var(--button-size);
  }

  /* 
  triangles
  points [a, b, c]
  [a] is always where [b] was previously
  [b] will be where ever makes the rest of the right isosceles triaangle
  [c] is the center always a 50% 50%

  a ------|------ b
  |             ╱
  |           ╱
  |         ╱
  —       ╱
  |     ╱
  |   ╱
  | ╱
  c 

  */

  /* 0 - 45 */
  :global(.segment:nth-child(1)) {
    clip-path: polygon(50% 0%, 100% 0%, 50% 50%);
  }
  /* 45 - 90 */
  :global(.segment:nth-child(2)) {
    clip-path: polygon(100% 0%, 100% 50%, 50% 50%);
  }
  /* 90 - 135 */
  :global(.segment:nth-child(3)) {
    clip-path: polygon(100% 50%, 100% 100%, 50% 50%);
  }
  /* 135 - 180 */
  :global(.segment:nth-child(4)) {
    clip-path: polygon(100% 100%, 50% 100%, 50% 50%);
  }
  /* 180 - 225 */
  :global(.segment:nth-child(5)) {
    clip-path: polygon(50% 100%, 0% 100%, 50% 50%);
  }
  /* 225 - 270 */
  :global(.segment:nth-child(6)) {
    clip-path: polygon(0% 100%, 0% 50%, 50% 50%);
  }
  /* 270 - 315  */
  :global(.segment:nth-child(7)) {
    clip-path: polygon(0% 50%, 0% 0%, 50% 50%);
  }
  /* 315 - 360 */
  :global(.segment:nth-child(8)) {
    clip-path: polygon(0% 0%, 50% 0%, 50% 50%);
  }
</style>
