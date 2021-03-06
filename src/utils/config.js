// https://api.github.com/repos/NervJS/taro/issues?per_page=1&page=2
// export base = "http://api.shudong.wang/v1/"

// http连接基地址
export const base = "https://berby.xyz:8080";

// ws连接基地址
export const wsUrl = "wss://berby.xyz:8880";

// webSocket断开重连次数
export const MAX_ATTEMPT_COUNT = 5;

// 命令到模型state的映射。
export const commandToModelMapping = {
  '6': 'login/afterLogin',
  '12': 'message/afterSendingMessage',
  '11': 'message/onReceivingMessage',
  '20': 'message/onReceivingOfflineMessage'
};

// 事件名称
export const ON_MESSAGE = 'onMessage';

// loadMore组件
export const REFRESH_STATUS = {
  NORMAL: 0,
  REFRESHING: 1,
  NO_MORE_DATA: 2
}
