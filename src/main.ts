import { ref, watch, h } from 'vue'
import { registerPlugin } from '@yank-note/runtime-api'
import WordStatistic from '@/components/WordStatistic.vue'
import StatisticManage from '@/components/StatisticManage.vue'
import i18n from './i18n'

import './style.css'

const extensionName = __EXTENSION_ID__

// 创建共享状态
const sharedSetting = ref({
  chinese: true,
  fullWidthP_: false,
  letters: false,
  numbers: false
})

// 从localStorage加载设置
const savedSettings = localStorage.getItem('wordStatisticSettings')
if (savedSettings) {
  sharedSetting.value = JSON.parse(savedSettings)
}

// 监听变化并持久化
watch(sharedSetting, (newValue) => {
  localStorage.setItem('wordStatisticSettings', JSON.stringify(newValue))
}, { deep: true })

registerPlugin({
  name: extensionName,
  register: ctx => {
    ctx.statusBar.tapMenus(menus => {
      menus[extensionName] = {
        id: extensionName,
        position: 'left',
        title: () => h(WordStatistic, {
          setting: sharedSetting.value,
          onUpdateSetting: (val: any) => {
            sharedSetting.value = val
          }
        }),
        order: 2000,
        onClick: () => {
          ctx.ui.useModal().alert({
            title: i18n.t('w_s_manage'),
            component: h(StatisticManage, {
              setting: sharedSetting.value,
              onUpdateSetting: (val: any) => {
                sharedSetting.value = val
              }
            }),
          })
        }
      }
    })

    ctx.theme.addStyles(`
      .status-bar-menu .word-statistic-info {
        papdding-left: 0.3em;
        cursor: pointer;
      }
      .status-bar-menu .word-statistic-info > span {
        display: inline-block;
        padding: 0 0.2em;
      }
    `)
  }
})
