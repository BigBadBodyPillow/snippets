<script lang="ts">
  import { onMount } from 'svelte';
  import '../reset.css';
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { smoothScroll } from '$lib/smoothScroll';

  import RainbowLine from '../components/RainbowLine.svelte';

  let { children } = $props();

  onMount(smoothScroll);
</script>

<svelte:head>
  <title>Snippets</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<RainbowLine />
{@render children()}
