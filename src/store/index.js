import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import {tabPage} from './models'

export default init({
  models: {
    tabPage
  },
  plugins: [immerPlugin()]
})
