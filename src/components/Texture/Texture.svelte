<script>
  import blackOrchid from './textures/black-orchid.png';
</script>

<section>
  <div
    class="demo"
    style="
  --black-orchid: url('{blackOrchid}');
  "
  >
    <form action="">
      <label for="input">
        Lable for this input
        <input type="text" id="input" placeholder="Placeholder" />
      </label>
      <button>Button</button>
    </form>
  </div>

  <div class="about">
    <h2 class="title">Texture</h2>
    <p class="description">Background image texture.</p>
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
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  label {
    --muted: #4b4b4b;
    --input-bg: rgb(29, 29, 29);
    display: flex;
    flex-direction: column;
    cursor: pointer;

    gap: 0.33rem;
    color: var(--muted);

    input {
      padding: 0.5em 1em;
      font-family: var(--font-roboto-mono);
      background-color: var(--input-bg);
      border: 1px solid var(--muted);

      &::placeholder {
        color: #777777;
      }
    }
  }

  button {
    width: 100%;
    background-color: var(--accent);
    color: var(--text-invert);
    border: none;
    padding-block: 0.5em;
    font-family: var(--font-roboto-mono);
    font-size: var(--font-16);
    cursor: pointer;
  }

  /* texture */
  .demo {
    background-color: #000000;
    background-image: var(--black-orchid);
  }
</style>
