<section>
  <div class="demo">
    <details open>
      <summary>Why are the prices so good?</summary>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, ipsam. Minus ex sed amet
        voluptas consectetur eaque similique fuga atque tempore quis nihil magnam consequuntur totam
        dignissimos, maiores laudantium, repudiandae, fugit porro.
      </p>
    </details>
    <details open>
      <summary>How do I request a refund?</summary>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio pariatur temporibus ipsa
        blanditiis molestiae illo, omnis ad similique repellat perspiciatis cumque sed. Praesentium
        cumque, eveniet rerum modi aut vitae asperiores perspiciatis quae quo, ipsum ex, quibusdam a
        harum deleniti voluptatum. Commodi, cum! Quis eaque eum aut aspernatur autem maxime
        consequatur ut totam, magni, odit porro id ratione est provident officiis.
      </p>
    </details>
    <details open>
      <summary>Is there a free trial for the subscription?</summary>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sed laborum amet saepe?</p>
    </details>
  </div>

  <div class="about">
    <h2 class="title">Acordian</h2>
    <p class="description">
      Inspired by <a href="https://www.youtube.com/@coding2go">Coding2GO's</a>
      <a href="https://youtu.be/6Pd6B0ZmT6s?si=gC-mOQXHXrZb3-jh">Video</a> on new experimental / low support
      css only UI features that previously required JavaScrip
    </p>

    <br />
    <p>
      <a href="https://caniuse.com/?search=interpolate-size%3A+allow-keywords">Support</a>
    </p>
  </div>
</section>

<style>
  section {
    height: fit-content;
    width: 100%;
    height: fit-content;
    background-color: var(--section-bg);
    padding: var(--spacing-16);
    margin-bottom: var(--spacing-32);
  }

  .demo {
    width: 100%;
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(29, 29, 29);

    --card-title: white;
    --cart-text: hsl(from var(--text) h s 73);
  }

  details {
    width: 100%;
    max-width: 52rem;
    border-bottom: 1px solid var(--border);
  }

  details:first-of-type {
    border-top: 1px solid var(--border);
  }

  details summary {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding-block: 1.35rem;
    cursor: pointer;
    color: var(--card-title);
    font-weight: 700;
    list-style: none;
  }

  details summary::-webkit-details-marker {
    display: none;
  }

  details summary::after {
    color: var(--accent);
    content: '+';
    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
    transition: rotate 200ms ease;
  }

  details[open] summary::after {
    font-size: 2.1rem;
    rotate: 45deg;
  }

  details {
    interpolate-size: allow-keywords;
  }

  details::details-content {
    height: 0;
    overflow: clip;
    transition:
      height 300ms ease,
      content-visibility 300ms allow-discrete;
  }

  details[open]::details-content {
    height: auto;
  }

  details p {
    margin: 0;
    padding: 0 3rem 1.5rem 0;
    color: var(--cart-text);
  }
</style>
