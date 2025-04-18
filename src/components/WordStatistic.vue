<script setup lang="ts">
import { onBeforeMount, ref, defineProps } from 'vue'
import { ctx } from '@yank-note/runtime-api'
import i18n from '@/i18n'

import { IRange } from '@yank-note/runtime-api/types/types/third-party/monaco-editor'

const getSelectionInfo = ctx.editor.getSelectionInfo
const whenEditorReady = ctx.editor.whenEditorReady

// const props = defineProps<{
defineProps<{
  setting: {
    chinese: boolean
    fullWidthP_: boolean
    letters: boolean
    numbers: boolean
  }
  onUpdateSetting:(val: any) => void
}>()

onBeforeMount(() => {
  disposable.forEach(d => d.dispose())
})

// onMounted(() => {
//   console.log('WordStatistic mounted')
//   console.log('WordStatistic props', props.setting)
// })

let disposable: { dispose(): void }[] = []

const selectionInfo = ref<ReturnType<typeof getSelectionInfo>>({
  textLength: 0,
  selectedLength: 0,
  selectedLines: 0,
  lineCount: 0,
  line: 0,
  column: 0,
  selectionCount: 1,
})
const startColumn = ref(0)
const startLine = ref(0)

function updateSelectionInfo () {
  selectionInfo.value = getSelectionInfo()
  if (selectionInfo.value && selectionInfo.value.selectedLength === 0) {
    startColumn.value = selectionInfo.value.column
    startLine.value = selectionInfo.value.line
    // console.log('startColumn', startColumn.value)
    // console.log('startColumn', startLine.value)
  }
}

function countByUnicode (str) {
  let count = 0
  for (const char of str) {
    const code = char.charCodeAt(0)
    if (code >= 0x4E00 && code <= 0x9FA5) count++
  }
  return count
}

function countFullWidthPunctuation (str) {
  const matches = str.match(/[\uFF00-\uFFEF\u3000-\u303F]/g)
  return matches ? matches.length : 0
}
function countLetters (str) {
  const matches = str.match(/[A-Za-z]/g)
  return matches ? matches.length : 0
}

function countNumbers (str) {
  const matches = str.match(/[0-9]/g)
  return matches ? matches.length : 0
}

function getSelectText (selectionInfo: ReturnType<typeof getSelectionInfo>) {
  // 将selectionInfo转换为IRange
  if (selectionInfo) {
    const selectRange: IRange = {
      startLineNumber: startLine.value,
      startColumn: startColumn.value,
      endLineNumber: selectionInfo.line,
      endColumn: selectionInfo.column,
    }
    // console.log('selectionInfo', selectionInfo)
    // console.log('selectRange', selectRange)
    // console.log('content', ctx.editor.getEditor().getModel()?.getValueInRange(selectRange))
    return ctx.editor.getEditor().getModel()?.getValueInRange(selectRange)
  }
}
function getAllText () {
  return ctx.editor.getEditor().getModel()?.getValue()
}

whenEditorReady().then(({ editor }) => {
  updateSelectionInfo()

  disposable = [
    editor.onDidChangeCursorSelection(updateSelectionInfo),
    editor.onDidChangeModel(updateSelectionInfo)
  ]
})
</script>

<template>
<div style="margin-left: 0.5em;" class="word-statistic-info">
  <span v-if="selectionInfo !== undefined">
    <span v-if="selectionInfo.selectionCount > 1">
      <span>{{ i18n.t('p_select_single') }}</span>
    </span>
    <span v-else>
      <span v-if="selectionInfo.selectedLength > 0 && !(selectionInfo.column === 1 && selectionInfo.line === selectionInfo.lineCount) && startColumn != 0">
        <span>{{ i18n.t('selected') }}: </span>
        <span v-if="setting.chinese"> | {{countByUnicode(getSelectText(selectionInfo))}} {{ i18n.t('chinese') }}</span>
        <span v-if="setting.fullWidthP_"> | {{countFullWidthPunctuation(getSelectText(selectionInfo))}} {{ i18n.t('fullWidthP_') }}</span>
        <span v-if="setting.letters"> | {{countLetters(getSelectText(selectionInfo))}} {{ i18n.t('letters') }}</span>
        <span v-if="setting.numbers"> | {{countNumbers(getSelectText(selectionInfo))}} {{ i18n.t('numbers') }}</span>
      </span>
      <span v-else>
        <span>{{ i18n.t('total') }}: </span>
        <span v-if="setting.chinese"> | {{ i18n.t('chinese') }}: {{ countByUnicode(getAllText()) }}</span>
        <span v-if="setting.fullWidthP_"> | {{ i18n.t('fullWidthP_') }}: {{countFullWidthPunctuation(getAllText())}} </span>
        <span v-if="setting.letters"> | {{ i18n.t('letters') }}: {{countLetters(getAllText())}}</span>
        <span v-if="setting.numbers"> | {{ i18n.t('numbers') }}: {{countNumbers(getAllText())}}</span>
      </span>
    </span>
  </span>
</div>
</template>

<style scoped>

</style>
