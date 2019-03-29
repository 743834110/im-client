import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import createLoadingPlugin from '@rematch/loading'

import models from '../store'

export default init({
  models: models,
  plugins: [immerPlugin(), createLoadingPlugin()]
})
