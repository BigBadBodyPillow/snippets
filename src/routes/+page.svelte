<script>
  import Nav from '../components/Nav/Nav.svelte';
  import Preview from '../components/Preview.svelte';
</script>

<h1>A collection of components / snippets that i would like to remember</h1>

<div>
  <Preview title="Title of this preview" description="Description for this preview">words</Preview>

  <Nav />
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

  h1 {
    margin-top: var(--spacing-32);
  }

  div {
    margin-top: var(--spacing-32);
    max-width: 1000px;
    width: 100%;
    height: fit-content;
  }
</style>
