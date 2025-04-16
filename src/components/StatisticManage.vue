<script setup lang="ts">
import { onMounted, ref } from 'vue'
import i18n from '@/i18n'

const setting = ref({
  chinese: true,
  fullWidthP_: false,
  letters: false,
  numbers: false
})
// 从localStorage加载设置
onMounted(() => {
  const savedSettings = window.localStorage.getItem('wordStatisticSettings')
  if (savedSettings) {
    setting.value = JSON.parse(savedSettings)
  }
})
// 保存设置到localStorage
function saveSettings () {
  window.localStorage.setItem('wordStatisticSettings', JSON.stringify(setting.value))
}

</script>

<template>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" v-model="setting.chinese" @change="saveSettings"> {{i18n.t('chinese')}}
    </label>
    <label>
      <input type="checkbox" v-model="setting.fullWidthP_" @change="saveSettings">  {{i18n.t('fullWidthP_')}}
    </label>
    <label>
      <input type="checkbox" v-model="setting.letters" @change="saveSettings">  {{i18n.t('letters')}}
    </label>
    <label>
      <input type="checkbox" v-model="setting.numbers" @change="saveSettings">  {{i18n.t('numbers')}}
    </label>
    <span>修改后需要重新打开yanknote</span>
  </div>
</template>

<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 8px;
}
</style>
