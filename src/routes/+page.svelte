<script lang="ts">
  import Acordian from '../components/Acordian.svelte';
  import Carousel from '../components/Carousel/Carousel.svelte';
  import Nav from '../components/Nav/Nav.svelte';
  import Popover from '../components/Popover.svelte';
  import Texture from '../components/Texture/Texture.svelte';

  let altPressed = $state(false);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Alt') {
      event.preventDefault();
      altPressed = true;
    }
  }

  function handleKeyup(event: KeyboardEvent) {
    if (event.key === 'Alt') {
      event.preventDefault();
      altPressed = false;
    }
  }

  function handleBlur() {
    altPressed = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} onkeyup={handleKeyup} onblur={handleBlur} />

<div class:alt-pressed={altPressed}>
  <Carousel />

  <Nav />

  <Acordian />

  <Texture />

  <Popover />
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
