import {downloadFile, getSystemInfoSync} from "@tarojs/taro";

export const promisify = (func, ctx) => {
  // 返回一个新的function
  return function () {
    // 初始化this作用域
    ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        var args = Array.prototype.map.call(arguments, item => item);
        var err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err)
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    })
  };
};

// 下载图片
export const downLoadImg = (imgurl, msg) => {
  return new Promise((resolve, reject) => {
    let that = this
    // util.showToast(msg + 'download...')
    downloadFile({
      url: imgurl,
      complete: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          console.log('downloadstatusCode', res)
          reject(new Error(res))
        }
      },
      fail: function (res) {
        console.log('downloadFilefail', res)
      }
    })
  })
};

export const promiseImage = (url) => {
  return new Promise(function (resolve, reject) {
    resolve(url)
  })
};

export const isChinese = (str) => {
  if (escape(str).indexOf("%u") < 0) return false
  return true
};

export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
};

export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
};

/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
};

export const getSystemInfo = () => {
  try {
    let deviceInfo = getSystemInfoSync();
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  return device;
};

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};

/**
 * 根据既定的规则从
 * 组件引用对象获取将要被提交的数据
 * 如果有submitValue有实体值时，则优先使用
 * @author LTF
 */
export const getSubmitObject = (refs) => {
  let keys = Object.getOwnPropertyNames(refs);
  let object = {};
  Object.values(refs).forEach(((value, index) => {
    if (value.state.submitValue) {
      object[keys[index]] = value.state.submitValue;
    }
    else {
      object[keys[index]] = value.state.value;
    }
  }));
  return object;
};

/**
 * 完成entities到界面显示元素的映射
 * @param entities {object}
 * @param current {array}
 */
export const entitiesToViewObjects = (entities, current) =>
  current.map(value => entities[value]);

/**
 * 删除数组中所有的元素
 * @param target {array}
 */
export const popAll = (target) => {
  const length = target.length;
  for (let i = 0; i < length; i++) {
    target.pop();
  }
};
