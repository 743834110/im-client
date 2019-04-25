import Taro from '@tarojs/taro';
import {wsUrl, MAX_ATTEMPT_COUNT, commandToModelMapping} from "../utils/config";
import {getToken} from "../utils/request";

/**
 * @author LTF
 * Created on 2019/3/31
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
const socketTask = {
  state: {
    // 失败重连次数
    attemptCount: 0,
    // webSocket对象
    socketTask: undefined,
    // 标志字段，用于表示客户端的请求是否已经完成响应
    waitForMessage: false,
    data: {}

  },
  effects: (dispatch) => ({

    /**
     * 连接和重连
     * @param payload
     * @param rootState
     * @return {Promise<void>}
     */
    async wsConnectAndReConnect(payload, rootState) {

      const res = await Taro.getNetworkType();
      if (res.networkType === 'none') {
        Taro.showToast({
          title: "暂无网络连接",
          icon: 'none'
        });
        return;
      }

      const socketTask = await Taro.connectSocket({
        url: wsUrl,
        ...payload
      });
      socketTask.onClose(async(res) => {

        // 正常关闭或者登录失败，因此不进行重新连接, 1006为非正常关闭事件

        if ([1000, 1006].some(value => value === res.code)) {
          if (getToken()) {
            Taro.showModal({
              content: '与服务器的连接中断,可能是网络不稳定或请谅解并重试登录',
              showCancel: false,
              success: () => {
                Taro.redirectTo({
                  url: '/pages/login/login'
                })
              }
            })
          }
          return;
        }
        // 失败时，进行重新连接，wsConnectAndReConnect需要异步化
        console.log(payload, rootState)
        if (rootState.socketTask.attemptCount < MAX_ATTEMPT_COUNT) {
          console.log("重新连接中......");
          this.saveOrUpdate({attemptCount: rootState.socketTask.attemptCount + 1});
          await new Promise(resolve => {
            setTimeout(() => {
              this.wsConnectAndReConnect({
                callback: () => {
                  this.send({
                    cmd: 5,
                    token: getToken()
                  });
                  resolve();
                }
              }, rootState);
            }, 10000)
          })
        }
        else {

        }
      });
      socketTask.onOpen(() => {
        // 此处需要将attemptCount重置
        this.saveOrUpdate({attemptCount: 0});
        if (payload.callback) {
          payload.callback();
        }
      });
      socketTask.onError(() => {
        Taro.showToast({
          title: "连接服务器失败!",
          mask: true,
          icon: 'none'
        })
      });
      socketTask.onMessage(res => {
        const data = JSON.parse(res.data);
        this.changeWaitForMessage(data);
        // 得到的登录token数据存储到本地中，供下次使用。
        // 将返回在字符串转换成json对象，然后根据命令编码转发到适合的model当中。
        console.log(data);
        const type = commandToModelMapping[data.command];
        if (type) {
          //
          dispatch({
            type,
            payload: data
          })
        }
      });

      this.saveOrUpdate({socketTask});
    },

    /**
     * 工具类，用于显示处理时间
     * @param payload
     * @param rootState
     * @return {Promise<void>}
     */
    async waitForResponse(payload, rootState) {
      console.log("waiting", rootState.socketTask.waitForMessage);
      if (rootState.socketTask.waitForMessage) {
        await new Promise(resolve => setTimeout(() => {
          this.waitForResponse();
          resolve();
        }, 1000))
      }

    },

    /**
     * 发送数据给服务端
     * @return {Promise<void>}
     */
    async send(payload, rootState) {
      const socketTask = rootState.socketTask.socketTask;

      socketTask.send({
        data: JSON.stringify(payload)
      });
      this.saveOrUpdate({waitForMessage: true, data: payload});
      // await this.waitForResponse();
    },

    /**
     * 断开与服务器的连接
     * @param payload
     * @param rootState
     * @return {Promise<void>}
     */
    async close(payload, rootState) {
      const socket = rootState.socketTask.socketTask;
      socket.close({})
    }
  }),


  reducers: {
    saveOrUpdate(state, action) {
      Object.assign(state, action);
    },
    changeWaitForMessage(state, data) {
      if (state.data.cmd + 1 === data.command) {
        state.waitForMessage = false;
      }
    }
  },
};

export default socketTask;
