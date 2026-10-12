<div class="card">
  <div class="border">
    <div class="inside">Text</div>
    <!-- notes for the future because i will likely forget

      X and Y axes. 
      The furthaer the cursor moves to the center of each axis,
      the larger the angle will be.
      The closer to an axis the less. 

      -- cursor position  examples -- 
      -100% 100%:
      max left max top tilt

       0% 100%:
      no left or right rotation but max top tilt

      100% 100%:
      max right max top tilt

      100% 0%:
      full right but no vertical tilt
      
      100% -100%:
      full right and full bottom tilt



      say this is the card:
        |  x    |  y
      a | -100% |  100%
      b |  0%   |  100%
      c |  100% |  100%
      + |  0%   |  0%
      d |  100% |  0%
      e |  100% | -100%
      

      a                b                  c
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |
      -----------------+----------------- d
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |
                       |                  e




      
    
    -->
  </div>
</div>

<style>
  /* 
    .border will rotate when .card is hovered.
    the purpse of doing this when .card is hovered 
    and not when .border is hovered is because
    transform changes the shape of the element,
    which can cause the cursor to no longer be on the element.

  */

  .card,
  .border {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 600px;
  }

  .border {
    --border-width: 10px;
    --border-color: light-dark(rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.4));
    --stripe1-colour: light-dark(rgb(240, 240, 240), rgb(15, 15, 15));
    --stripe2-colour: light-dark(rgb(235, 235, 235), rgb(20, 20, 20));
    --rotation-angle: 12deg;

    position: relative;

    /* the "border" */
    padding: var(--border-width);
    background-color: var(--border-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    will-change: transform;
    /* https://easingwizard.com/ */
    transition: 1350ms
      linear(
        0,
        0.033 1%,
        0.142 2.2%,
        0.981 8.5%,
        1.122 10.5%,
        1.161 11.5%,
        1.181 12.6%,
        1.183 13.8%,
        1.163 15.2%,
        1 22%,
        0.977 23.8%,
        0.967 25.8%,
        1.006 38.9%,
        0.999 52%,
        1
      );
  }

  .card:hover .border {
    transform: rotateX(var(--rotation-angle)) rotateY(var(--rotation-angle));
  }

  .inside {
    width: 100%;
    height: 100%;
    background-color: var(--background);
    background: repeating-linear-gradient(
      135deg,
      var(--stripe1-colour),
      var(--stripe1-colour) 10px,
      var(--stripe2-colour) 10px,
      var(--stripe2-colour) 20px
    );
  }
</style>
