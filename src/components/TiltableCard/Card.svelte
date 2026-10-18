<script lang="ts">
  const maxRotationAngle = 12;
  let cursorPosition = $state({ x: 0, y: 0 });
  let xRotationAngle = $derived((-cursorPosition.y / 100) * maxRotationAngle);
  let yRotationAngle = $derived((-cursorPosition.x / 100) * maxRotationAngle);

  // returns the cursor position as a percentage of the distance away from the elements center
  function trackCursor(event: PointerEvent) {
    if (!(event.currentTarget instanceof HTMLElement)) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const halfElementWidth = bounds.width / 2;
    const halfElementHeight = bounds.height / 2;

    const centerX = bounds.left + halfElementWidth;
    const centerY = bounds.top + halfElementHeight;

    const distanceFromCenterX = event.clientX - centerX;
    const distanceFromCenterY = centerY - event.clientY;

    // range [-1, 1]
    const normalisedX = distanceFromCenterX / halfElementWidth;
    const normalisedY = distanceFromCenterY / halfElementHeight;

    cursorPosition = {
      x: normalisedX * 100,
      y: normalisedY * 100
    };
  }

  // ============ examples ============
  // ---------------- [   x%  |   y%  ]
  // center           [   0%  |   0%  ]
  // ------------ corners -------------
  // top left         [ -100% |  100% ]
  // top right        [  100% |  100% ]
  // bottom left      [ -100% | -100% ]
  // bottom right     [  100% | -100% ]
  // ------------- edges --------------
  // center of top    [   0%  |  100% ]
  // center of left   [ -100% |   0%  ]
  // center of bottom [   0%  | -100% ]
  // center of right  [  100% |   0%  ]
</script>

<div
  class="card"
  role="presentation"
  onpointermove={trackCursor}
  style={`--cursor-x: ${cursorPosition.x}%; --cursor-y: ${cursorPosition.y}%; --rotation-angle-x: ${xRotationAngle}deg; --rotation-angle-y: ${yRotationAngle}deg`}
>
  <div class="border">
    <div class="inside">
      <div class="picture">
        <div class="image"></div>
      </div>

      <div class="content">
        <h3>Lorem ipsum</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, excepturi alias totam
          sequi maiores numquam minus commodi.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  /* 
    .border will rotate when .card is hovered.
    the purpse of doing this when .card is hovered 
    and not when .border is hovered is because
    transform changes the shape of the element,
    which can cause the cursor to no longer be on the element.
  */

  .card,
  .border {
    width: 100%;
    max-width: var(--card-width);
    aspect-ratio: 2/3;
  }

  .card {
    --border-width: 10px;
    --border-color: light-dark(rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.4));
    --stripe-width: 10px;
    --stripe1-colour: light-dark(rgb(240, 240, 240), rgb(15, 15, 15));
    --stripe2-colour: light-dark(rgb(235, 235, 235), rgb(20, 20, 20));
    --transition-duration: 700ms;
    --card-width: 350px;

    perspective: 500px;
    cursor: grabbing;
  }

  .border {
    position: relative;

    padding: var(--border-width);
    background-color: var(--border-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    backface-visibility: hidden;
    will-change: transform;

    /* https://easingwizard.com/ */
    transition: transform var(--transition-duration)
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

  .card:hover .border {
    transform: rotateX(var(--rotation-angle-x)) rotateY(var(--rotation-angle-y));
  }

  .inside {
    --inside-radius: var(--radius);

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-20);
    padding: var(--spacing-16);

    background-color: var(--background);
    background: repeating-linear-gradient(
      135deg,
      var(--stripe1-colour),
      var(--stripe1-colour) var(--stripe-width),
      var(--stripe2-colour) var(--stripe-width),
      var(--stripe2-colour) calc(var(--stripe-width) * 2)
    );

    overflow: hidden;
  }

  .picture {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 400px;
    position: relative;
    isolation: isolate;
    border-radius: 0 0 var(--inside-radius) var(--inside-radius);
    /* background: url('$lib/assets/n-i-x-e-u-blood-or-blush-b-tt.jpg') center / cover; */
    background: url('$lib/assets/Bloody Valentine.jpg') center / cover;
  }

  .picture:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: inherit;
    filter: blur(80px) saturate(2.8);
    scale: 1.1;
  }

  @media (prefers-color-scheme: light) {
    .picture:before {
      filter: blur(80px) saturate(10);
      scale: 0.9;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: inherit;
    background: inherit;
  }

  .content {
    --content-border: light-dark(rgba(255, 255, 255, 0.3), rgba(70, 70, 70, 0.3));

    position: relative;
    height: 100%;
    z-index: 100;

    padding: var(--spacing-10);
    border: 2px solid var(--content-border);
    border-radius: var(--inside-radius) var(--inside-radius) 0 0;

    font-family: var(--font-space-grotesk);
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: auto;

    :before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;

      /* background-color: var(--content-border); */
      /* filter: blur(13px); */

      backdrop-filter: blur(4px);
    }

    p {
      font-size: var(--font-16);
      font-family: var(--font-inter);
      line-height: 1.5;
      color: light-dark(
        hsl(from var(--text) h s calc(l + 12)),
        hsl(from var(--text) h s calc(l - 12))
      );
    }
  }
</style>
