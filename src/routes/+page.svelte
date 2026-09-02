<script>
  import Acordian from '../components/Acordian.svelte';
  import Carousel from '../components/Carousel/Carousel.svelte';
  import Nav from '../components/Nav/Nav.svelte';
  import Texture from '../components/Texture/Texture.svelte';
</script>

<div>
  <Carousel />

  <Nav />

  <Acordian />

  <Texture />
</div>

<style>
  :global {
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-16);
    }
  }

  div {
    margin-top: var(--spacing-32);
    max-width: 1000px;
    width: 100%;
    height: fit-content;
  }
</style>
