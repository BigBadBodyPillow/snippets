<script lang="ts">
  import bg from './photo-1751220170218-e57d53bd4aa8.jpg';
</script>

<section>
  <div class="demo" style="--bg: url({bg});">
    <nav>
      <!-- svelte-ignore a11y_invalid_attribute-->
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </div>

  <div class="about">
    <h2 class="title">Nav</h2>
    <p class="description">
      Based on <a href="https://www.youtube.com/@KevinPowell">Kevin Powel's</a>
      <a href="https://www.youtube.com/watch?v=8_NQ7ARXz8c">video</a> on using anchor positioning for
      nav elements.
    </p>
    <br />
    <p>His <a href="https://codepen.io/kevinpowell/pen/vENZzBd">CodePen</a>.</p>
  </div>
</section>

<style>
  :global(html) {
    interpolate-size: allow-keywords;
  }

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
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: linear-gradient(red, orange);
    background-attachment: fixed;
  }

  nav {
    width: fit-content;
    margin: 3rem auto;
    background: light-dark(hsl(0 0% 98%), hsl(0 0% 0% / 0.8)); /* oposite of --text */
    padding: 8px;

    isolation: isolate;
    anchor-name: --hovered-link;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
    }

    &::before,
    &::after {
      content: '';
      position-anchor: --hovered-link;
      position: absolute;
      top: anchor(bottom);
      left: anchor(left);
      right: anchor(right);
      bottom: anchor(bottom);

      transition: 500ms
        linear(
          0,
          0.029 1.6%,
          0.123 3.5%,
          0.651 10.6%,
          0.862 14.1%,
          1.002 17.7%,
          1.046 19.6%,
          1.074 21.6%,
          1.087 23.9%,
          1.086 26.6%,
          1.014 38.5%,
          0.994 46.3%,
          1
        );
    }

    &::before {
      z-index: -1;
      /* background: rgba(255, 0, 0, 0.2); */
      /* backdrop-filter: blur(2px); */
    }

    &::after {
      z-index: -2;
      background-image: linear-gradient(red, orange);
      background-attachment: fixed;
    }

    /* reasign anchor */
    li:hover {
      anchor-name: --hovered-link;
    }

    /* update inset */
    &:has(a:hover)::before,
    &:has(a:hover)::after {
      top: anchor(top);
      left: anchor(left);
      right: anchor(right);
      bottom: anchor(bottom);
    }

    a {
      display: block;
      padding: 1rem;
      text-decoration: none;
      color: var(--text);
    }
    a:hover,
    a:focus-visible {
      color: light-dark(hsl(0 0% 98%), hsl(0 0% 0% / 0.8))
        /* same as nav bg which is the oposite of --text */;
    }
  }
</style>
