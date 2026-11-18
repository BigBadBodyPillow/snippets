<section>
  <div class="demo">
    <label for="range" class="range">
      <span>Range</span>
      <input type="range" />
    </label>

    <div class="display">
      <span>value: </span>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Range Input Slider</h2>
    <p class="description">Description</p>
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
    position: relative;

    width: 100%;
    aspect-ratio: 7/2;

    display: grid;
    place-items: center;
  }

  .range {
    display: flex;
    flex-direction: column;
  }

  .range span {
    font-size: var(--font-12);
    font-family: var(--font-space-grotesk);
  }

  .display {
    position: absolute;
    left: 0;
    top: 0;
    font-size: var(--font-12);
    font-family: var(--font-roboto-mono);
  }
</style>
