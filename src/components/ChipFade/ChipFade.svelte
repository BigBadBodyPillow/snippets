<section>
  <div class="demo">
    <button>Button</button>
    asdasdasd
  </div>

  <div class="about">
    <h2 class="title">Chip Fade</h2>
    <p class="description">Description</p>
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
    aspect-ratio: 16/4;
    background-color: rgb(48, 61, 46);
    position: relative;

    background-image: url('./Topography.svg');
    background-size: 60%;
  }

  .demo:after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;base64,IDxzdmcgdmlld0JveD0iMCAwIDEwMDAgMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgICA8ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+CiAgICAgICAgPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIgLz4KICAgICAgPC9maWx0ZXI+CgogICAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiAvPgogICAgPC9zdmc+');
    opacity: 0.3;
    pointer-events: none;
  }
</style>
