import * as models from './models'
import routine from './routine'

/**
 * 导出的state,每生成一个对象的state，都必须要
 * 在此配置对state对象，以至于被store对象感知和维护到
 * @author LTF
 * Created on 2019/3/25
 */
export default {
  ...models,
  routine
}
