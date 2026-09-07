<div class="rainbow-line"></div>

<style>
  .rainbow-line {
    --rainbow: linear-gradient(
      to left,
      #fef26a,
      #fe8462,
      #ff70cb,
      #d270ff,
      #743ad5,
      #709df8,
      #5bffbd,
      #709df8,
      #743ad5,
      #d270ff,
      #ff70cb,
      #fe8462,
      #fef26a
    );

    position: fixed;
    top: 0;
    width: 100%;
    height: 1px;

    z-index: 20;
    background-image: var(--rainbow);
    background-size: 400%;
    animation: rainbow-animation 100s infinite;
  }

  @keyframes rainbow-animation {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  /* Disable animation when reduced motion is preferred */
  @media (prefers-reduced-motion: reduce) {
    .rainbow-line {
      animation: none;
    }
  }

  /* for the demo */
  :global(.demo) .rainbow-line {
    position: absolute;
  }
</style>
