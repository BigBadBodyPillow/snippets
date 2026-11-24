<section>
  <div class="demo">
    <button class="trigger" popovertarget="popover"> Lorem, ipsum dolor </button>

    <div id="popover" popover class="popover">
      <div class="popover-body">
        <p class="popover-title">Lorem, ipsum dolor</p>
        <p class="popover-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, culpa facilis
          deserunt pariatur quae in suscipit fugit fugiat rem ipsum optio tempora corporis delectus
          dicta ut, ducimus corrupti, harum hic assumenda quod eveniet a voluptatibus reprehenderit
          ab? Voluptatum soluta aut nisi totam blanditiis.
        </p>
      </div>
    </div>
  </div>

  <div class="about">
    <h2 class="title">Popover</h2>
    <p class="description">Popovers, kinda like the Path of Exile keywords</p>
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
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popover {
    gap: 1rem;
    grid-template-columns: auto 1fr;

    color: var(--text);

    background: hsl(from var(--background) h s l / 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid hsl(from var(--border) h s l / 0.2);
    border-radius: 2rem;
    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 5rem;
    }

    box-shadow: 0 8px 32px hsl(0 0% 0% / 0.12);

    padding: var(--spacing-32);
    inline-size: min(90vw, 55rem);

    opacity: 0;

    transition-property: display, overlay, opacity, translate;
    transition-duration: 2s;
    transition-timing-function: linear(
      0,
      0.029 0.8%,
      0.13 1.8%,
      0.908 7.2%,
      1.051 9.1%,
      1.112 11.2%,
      1.116 12.2%,
      1.106 13.4%,
      1.007 19.5%,
      0.987 23.1%,
      1.001 35%,
      1
    );
    transition-behavior: allow-discrete;

    &:popover-open {
      display: grid;
      opacity: 1;
      translate: 0px 0px;

      @starting-style {
        opacity: 0;
        translate: 0 -100px;
      }
    }

    @supports (anchor-name: --anchor) {
      margin-block-end: 1rem;
      inset: auto;
      /* position-area: bottom span-right; */
      position-area: top center;
      position-try: flip-block;
    }
  }

  .trigger {
    all: unset;
    anchor-name: --test;
    display: flex;
    height: fit-content;
    align-items: center;

    color: var(--text);

    font: inherit;
    font-weight: 600;
    font-size: var(--font-16);

    text-underline-offset: 6px;

    text-decoration: underline dashed 2px;

    transition: color 0.25s;

    &:hover {
      color: var(--accent);
      text-decoration: underline dashed 2px;
      text-underline-offset: 6px;
    }

    cursor: pointer;
  }

  /* .trigger-title {
  } */

  .popover {
    .popover-body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .popover-title {
      font-weight: 700;
      font-size: var(--font-18);
    }

    .popover-description {
      margin-block-start: var(--spacing-8);
      font-size: var(--font-16);
      color: hsl(from var(--text) h s l / 0.7);
      line-height: 1.6;
    }
  }
</style>
