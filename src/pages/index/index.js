import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import './index.scss'


@connect(
  (state) => ({
    state
  }),
  (dispatch) => ({
    dispatch
  })
)
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log(this.props)
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Text>Hello world!</Text>
      </View>
    )
  }
}

