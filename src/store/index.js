import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import * as models from './models'

export default init({
  models: models,
  plugins: [immerPlugin()]
})
