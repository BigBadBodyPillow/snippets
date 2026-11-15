<section>
  <div class="demo">
    <div class="outer">
      <div class="container">
        <button class="scroll-button left">&lt;</button>
        <div class="chip-container">
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
          <div class="chip">Chip</div>
        </div>
        <button class="scroll-button right">&gt;</button>
      </div>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Chip Fade</h2>
    <p class="description">
      Inspired by <a href="https://www.youtube.com/">youtubes</a> search tags
    </p>
  </div>
</section>

<style>
  /* @function --adjust-lightness(--color <color>, --value <number>) returns <color> {
    result: hsl(from var(--color) h s calc(l + var(--value)));
  } */
  section {
    --chip-background: light-dark(white, black);
    --container-background: light-dark(rgb(207, 207, 207), rgb(28, 28, 28));
    --button-width: 40px;
    --chip-container-width: calc(400px + calc(var(--button-width) * 2));
    --scroll-button-color: rgb(162, 1, 1);

    --demo-background: rgb(48, 61, 46);
    max-height: 800px;
    width: 100%;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    width: 100%;
    aspect-ratio: 16/4;
    background-color: var(--demo-background);
    position: relative;

    background-image: url('./Topography.svg');
    background-size: 60%;

    display: grid;
    place-items: center;
  }

  /* noise */
  .demo:after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;base64,IDxzdmcgdmlld0JveD0iMCAwIDEwMDAgMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgICA8ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+CiAgICAgICAgPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIgLz4KICAgICAgPC9maWx0ZXI+CgogICAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiAvPgogICAgPC9zdmc+');
    opacity: 0.3;
    pointer-events: none;
  }

  .outer {
    border-radius: 13px;
    background-color: rgba(0, 0, 0, 0.159);
    backdrop-filter: blur(4px);
    padding: 1.66rem;
  }

  .container {
    padding: 2rem;
    background-color: var(--container-background);
    border-radius: var(--radius);
    width: 100%;
    max-width: var(--chip-container-width);
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .chip-container {
    display: flex;
    gap: 1rem;
    overflow: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .chip-container::before {
    /* TODO Fade gradient  */
  }

  .chip {
    padding: 0.75rem 1.5rem;

    font-family: var(--font-roboto-mono);
    color: hsl(from var(--text) h s calc(l - 15));
    background-color: var(--chip-background);
    border-radius: var(--radius);
    cursor: pointer;
  }

  .scroll-button {
    --bg: light-dark(
      hsl(from var(--chip-background) h s calc(l - 10)),
      hsl(from var(--chip-background) h s calc(l + 5))
    );

    height: var(--button-width);
    aspect-ratio: 1/1;
    border-radius: 100%;

    background-color: var(--bg);
    color: var(--scroll-button-color);
    border: 1px solid var(--scroll-button-color);
    cursor: pointer;

    font-weight: bold;
  }
  .scroll-button:hover {
    background-color: light-dark(
      hsl(from var(--bg) h s calc(l - 5)),
      hsl(from var(--bg) h s calc(l + 2))
    );
  }
  .scroll-button:active {
    background-color: light-dark(
      hsl(from var(--bg) h s calc(l - 8)),
      hsl(from var(--bg) h s calc(l + 5))
    );
  }
</style>
