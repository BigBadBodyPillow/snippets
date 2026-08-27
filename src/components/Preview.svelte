<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    title: string;
    description: string;
  }

  let { children, title = 'Title', description = 'Description' }: Props = $props();
</script>

<section>
  <div class="demo">{@render children()}</div>

  <div class="about">
    <h2 class="title">{title}</h2>
    <p class="description">{description}</p>
  </div>
</section>

<style>
  section {
    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    width: 100%;
    aspect-ratio: 16/9;
    border: #fff;
  }
</style>
