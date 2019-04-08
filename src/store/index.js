import * as models from './models'
import routine from './routine'
import user from './user'
import socketTask from './socketTask'
import login from './login'
import userOrg from './userOrg'
import organization from './organization'
import dictionary from './dictionary'
import discussion from './discussion'
import chatGroup from './chatGroup'
import workGroupMember from './workGroupMember'
import message from './message'
import messageAndChatGroup from './messageAndChatGroup'

/**
 * 导出的state,每生成一个对象的state，都必须要
 * 在此配置对state对象，以至于被store对象感知和维护到
 * @author LTF
 * Created on 2019/3/25
 */
export default {
  ...models,
  routine,
  user,
  socketTask,
  login,
  userOrg,
  organization,
  dictionary,
  discussion,
  chatGroup,
  workGroupMember,
  message,
  messageAndChatGroup
}
