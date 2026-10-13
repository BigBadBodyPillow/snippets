<script lang="ts">
  const maxRotationAngle = 12;
  let cursorPosition = $state({ x: 0, y: 0 });
  let xRotationAngle = $derived((-cursorPosition.y / 100) * maxRotationAngle);
  let yRotationAngle = $derived((-cursorPosition.x / 100) * maxRotationAngle);

  function trackCursor(event: PointerEvent) {
    if (!(event.currentTarget instanceof HTMLElement)) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;

    cursorPosition = {
      x: Math.max(
        -100,
        Math.min(
          100,
          ((event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2)) * 100
        )
      ),
      y: Math.max(
        -100,
        Math.min(
          100,
          ((bounds.top + bounds.height / 2 - event.clientY) / (bounds.height / 2)) * 100
        )
      )
    };
  }
</script>

<div
  class="card"
  role="presentation"
  onpointermove={trackCursor}
  style={`--cursor-x: ${cursorPosition.x}%; --cursor-y: ${cursorPosition.y}%; --rotation-angle-x: ${xRotationAngle}deg; --rotation-angle-y: ${yRotationAngle}deg`}
>
  <div class="border">
    <div class="inside">Text</div>
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
    height: 100%;
    max-width: 400px;
    max-height: 600px;
  }

  .card {
    --border-width: 10px;
    --border-color: light-dark(rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.4));
    --stripe-width: 10px;
    --stripe1-colour: light-dark(rgb(240, 240, 240), rgb(15, 15, 15));
    --stripe2-colour: light-dark(rgb(235, 235, 235), rgb(20, 20, 20));
    --transition-duration: 700ms;

    perspective: 500px;
  }

  .border {
    position: relative;

    /* the "border" */
    padding: var(--border-width);
    background-color: var(--border-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

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
    width: 100%;
    height: 100%;
    background-color: var(--background);
    background: repeating-linear-gradient(
      135deg,
      var(--stripe1-colour),
      var(--stripe1-colour) var(--stripe-width),
      var(--stripe2-colour) var(--stripe-width),
      var(--stripe2-colour) calc(var(--stripe-width) * 2)
    );
  }
</style>
