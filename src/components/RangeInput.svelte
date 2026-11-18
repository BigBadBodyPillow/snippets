<section>
  <div class="demo">
    <!-- == TODO == -->
    <!-- Sound? -->
    <!-- The rest -->
    <div class="slider">
      <div class="selector"></div>
      <div class="track">
        <div class="markers"></div>
      </div>
    </div>

    <div class="display">
      <span>value: </span>
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
    --track-background: rgb(63, 62, 62);

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
  }

  /* this is the hover detector. the before is the actuall visible element from the users presepctive */
  .selector {
    position: absolute;
    display: grid;
    place-items: center;

    height: calc(var(--selector-width) + 10px);
    width: calc(var(--selector-width) + 10px);

    border-radius: 100%;
    background-color: transparent;

    cursor: pointer;
  }
  .selector::before {
    content: '';
    inset: 0;

    height: var(--selector-width);
    width: var(--selector-width);

    border: 2px solid hsl(from var(--selector-color) h s calc(l - 15));
    border-radius: 999px;
    background-color: var(--selector-color);

    transition: width 0.5s
      linear(
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
  }
  .selector:hover::before {
    width: calc(var(--selector-width) / 2);
    transform: scale(1.1);
  }
  .selector:active::before {
    width: calc(var(--selector-width) / 3);
  }

  .track {
    width: var(--track-width);
    height: var(--track-thickness);
    background-color: var(--track-background);
    border-radius: 999px;
  }

  .display {
    position: absolute;
    left: 0;
    top: 0;
    font-size: var(--font-12);
    font-family: var(--font-roboto-mono);
  }
</style>
