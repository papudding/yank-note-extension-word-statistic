<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  setColorGroup: {
    type: Function,
    required: true
  }
})
const colorGroups1 = ['#D99CD1', '#D29CD1', '#B99CD1', '#A99CD1']
const colorGroups2 = ['#403030', '#F97A7A']
const colorGroups3 = ['#86b25e', '#cfc16b', '#84705a']
const colorGroups4 = ['#f0dc9e', '#9bcbd1', '#8eafe8', '#db8689', '#db8689']
const colorGroups5 = ['#7e6ce4', '#7b8ef1', '#d5dcfa', '#9cd7ae', '#dcf1e5', '#6f7798', '#d1d4dd', '#e0c049', '#7563ee', '#d4cef9', '#a4cff4', '#deecf8', '#8967b6', '#dad1e7', '#d69a50', '#f4e2ca', '#548184', '#c9dcdd', '#d396b3', '#f5e2eb']
const colorGroups6 = ['#4e5ee9', '#bf79c9', '#6a95cb', '#bebee2', '#4c47ab', '#6ca37e', '#d98462', '#517a96', '#e4b0aa', '#6b8ef6', '#e8c651', '#b5d755', '#9073f6', '#65667f', '#c35d83', '#b4875a', '#80b7c8', '#4e6d40', '#6f3f83', '#9ab89d']
const colorGroups7 = ['#d77d4a', '#65667f', '#e8c547', '#a3b140', '#6a553f', '#d7d5b9', '#5a8988', '#c79957', '#d38fa1', '#607de2', '#82c49a', '#b3acee', '#3e43ba', '#6b9acb', '#b660ba', '#3b5338', '#8a8b51', '#afd6e3', '#75373d', '#6c32c0']
const colorGroups8 = ['#d26328', '#6fa98e', '#556a83', '#e0c049', '#92351d', '#81b3f5', '#553ef3', '#d6739f', '#c8e44f', '#db9643', '#9074f6', '#5d4213', '#8092f6', '#e0a292', '#80b6c8', '#334883', '#edd3a5', '#cfda95', '#76299a', '#78bb6b']
</script>
<template>
  <div style="display: flex;">
    <button class="color-button" @click="setColorGroup(colorGroups1)">
      <span>
        <div class="color-button-display">
          <div v-for="color in colorGroups1" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
    <button class="color-button" @click="setColorGroup(colorGroups2)">
      <span>
        <div class="color-button-display">
          <div v-for="color in colorGroups2" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
    <button class="color-button" @click="setColorGroup(colorGroups3)">
      <span>
        <div class="color-button-display">
          <div v-for="color in colorGroups3" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
    <button class="color-button" @click="setColorGroup(colorGroups4)">
      <span>
        <div class="color-button-display">
          <div v-for="color in colorGroups4" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
  </div>
  <div style="display: flex;">
    <button class="color-button" @click="setColorGroup(colorGroups5)">
      <span>
        <div class="color-button-display-long">
          <div v-for="color in colorGroups5" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
  </div>
  <div style="display: flex;">
    <button class="color-button" @click="setColorGroup(colorGroups6)">
      <span>
        <div class="color-button-display-long">
          <div v-for="color in colorGroups6" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
  </div>
  <div style="display: flex;">
    <button class="color-button" @click="setColorGroup(colorGroups7)">
      <span>
        <div class="color-button-display-long">
          <div v-for="color in colorGroups7" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
  </div>
  <div style="display: flex;">
    <button class="color-button" @click="setColorGroup(colorGroups8)">
      <span>
        <div class="color-button-display-long">
          <div v-for="color in colorGroups8" :key="color" :style="'flex: 1 1 0%; background-color:' + color + ';'"></div>
        </div>
      </span>
    </button>
  </div>
</template>
<style scoped>

.color-button {
  border: none;
  padding: 0;
  height: 28px;
  margin-top: 5px;
}

.color-button-display {
  display: flex;
  height: 24px;
  margin: 2px;
  width: 24px;
}
.color-button-display-long {
  display: flex;
  height: 24px;
  margin: 2px;
  width: 123px;
}

</style>
