<template>
  <h1 class="big">why hello there fellow trengoats</h1>

  <h2>you've found my super secret page! that means you get to learn more about my role at trengo</h2>
  <h3>although note one difference from my homepage, I am no longer a fullstack developer and will instead be bringing beautiful designs (like the ones you see before you) to life</h3>

  <div class="activation">
    <h2>I'll be part of the</h2>

    <div class="alternate">
      <div class="off-wrapper">
        <span :class="{ activated: activated, off: !activated, analogue: true }" />
        <span :class="{ activated: activated, off: !activated, analogue: true }" />
        <span :class="{ activated: activated, off: !activated, analogue: true }" />
      </div>

      <button class="activate" @click.prevent="toggleRainbow()">
        <h1 :class="{ letters: true, activated }">
          <span :class="{ activated, letter: true }">A </span>
          <span :class="{ activated, letter: true }">C </span>
          <span :class="{ activated, letter: true }">T </span>
          <span :class="{ activated, letter: true }">I </span>
          <span :class="{ activated, letter: true }">V </span>
          <span :class="{ activated, letter: true }">A </span>
          <span :class="{ activated, letter: true }">T </span>
          <span :class="{ activated, letter: true }">I </span>
          <span :class="{ activated, letter: true }">O </span>
          <span :class="{ activated, letter: true }">N</span>
        </h1>
      </button>

      <div class="on-wrapper">
        <span :class="{ activated: activated, on: activated, analogue: true }" />
        <span :class="{ activated: activated, on: activated, analogue: true }" />
        <span :class="{ activated: activated, on: activated, analogue: true }" />
      </div>
    </div>

    <h2>team</h2>
  </div>

  <h2>We're responsible for things like making sure the onboarding of new users is as smooth and efficient as it can be</h2>
  <h2>For example, we make features that help guide users along during their signup, including detailed steps along the way</h2>
  <h3>Hopefully with good enough guidance we can achieve our goal of good user retention, with a nice side benefit of them contacting us less for help with their setups, since they'd be able to find everything they'd need in our onboarding materials.</h3>

  <p>And hopefully, our lovely design team gives me better material than what I came up with for this here page :D</p>

  <span class="big-rainbow" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const activated = ref(false);

  const toggleRainbow = () => {
    const rootColor = getComputedStyle(document.documentElement).getPropertyValue("--cl")
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'red', 'orange', 'yellow'];
    activated.value = !activated.value;
    const letters = document.querySelectorAll(".letter");

    if (activated.value) {
      letters.forEach((letter, index) => {
        letter.style.color = colors[index];
        letter.style.textDecoration = `solid underline 2px ${colors[index]}`;
      })
    } else {
      letters.forEach(letter => { 
        letter.style.color = 'var(--cl)';
        letter.style.textDecoration = 'none';
      })
    }
  }
</script>

<style scoped>
  h1, h2, h3 { text-align: center }

  h1.big { font-size: 3rem }

  h1 { margin-top: 20px }
  h2 { margin-top: 45px }
  h3 { margin-top: 15px; margin-bottom: 35px }
  p { margin-top: 20px }

  .letters {
    text-decoration: underline solid 2px;
    transition: all 100ms ease-in-out;
  }

  .letters:hover {
    text-decoration: underline solid 2px green;
  }

  h1.activated { text-decoration: none !important; }

  span.activated { font-family: "Comic Sans" }

  .activation {
    margin: 10px 0 40px 0;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  .activation > h2 {
    margin-top: 20px;
  }

  button {
    margin: 10px 15px;
    padding: 0;
    background: inherit;
    color: var(--cl);
  }

  .analogue {
    display: block;
    border-radius: 100%;
    width: 6px;
    height: 6px;
    transition: none;
    margin: 0 5px;
  }

  .alternate {
    width: 90vw;
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  .off-wrapper { display: flex; flex-flow: row wrap; justify-self: flex-end }
  .on-wrapper { display: flex; flex-flow: row wrap; }

  .off { background: red; box-shadow: 0px 0px 12px 5px red, 0 0 2px 2px red; }
  .on { background: green; box-shadow: 0px 0px 12px 5px green, 0 0 2px 2px green; }
</style>
