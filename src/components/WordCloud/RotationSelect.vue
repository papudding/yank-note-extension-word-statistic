<script setup lang="js">
import { defineProps } from 'vue'
defineProps({
  setRotation: {
    type: Function,
    required: true
  }
})
const crossRotaions = [0, 3 / 4]
const radisRotaions = [0, 1 / 8, 1 / 4, 1 / 2, 3 / 4, 7 / 8]

</script>
<template>
  <div>
    <button @click="setRotation([0])">
      <svg fill="currentColor" height="24" width="24" style="fill: currentcolor; height: 1em; width: 1em;"
        viewBox="0 0 12 12">
        <path d="M0 7 L0 5 L12 5 L12 7 Z"></path>
      </svg>
    </button>
    <button @click="setRotation([7 / 8])">
      <svg fill="currentColor" height="24" width="24" style="fill: currentcolor; height: 1em; width: 1em;"
        viewBox="0 0 12 12">
        <path d="M0 7 L0 5 L12 5 L12 7 Z" transform="rotate(315 6 6)"></path>
      </svg>
    </button>
    <button @click="setRotation(crossRotaions)">
      <svg fill="currentColor" height="24" width="24" style="fill: currentcolor; height: 1em; width: 1em;"
        viewBox="0 0 12 12">
        <path d="M0 7 L0 5 L12 5 L12 7 Z"></path>
        <path d="M0 7 L0 5 L12 5 L12 7 Z" transform="rotate(90 6 6)"></path>
      </svg>
    </button>
  </div>
  <div style="margin-top: 5px;">
    <button @click="setRotation(radisRotaions)">
      <svg fill="currentColor" height="24" width="24" style="fill: currentcolor; height: 1em; width: 1em;"
        viewBox="0 0 12 12">
        <path d="M0 7 L0 5 L12 5 L12 7 Z"></path>
        <path d="M0 7 L0 5 L12 5 L12 7 Z" transform="rotate(45 6 6)"></path>
        <path d="M0 7 L0 5 L12 5 L12 7 Z" transform="rotate(90 6 6)"></path>
        <path d="M0 7 L0 5 L12 5 L12 7 Z" transform="rotate(315 6 6)"></path>
      </svg>
    </button>
    <button @click="setRotation([])">
      <svg fill="currentColor" height="24" width="24" style="fill: currentcolor; height: 1em; width: 1em;"
        viewBox="0 0 2 2">
        <circle cx="1" cy="1" r="1"></circle>
      </svg>
    </button>
  </div>
</template>
<style scoped>
</style>
