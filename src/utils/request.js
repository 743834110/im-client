import Taro from '@tarojs/taro'
import { base } from './config'
import { logError } from './error'

let token = null;
let cookie = null;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 设置token
 * @param _token
 */
export function setToken (_token) {
  token = _token;
}

/**
 * 获取token
 * @return {*}
 */
export function getToken() {
  return token;
}

/**
 * @author LTF
 * @param response
 * 检查请求响应状态
 * @returns {*}
 */
const checkStatus = response => {

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  console.log(response);
  const errorText = codeMessage[response.statusCode] || response.statusText;
  Taro.showToast({
    title: errorText,
  });
  const error = new Error(errorText);
  error.name = response.statusCode;
  error.response = response;
  throw error;
};

Taro.addInterceptor(async function checkNetStatus(chain) {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
});

/**
 *
 * @param url
 * @param options
 * @returns {Promise<Taro.request.Promised<any> | never | void>}
 */
export default function request(url, options) {
    let { body, method } = options;
    // let token = getApp().globalData.token
    // if (!token) login()
    let contentType = 'application/json';
    contentType = options.contentType || contentType;
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: body,
      method: method,
      credentials: 'include',
      header: {
        cookie,
        'content-type': contentType,
        'token': token,
      },
      success: (res) => {
        if(res && res.header && res.header['Set-Cookie']){
         cookie = res.header['Set-Cookie'];
        }
      },
    };


    return Taro
      .request(option)
      .then(checkStatus)
      .then(response => response.data)
      .catch(e => {
        // 先检查是否是网络的问题
        Taro.getNetworkType()
          .then(res => {
            if (res.networkType === 'none') {
              Taro.showToast({
                title: "暂无网络连接",
                icon: 'none'
              });
            }
            else {
              logError('api', '请求接口出现问题', e)
            }

          })
      })
  }
