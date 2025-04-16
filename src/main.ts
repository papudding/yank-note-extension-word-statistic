import { registerPlugin } from '@yank-note/runtime-api'
import WordStatistic from '@/components/WordStatistic.vue'
import StatisticManage from '@/components/StatisticManage.vue'
import i18n from './i18n'

import './style.css'

const extensionName = __EXTENSION_ID__

registerPlugin({
  name: extensionName,
  register: ctx => {
    ctx.statusBar.tapMenus(menus => {
      menus[extensionName] = {
        id: extensionName,
        position: 'left',
        title: WordStatistic,
        order: 2000,
        onClick: () => {
          ctx.ui.useModal().alert({
            title: i18n.t('w_s_manage'),
            component: StatisticManage,
          })
        }
      }
    })

    ctx.theme.addStyles(`
      .status-bar-menu .word-statistic-info {
        papdding-left: 0.3em;
      }
      .status-bar-menu .word-statistic-info > span {
        display: inline-block;
        padding: 0 0.2em;
      }
    `)
  }
})
