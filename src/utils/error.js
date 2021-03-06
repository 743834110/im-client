import Taro, {getSystemInfoSync} from "@tarojs/taro";
import { getCurrentPageUrl, formatTime } from './common'

/**
 *
 * @param {string} name 错误名字
 * @param {string} action 错误动作描述
 * @param {string} info 错误信息，通常是 fail 返回的
 */
export const logError = (name, action, info) => {
  if (!info) {
    info = 'empty'
  }
  let time = formatTime(new Date());
  Taro.showToast({
    title: action,
    icon: 'none'
  });
};


