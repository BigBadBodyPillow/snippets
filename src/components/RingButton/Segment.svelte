<script lang="ts">
  let { ariaLabel } = $props();
</script>

<button class="segment" aria-label={ariaLabel}>
  <svg width="200" height="200" viewBox="0 0 100 100">
    <circle class="inner" cx="50" cy="50" r="46" stroke-width="7" />
  </svg>
</button>

<style>
  .segment {
    --ring-bg: rgb(50, 45, 45);

    border-radius: 100000px;
    border: none;
    background: none;

    display: grid;
    place-items: center;

    position: absolute;
  }
  .inner {
    fill: none;
    stroke: var(--ring-bg);
    cursor: pointer;
  }

  .inner:hover {
    stroke: var(--accent);
  }
</style>
