import Taro,{downloadFile, getSystemInfoSync} from "@tarojs/taro";

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
    if (!value || !value.state) {
      return
    }
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

/**
 * 产生唯一ID
 * @return {string}
 */
export const generateId = () => {
  return Number(Math.random().toString().substr(3,) + Date.now()).toString(36);
};

/**
 * 多张图片上传
 */
export const uploadImg = (data) => {
  let i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
  Taro.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'files',//这里根据自己的实际情况改
    formData: data.formData,//这里是上传图片时一起上传的数据
    success: (resp) => {
      success++;//图片上传成功，图片上传成功的变量+1
      console.log(resp)
      console.log(i);
      //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张
      if (i === data.path.length) {   //当图片传完时，停止调用
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadImg(data);
      }

    }
  });

}

