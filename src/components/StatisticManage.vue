<script setup lang="ts">
import { ref, defineProps } from 'vue'
import i18n from '@/i18n'

const props = defineProps<{
  setting: {
    chinese: boolean
    fullWidthP_: boolean
    letters: boolean
    numbers: boolean
    paragraphs: boolean
  }
  onUpdateSetting:(val: any) => void
}>()
const localSetting = ref({
  chinese: props.setting.chinese,
  fullWidthP_: props.setting.fullWidthP_,
  letters: props.setting.letters,
  numbers: props.setting.numbers,
  paragraphs: props.setting.paragraphs
})
// 保存设置
function saveSettings () {
  props.onUpdateSetting(localSetting.value)
}

</script>

<template>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" v-model="localSetting.chinese" @change="saveSettings"> {{i18n.t('chinese')}}
    </label>
    <label>
      <input type="checkbox" v-model="localSetting.fullWidthP_" @change="saveSettings">  {{i18n.t('fullWidthP_')}}
    </label>
    <label>
      <input type="checkbox" v-model="localSetting.letters" @change="saveSettings">  {{i18n.t('letters')}}
    </label>
    <label>
      <input type="checkbox" v-model="localSetting.numbers" @change="saveSettings">  {{i18n.t('numbers')}}
    </label>
    <label>
      <input type="checkbox" v-model="localSetting.paragraphs" @change="saveSettings">  {{i18n.t('paragraphs')}}
    </label>
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
