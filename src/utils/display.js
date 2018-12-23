import Taro from '@tarojs/taro'
import '@tarojs/async-await'
/**
 * 进行
 * 获取指定组件的高度
 * @author litianfeng
 * Created on 2018/12/23
 */
export const getHeightOfComponent = (className) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Taro.createSelectorQuery()
        .select(className)
        .boundingClientRect(rect => {
          if (typeof rect === "undefined") {
            reject('error')
          }
          else {
            resolve(rect.height)
          }
        })
        .exec()
    }, 300);

  });
};

/**
 * 获取系统配置信息
 */
let systemInfo = null;
export const getSystemInfo = async () => {
  if (systemInfo == null) {
    systemInfo = Taro.getSystemInfoSync();
    return systemInfo;
  }
  else {
    return systemInfo;
  }
};
