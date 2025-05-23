<script setup lang="ts">
import { ctx } from '@yank-note/runtime-api'
import { watch, onMounted, ref } from 'vue'
import VueWordCloud from 'vuewordcloud'
import ColorSelect from './ColorSelect.vue'
import RotationSelect from './RotationSelect.vue'
import FontSelect from './FontSelect.vue'
import { SegRes, getPreExceptWord } from './CalcPreExceptWord'
import i18n from '@/i18n'
import { Segment, useDefault, stopword } from 'segmentit'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

const segmentit = useDefault(new Segment())

onMounted(() => {
  const tmpPreExceptWord = getPreExceptWord(segmentit, getAllText())
  preExceptWord.value = tmpPreExceptWord
  wordsList.value = getWordsCount(getAllText(), tmpPreExceptWord).slice(0, 100)
})

// ==================refs=========================start
const wordsList = ref<[string, number][]>([['', 0]])
const spacing = ref<number>(0.25)

// ------------------color------------------------
const colorGroup = ref<string[]>(['#D99CD1', '#D29CD1', '#B99CD1', '#A99CD1'])
const setColorGroup = (inColors: string[]) => {
  colorGroup.value = inColors
}
const colorRender = (colorGroup: string[], weight: number) => {
  const allWeight = Array.from(new Set(wordsList.value.map(item => item[1])))
  const index = allWeight.indexOf(weight)
  return colorGroup[index]
}
// ------------------fontFamily------------------------
const fontFamily = ref<string>('Arial')
const setFontFamily = (inFontFamily: string) => {
  fontFamily.value = inFontFamily
}
// ------------------rotation------------------------
const rotation = ref<number[]>([0])
const setRotation = (inRotation: number[]) => {
  rotation.value = inRotation
}
const rotationRender = (rotation: number[]) => {
  if (rotation.length === 0) {
    return Math.random()
  }
  return rotation[Math.floor(Math.random() * rotation.length)]
}
// ------------------preExceptWord------------------------
const preExceptWord = ref<string[]>([])
watch(preExceptWord, (newValue) => {
  wordsList.value = getWordsCount(getAllText(), newValue).slice(0, maxWords.value)
}, { deep: true })

// ------------------maxWords------------------------
const maxWords = ref<number>(100)
watch(maxWords, (newValue) => {
  wordsList.value = getWordsCount(getAllText(), preExceptWord.value).slice(0, newValue)
})

// ==================functions=========================
const getAllText = (): string => {
  return ctx.editor.getEditor().getModel()?.getValue() || ''
}

const getWordsCount = (text: string, preExceptWord: string[]): [string, number][] => {
  const totalWordsRaw: SegRes[] = segmentit.doSegment(text, {
    stripPunctuation: true,
    stripStopWord: true,
    convertSynonym: true
  })

  const totalWords = totalWordsRaw
    // 过滤掉【停用词】
    .filter(segRes => stopword.indexOf(segRes.w) === -1)
    // 过滤掉【预设过滤词】
    .filter(segRes => preExceptWord.indexOf(segRes.w) === -1)

  // 统计每个单词出现的次数
  const wordCount = totalWords.reduce((acc, wordObj) => {
    const word = wordObj.w
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {})

  // 按值降序排序
  // 为了确保类型兼容，将排序后的结果进行类型转换
  const sortedEntries = Object.entries(wordCount).sort((a, b) => (b[1] as number) - (a[1] as number))
  return sortedEntries.map(([key, value]) => [key, value as number]) as [string, number][]
}

const exportImage = async () => {
  try {
    const element = document.getElementById('wordCloudContainer')
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2, // 提高输出分辨率
        useCORS: true, // 允许跨域图片
        backgroundColor: '#ffffff'
      })

      canvas.toBlob((blob) => {
        saveAs(blob, 'word-cloud-image.png')
      }, 'image/png')
    }
  } catch (error) {
    alert('导出失败，请重试')
  }
}
</script>
<template>
  <div class="container">
    <!-- -------------------left-sidebar---------------------------- -->
    <div class="left-sidebar">
      <div class="config-block">
        <div>{{ i18n.t('wc_color') }}</div>
        <ColorSelect :set-color-group="setColorGroup" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_max_words') }}: {{ maxWords }}</div>
        <input type="range" min="50" max="300" step="1" :value="maxWords" @change="(e) => {
          const target = e.target as HTMLInputElement | null;
          if (target) {
            maxWords = (parseInt(target.value));
          }
        }" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_rotation') }}</div>
        <RotationSelect :set-rotation="setRotation" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_spacing') }}: {{ spacing }}</div>
        <input type="range" min="0" max="2" step="0.25" :value="spacing" @change="(e) => {
          const target = e.target as HTMLInputElement | null;
          if (target) {
            spacing = (parseFloat(target.value));
          }
        }" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_font_family') }}</div>
        <FontSelect :set-font-family="setFontFamily" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_output') }}</div>
        <button @click="exportImage">{{ i18n.t('wc_export_png') }}</button>
      </div>
    </div>
    <!-- -------------------main-content---------------------------- -->
    <div class="main-content">
      <VueWordCloud id="wordCloudContainer" style="height: 70vh;" :words="wordsList" :color="([, weight]) => colorRender(colorGroup, weight)"
        :rotation="([]) => rotationRender(rotation)" :spacing="spacing" :font-family="fontFamily" />
    </div>
    <!-- ------------------right-sidebar----------------------------- -->
    <div class="right-sidebar">
      <div class="config-block">
        <div>{{ i18n.t('wc_except_words') }}</div>
        <textarea style="font-size: 12px;" rows=8 cols=14 v-model="preExceptWord" />
      </div>
      <div class="config-block">
        <div>{{ i18n.t('wc_words') }}</div>
        <div style="overflow: auto; height: 40vh; background-color: #dbdbdb;">
          <table style="border-collapse: collapse; ">
            <thead>
              <tr>
                <th style="border-bottom: 1px solid black;">{{ i18n.t('wc_word') }}</th>
                <th style="border-bottom: 1px solid black;">{{ i18n.t('wc_count') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in wordsList" :key="index">
                <td style="text-align: center; ">{{ word[0] }}</td>
                <td style="text-align: center; ">{{ word[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
}

.left-sidebar .right-sidebar {
  flex: 0 0 20%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background-color: #fff;
  margin: 0 10px 0 10px;
}

.config-block {
  margin-top: 10px;
}
</style>
