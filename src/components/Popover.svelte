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
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: var(--spacing-32);
    background: var(--background);
    color: var(--text);
    box-shadow: 0 8px 32px hsl(0 0% 0% / 0.12);
    inline-size: min(90vw, 55rem);
    /* width: fit-content; */

    opacity: 0;
    translate: 0 -30px;

    transition-property: display, overlay, opacity, translate;
    transition-duration: 0.75s;
    transition-behavior: allow-discrete;

    &:popover-open {
      display: grid;
      opacity: 1;
      translate: 0px 0px;

      @starting-style {
        opacity: 0;
        translate: 0 -30px;
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
    display: flex;
    height: fit-content;
    align-items: center;
    cursor: pointer;
    color: var(--text);
    font: inherit;
    anchor-name: --test;
    font-weight: 600;
    font-size: var(--font-16);

    &:hover {
      color: var(--accent);
      text-decoration: underline dashed;
      text-underline-offset: 6px;
    }
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
      color: hsl(from var(--text) h s l / 0.8);
      line-height: 1.6;
    }
  }
</style>
