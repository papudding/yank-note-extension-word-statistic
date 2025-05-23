<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  setFontFamily: {
    type: Function,
    required: true
  }
})
const fontFamiliesMac = ['Arial', 'STHeiti', 'STXihei', 'Heiti SC', 'Hiragino Sans GB', 'PingFang SC']
const fontFamiliesWin = ['Arial', 'SimSun', 'Microsoft Yahei']

const getDefaultFont = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  console.log('userAgent', userAgent)
  if (userAgent.includes('win')) {
    return fontFamiliesWin
  } else if (userAgent.includes('mac')) {
    return fontFamiliesMac
  } else if (userAgent.includes('linux')) {
    return []
  }
  return ['Arial']
}

</script>
<template>
  <select style="width: 130px;" @change="e => {
    const target = e.target as HTMLSelectElement;
    if (target) {
      setFontFamily(target.value);
    }
  }">
    <option v-for="item in getDefaultFont()" :key="item" :value="item">{{ item }}</option>
  </select>
</template>
<style scoped></style>
