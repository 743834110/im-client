import Taro from '@tarojs/taro';
import {wsUrl} from "./config";

let socketTask = null;

/**
 * @author LTF
 * Created on 2019/3/31
 * 发起ws相关请求信息，将内联复杂交互封装成将http请求一样简单
 * @param options
 */
export default function wsRequest(options) {

  // 为空时表示需要建立连接
  if (!socketTask) {
    Taro.connectSocket({
      url: wsUrl,
      success: (res) => {
        console.log('success', res);
      },
      fail: (res) => {
        console.log('fail', res);
      }
    }).then(task => {
      socketTask = task;

      socketTask.onopen(() => {

      })
    })
  }
  else {

  }




}
