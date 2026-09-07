<script lang="ts">
  import '../reset.css';
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import RainbowLine from '../components/RainbowLine.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>Snippets</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<RainbowLine />
{@render children()}
