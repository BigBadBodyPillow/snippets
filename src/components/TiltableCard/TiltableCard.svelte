<script>
  import Card from './Card.svelte';
</script>

<section>
  <div class="demo">
    <Card />
  </div>

  <div class="about">
    <h2 class="title">Tiltable Card</h2>
    <div class="description">
      <p>A card that tilts towards the cursor on hover.</p>
      <p>
        <a href="https://www.mshr.app/">mshr.app</a> was used for this showcases
        <a href="https://www.mshr.app/mesh/1683634849454">background gradient and noise</a>.
      </p>
      <p><a href="https://easingwizard.com/">Easing Wizard</a> was used for the animation.</p>
      <br />
    </div>
  </div>
</section>

<style>
  section {
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    width: 100%;
    aspect-ratio: 5/4;

    display: grid;
    place-items: center;
  }

  /* MSHR Gradient */
  /* https://www.mshr.app/mesh/1683634849454 */
  /* Im ignoring this mess */
  @keyframes mshr-gradient-animation {
    0% {
      --y-0: 96%;
      --x-0: 11%;
      --s-start-0: 37%;
      --s-end-0: 90%;
      --c-0: hsla(181, 79%, 51%, 1);
      --x-1: 92%;
      --c-1: hsla(258, 100%, 64%, 1);
      --s-start-1: 31%;
      --s-end-1: 84%;
      --y-1: 89%;
      --x-2: 58%;
      --c-2: hsla(202, 95%, 54%, 1);
      --s-start-2: 41%;
      --s-end-2: 61%;
      --y-2: 7%;
      --y-3: 35%;
      --x-3: 62%;
      --s-start-3: 22%;
      --s-end-3: 59%;
      --c-3: hsla(225, 76%, 52%, 1);
      --c-4: hsla(154, 94%, 80%, 1);
      --x-4: 2%;
      --s-start-4: 19%;
      --s-end-4: 70%;
      --y-4: 63%;
    }

    100% {
      --y-0: 12%;
      --x-0: 6%;
      --s-start-0: 29%;
      --s-end-0: 73%;
      --c-0: hsla(299, 78%, 76%, 1);
      --x-1: 61%;
      --c-1: hsla(221, 87%, 56%, 1);
      --s-start-1: 8%;
      --s-end-1: 80%;
      --y-1: 6%;
      --x-2: 75%;
      --c-2: hsla(206, 88%, 81%, 1);
      --s-start-2: 29%;
      --s-end-2: 80%;
      --y-2: 23%;
      --y-3: 64%;
      --x-3: 76%;
      --s-start-3: 2%;
      --s-end-3: 81%;
      --c-3: hsla(204, 76%, 75%, 1);
      --c-4: hsla(301, 100%, 87%, 1);
      --x-4: 41%;
      --s-start-4: 24%;
      --s-end-4: 81%;
      --y-4: 86%;
    }
  }

  @property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 96%;
  }

  @property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 11%;
  }

  @property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 37%;
  }

  @property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 90%;
  }

  @property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(181, 79%, 51%, 1);
  }

  @property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 92%;
  }

  @property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(258, 100%, 64%, 1);
  }

  @property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 31%;
  }

  @property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 84%;
  }

  @property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 89%;
  }

  @property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 58%;
  }

  @property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(202, 95%, 54%, 1);
  }

  @property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 41%;
  }

  @property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 61%;
  }

  @property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 7%;
  }

  @property --y-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 35%;
  }

  @property --x-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 62%;
  }

  @property --s-start-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 22%;
  }

  @property --s-end-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 59%;
  }

  @property --c-3 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(225, 76%, 52%, 1);
  }

  @property --c-4 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(154, 94%, 80%, 1);
  }

  @property --x-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%;
  }

  @property --s-start-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 19%;
  }

  @property --s-end-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 70%;
  }

  @property --y-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 63%;
  }

  .demo {
    --y-0: 96%;
    --x-0: 11%;
    --c-0: hsla(181, 79%, 51%, 1);
    --x-1: 92%;
    --c-1: hsla(258, 100%, 64%, 1);
    --y-1: 89%;
    --x-2: 58%;
    --c-2: hsla(202, 95%, 54%, 1);
    --y-2: 7%;
    --y-3: 35%;
    --x-3: 62%;
    --c-3: hsla(225, 76%, 52%, 1);
    --c-4: hsla(154, 94%, 80%, 1);
    --x-4: 2%;
    --y-4: 63%;
    background-color: hsla(258, 82%, 70%, 1);
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 12000 12000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
      radial-gradient(
        circle at var(--x-0) var(--y-0),
        var(--c-0) var(--s-start-0),
        transparent var(--s-end-0)
      ),
      radial-gradient(
        circle at var(--x-1) var(--y-1),
        var(--c-1) var(--s-start-1),
        transparent var(--s-end-1)
      ),
      radial-gradient(
        circle at var(--x-2) var(--y-2),
        var(--c-2) var(--s-start-2),
        transparent var(--s-end-2)
      ),
      radial-gradient(
        circle at var(--x-3) var(--y-3),
        var(--c-3) var(--s-start-3),
        transparent var(--s-end-3)
      ),
      radial-gradient(
        circle at var(--x-4) var(--y-4),
        var(--c-4) var(--s-start-4),
        transparent var(--s-end-4)
      );
    animation: mshr-gradient-animation 10s linear infinite alternate;
    background-blend-mode: overlay, normal, normal, normal, normal, normal;
    will-change: transform, opacity;
    contain: paint;
  }
</style>
