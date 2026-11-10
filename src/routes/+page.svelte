<script lang="ts">
  import Acordian from '../components/Acordian.svelte';
  import Carousel from '../components/Carousel/Carousel.svelte';
  import Cursor from '../components/Cursor/Cursor.svelte';
  import Nav from '../components/Nav/Nav.svelte';
  import Popover from '../components/Popover.svelte';
  import RainbowLine from '../components/RainbowLine.svelte';
  import Texture from '../components/Texture/Texture.svelte';
  import TiltableCard from '../components/TiltableCard/TiltableCard.svelte';

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

<div class="wrapper" class:alt-pressed={altPressed}>
  <Carousel />

  <Nav />

  <Acordian />

  <Texture />

  <Popover />

  <section class="rainbow">
    <div class="demo">
      <RainbowLine />
    </div>

    <div class="about">
      <h2 class="title">Rainbow Line</h2>
      <p class="description">The rainbowline that i use a lot</p>
    </div>
  </section>

  <TiltableCard />

  <Cursor />
</div>

<style>
  :global(body) {
    --cursor: url('$lib/assets/myArrow.svg'), auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    cursor: var(--cursor);
    background-color: rgb(107, 107, 107);
  }

  .wrapper {
    padding-block: var(--spacing-32) 100px;
    max-width: 1000px;
    width: 100%;
  }

  .rainbow {
    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);

    div {
      margin-top: var(--spacing-32);
    }
  }

  .demo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>
