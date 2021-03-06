import Taro, { Component } from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import '@tarojs/async-await'          // 全局引入一次即可
import Index from './pages/index'
import store from './utils/rematch'
import './app.scss'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：

class App extends Component {

  config = {
    pages: [
      'pages/login/login',
      'pages/index/index',
      'pages/orgOutline/orgOutline',
      'pages/chatOutline/chatOutline',
      'pages/chatRoom/chatRoom',
      'pages/routineSearch/routineSearch',
      'pages/routineDetail/routineDetail',
      'pages/orgReview/orgReview',
      'pages/studentSocietySearch/studentSocietySearch',
      'pages/orgHome/orgHome',
      'pages/addFeedback/addFeedback',
      'pages/routinePublish/routinePublish',
      'pages/buildGroup/buildGroup',
      'pages/editGroup/editGroup',
      'pages/searchMember/searchMember',
      'pages/selectedMember/selectedMember',
      'pages/manageGroup/manageGroup',
      'pages/singleFieldEdit/singleFieldEdit',
      'pages/editMember/editMember',
      'pages/feedbackGroup/feedbackGroup',
      'pages/addMember/addMember',
      'pages/operateStatus/operateStatus',
      'pages/chatSearch/chatSearch',
      'pages/userHome/userHome',
      'pages/userPublish/userPublish',
      'pages/userSetting/userSetting',
      'pages/userAccount/userAccount',
      'pages/forgetPassword/forgetPassword',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    }

  };




  componentDidMount () {

  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store} >
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
