<script setup lang="ts">
import { ctx } from '@yank-note/runtime-api'
import { defineProps, onMounted } from 'vue'
import { stopword } from 'segmentit'
const props = defineProps<{
    segmentit: any
}>()
const getAllText = () => {
  return ctx.editor.getEditor().getModel()?.getValue()
}
const getWordsCount = (text) => {
  const totalWordsRaw = props.segmentit.doSegment(text, {
    stripPunctuation: true,
    stripStopWord: true,
    convertSynonym: true
  })

  // 过滤掉长度小于2的单词
  const preExpTags = [8192, 262144, 268435456]
  const wordsFromPreExpTags = new Set(
    totalWordsRaw
      .filter(wordObj => preExpTags.indexOf(wordObj.p) > -1)
      .map(wordObj => wordObj.w)
  )

  // 预设过滤词
  const preExceptWord = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '没', '都', '却', '才', '刚', '最', '左', '右', '中', '内', '去', '大', '小', '做', '很', '想',
    ...wordsFromPreExpTags
  ]

  const totalWords = totalWordsRaw
    // 过滤掉【停用词】
    .filter(wordObj => stopword.indexOf(wordObj.w) === -1)
    // 过滤掉【预设过滤词】
    .filter(wordObj => preExceptWord.indexOf(wordObj.w) === -1)

  console.log('preExceptWord', preExceptWord)

  // 统计每个单词出现的次数
  const wordCount = totalWords.reduce((acc, wordObj) => {
    const word = wordObj.w
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {})

  // 按值降序排序
  return Object.entries(wordCount).sort((a, b) => (b[1] as number) - (a[1] as number))
}
onMounted(() => {
  const a = getWordsCount(getAllText())
  // for (const key in a) {
  //   console.log(key, a[key])
  // }
  console.log(a)
})
</script>
<template>
  <div>
  </div>
</template>
<style scoped>
</style>
