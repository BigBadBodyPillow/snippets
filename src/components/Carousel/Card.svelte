<script lang="ts">
  const { title, content } = $props();
</script>

<!-- <div class="inside">
  <span>{title}</span>
  <p>{content}</p>
</div> -->

<li class="card">
  <div class="inside">
    <span>{title}</span>
    <p>{content}</p>
  </div>
</li>

<style>
  .card {
    min-width: 250px;
    scroll-snap-align: start;

    list-style: none;

    transition: transform 200ms;
  }
  .inside {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    background: var(--card-background);
    padding: 2em;
    color: var(--cart-text);
    border: 1px solid var(--border);

    cursor: pointer;

    border-radius: 20px;

    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 30px;
    }

    transition: transform 0.5s
      linear(
        0,
        0.01 0.7%,
        0.046 1.5%,
        0.192 3.2%,
        0.391 4.8%,
        0.954 8.8%,
        1.201 11%,
        1.347 13%,
        1.388 14%,
        1.41 15.1%,
        1.411 15.9%,
        1.4 16.8%,
        1.342 18.6%,
        1.256 20.3%,
        1.013 24.5%,
        0.913 26.7%,
        0.857 28.6%,
        0.831 30.6%,
        0.833 32.1%,
        0.851 33.7%,
        1.024 41.6%,
        1.055 43.8%,
        1.069 46%,
        1.061 49.3%,
        0.991 57.1%,
        0.972 61.4%,
        0.974 64.8%,
        1.011 76.7%,
        0.996 91.2%,
        1
      );
  }

  .card:hover .inside {
    transform: scale(0.95) rotate(2deg);
  }

  .card::scroll-marker {
    content: '';
    height: var(--marker-height);
    width: var(--marker-width);

    background: var(--border);
    border-radius: 10000px;
  }

  .card::scroll-marker:target-current {
    background: var(--accent);
    transform: translateY(calc(-1 * var(--marker-width) / 3));
    height: var(--marker-width);

    transition:
      height 1s,
      transform 1s;

    transition-timing-function: linear(
      0,
      0.01 0.7%,
      0.046 1.5%,
      0.192 3.2%,
      0.391 4.8%,
      0.954 8.8%,
      1.201 11%,
      1.347 13%,
      1.388 14%,
      1.41 15.1%,
      1.411 15.9%,
      1.4 16.8%,
      1.342 18.6%,
      1.256 20.3%,
      1.013 24.5%,
      0.913 26.7%,
      0.857 28.6%,
      0.831 30.6%,
      0.833 32.1%,
      0.851 33.7%,
      1.024 41.6%,
      1.055 43.8%,
      1.069 46%,
      1.061 49.3%,
      0.991 57.1%,
      0.972 61.4%,
      0.974 64.8%,
      1.011 76.7%,
      0.996 91.2%,
      1
    );
  }

  .card span {
    color: var(--text);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }
</style>
