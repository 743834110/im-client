// https://api.github.com/repos/NervJS/taro/issues?per_page=1&page=2
// export base = "http://api.shudong.wang/v1/"

// http连接基地址
export const base = "http://192.168.1.4:8080";

// ws连接基地址
export const wsUrl = "ws://192.168.1.4:8880";

// webSocket断开重连次数
export const MAX_ATTEMPT_COUNT = 5;

// 命令到模型state的映射。
export const commandToModelMapping = {
  '6': 'login/afterLogin',
  '12': 'message/afterSendingMessage',
  '11': 'message/onReceivingMessage'
};

// 事件名称
export const ON_MESSAGE = 'onMessage';
