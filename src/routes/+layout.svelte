<script lang="ts">
  import '../reset.css';
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
  export const prerender = true;
</script>

<svelte:head>
  <title>Snippets</title>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
