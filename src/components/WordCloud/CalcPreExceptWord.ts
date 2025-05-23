// 预设过滤词性
const preExpTags = [8192, 262144, 268435456]
// 预设过滤词
const preExceptWord = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '没', '都', '却', '才', '刚', '最', '左', '右', '中', '内', '去', '大', '小', '做', '很', '想'
]
export interface SegRes { w: string, p: number }

export const getPreExceptWord = (segmentit: any, text: string) => {
  const totalWordsRaw: SegRes[] = segmentit.doSegment(text, {
    stripPunctuation: true,
    stripStopWord: true,
    convertSynonym: true
  })

  const tmpTagExcept = totalWordsRaw
    .filter(segRes => preExpTags.indexOf(segRes.p) > -1)
    .map(segRes => segRes.w)

  const tmpWordExcept = totalWordsRaw
    .filter(segRes => preExceptWord.indexOf(segRes.w) > -1)
    .map(segRes => segRes.w)

  return Array.from(new Set([...tmpTagExcept, ...tmpWordExcept]))
}
