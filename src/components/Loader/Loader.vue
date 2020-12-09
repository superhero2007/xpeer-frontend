<template lang="pug">
svg.loader(
  :class="[{ 'loader--centered': centered }, { 'loader--button': button }]"
  :style="{ height }"
  viewBox="25 25 50 50"
  xmlns="http://www.w3.org/2000/svg"
)
  circle.loader__circle(
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    cx="50"
    cy="50"
    r="20"
  )
</template>

<script>
export default {
  name: 'Loader',
  props: {
    centered: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.loader {
  stroke: darkblue;
  animation: loaderRotate 1.4s linear infinite;
  width: 40px;
  height: 40px;
  display: block;

  &--button {
    stroke: white;
    width: 30px;
    height: 30px;
  }

  &--centered {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }

  .loader__circle {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: loaderTurn 1.4s ease-in-out infinite;
  }
}

@keyframes loaderRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loaderTurn {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
