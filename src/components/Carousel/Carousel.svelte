<script lang="ts">
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
        <li class="card">
          <span>{card.title}</span>
          <p>{card.content}</p>
        </li>
      {/each}
    </ul>
  </div>

  <div class="about">
    <h2 class="title">Carousel</h2>
    <p class="description">
      Inspired by <a href="https://www.youtube.com/@coding2go">Coding2GO's</a>
      <a href="https://youtu.be/6Pd6B0ZmT6s?si=gC-mOQXHXrZb3-jh">Video</a> on new experimental / low support
      css only UI features that previously required JavaScrip
    </p>
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
    background-color: rgb(19, 14, 14);

    --card-title: white;
    --cart-text: hsl(from var(--text) h s 73);
    --card-background: rgb(36, 32, 32);
    --border: rgb(66, 66, 66);
    --accent: rgb(105, 6, 19);
  }

  .carousel {
    anchor-name: --carousel;
    width: 100%;
    display: flex;
    gap: 1em;
    scroll-behavior: smooth;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
    scroll-marker-group: after;
  }
  .card {
    min-width: 250px;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--card-background);
    padding: 2em;
    color: var(--cart-text);
    border: 1px solid var(--border);
    list-style: none;

    transition: transform 200ms;
  }

  .card:hover {
    transform: scale(0.95) rotate(2deg);
  }

  .carousel::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .carousel::scroll-button(*) {
    border: none;
    background-color: var(--accent);
    font-family: Consolas;
    font-size: 2rem;
    color: var(--text);
    height: 40px;
    width: 40px;
    padding-bottom: 0.1em;
    cursor: pointer;
    position: fixed;
    position-anchor: --carousel;
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
    opacity: 0.5;
    cursor: auto;
  }

  .carousel::scroll-marker-group {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 1.25rem;
  }

  .card::scroll-marker {
    content: '';
    height: 0.6rem;
    width: 1.34rem;
    background: var(--border);
  }

  .card::scroll-marker:target-current {
    background: var(--accent);
  }

  .card span {
    color: var(--card-title);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }
</style>
