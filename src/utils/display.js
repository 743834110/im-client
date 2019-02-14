import Taro from '@tarojs/taro'
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

/**
 * 测试是否是指定的运行环境
 * 如果是指定的环境，则返回true, 否则返回false
 * @param requireEnv
 */
export const isRequireEnvironment = (requireEnv) => {
  return process.env.TARO_ENV === requireEnv;
};

/**
 * 兼容h5端和weapp端的navigateTo：
 * 为了让weapp端上方不显示返回按钮
 * 但有时又是需要的，因此要酌情使用
 * @param path
 */
export const compatNavigateTo = (path) => {
  if (isRequireEnvironment('h5')) {
    Taro.navigateTo({
      url: path
    })
  }
  else {
    Taro.reLaunch({
      url: path
    })
  }
}
