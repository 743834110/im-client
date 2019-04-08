import Taro from '@tarojs/taro';
import {login as loginFunc} from '../services/user';
import {setToken} from '../utils/request';

const login = {
  state: {
    code: undefined
  },

  effects: (dispatch) => ({

    // 登录:调用其他在socketTask的发送方法。
    async login(payload) {
      const socketTask = dispatch.socketTask;
      await loginFunc(socketTask, payload);    },


    /**
     * 登录之后
     */
    async afterLogin(payload) {
      this.changeLoginStatus(payload);

      // 将用户信息发送至userState当中
      if (payload.code == '10007') {
        dispatch({
          type: 'user/saveCurrentUser',
          payload: {
            userId: payload.user.id,
            userName: payload.user.nick,
            userImageUrl: payload.user.avatar,
            terminal: payload.user.terminal
          }
        });
        // 当登录成功时，更新相关state，进行页面调转
        Taro.redirectTo({
          url: '/pages/index/index'
        });
        // 将群组信息发送至group当中
        dispatch({
          type: 'chatGroup/saveChatGroupAndUserId',
          payload: payload.user.groups
        });

        // group信息刷新到messageAndChatGroup当中
        dispatch({
          type: 'messageAndChatGroup/saveGroupList',
          payload: payload.user.groups,
        });

        // 处理群组当中的用户信息
        const users = [];
        payload.user.groups.forEach(group => {

          group.users.forEach(user => {
           users.push({
             userId: user.id,
             userName: user.nick,
             userImageUrl: user.avatar
           })
          })
        });
        dispatch({
          type: 'user/saveEntities',
          payload: users
        });

        // 保存token
        setToken(payload.user.extras.token);
      }
    }
  }),

  reducers: {

    changeLoginStatus(state, action) {
      state.code = action.code;
    }
  },
};

export default login;
