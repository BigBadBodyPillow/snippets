<script lang="ts">
  import Card from './Card.svelte';

  const cards = [
    { title: 'Item 01', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 02', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 03', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 04', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 05', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 06', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 07', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 08', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 09', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 10', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 11', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 12', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 13', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 14', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 15', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 16', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 17', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Item 18', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];
</script>

<section>
  <div class="demo">
    <ul class="carousel">
      {#each cards as card, index (index)}
        <!-- <li class="card">
          <span>{card.title}</span>
          <p>{card.content}</p>
        </li> -->
        <Card title={card.title} content={card.content} />
      {/each}
    </ul>
  </div>

  <div class="about">
    <h2 class="title">Carousel</h2>
    <p class="description">
      Inspired by
      <a href="https://youtu.be/6Pd6B0ZmT6s?si=gC-mOQXHXrZb3-jh">this video</a> on new experimental /
      low support css only UI features that previously required JavaScrip.
    </p>
    <a href="https://easingwizard.com/"> easing wizard </a> linear timing function
    <br />
    <br />
    <a href="https://caniuse.com/?search=%3A%3Ascroll-button%28%29">Support</a>
  </div>
</section>

<style>
  section {
    max-height: 800px;
    height: fit-content;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    width: 100%;
    padding: 5rem;

    border: #fff;
    /* background-color: light-dark(rgb(255, 255, 255), rgb(19, 14, 14)); */
    background-color: var(--background);

    --cart-text: light-dark(
      hsl(from var(--text) h s calc(l + 25)),
      hsl(from var(--text) h s calc(l - 40))
    );
    --card-background: light-dark(rgb(255, 247, 247), rgb(36, 32, 32));

    --marker-width: 1.5rem;
    --marker-height: 0.6rem;
  }

  .carousel {
    anchor-name: --carousel;
    display: flex;
    gap: 1em;
    width: 100%;

    scroll-behavior: smooth;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;

    scroll-marker-group: after;
  }

  .carousel::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .carousel::scroll-button(*) {
    position: fixed;
    position-anchor: --carousel;

    width: 40px;
    height: 40px;

    font-family: var(--font-roboto-mono);
    font-size: 2rem;

    color: var(--text);
    background-color: var(--accent);
    padding-bottom: 0.1em; /*Magic number*/
    border: none;

    cursor: pointer;
  }

  .carousel::scroll-button(left) {
    content: '<';
    position-area: left center;
    translate: 50%;
  }

  .carousel::scroll-button(right) {
    content: '>';
    position-area: right center;
    translate: -50%;
  }

  .carousel::scroll-button(*):disabled {
    background-color: hsl(from var(--accent) h s l / 0.5);
    color: var(--text-invert);
    cursor: not-allowed;
  }

  .carousel::scroll-marker-group {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 2rem;
  }
</style>
