import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar} from "taro-ui";
import './routineBlock.css'


/**
 * 校园资讯块基础组件块
 *
 */

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

export default class RoutineBlock extends Component{

  static defaultProps = {
    orgImageUrl: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png",
    title: "写一篇2500字的论文XXXXXX",
    end: "Y",
    content: "党支部统一要求围绕话题一“习近平总书记视察广东重要讲话精神”撰写文章，然后私发到邮箱到邮箱412730497@qq.com",
    orgName: "中央人民出版社",
    files: [
      {

      },
      {

      }
    ]
  };

  render() {

    let {orgImageUrl, title, end, content, orgName, files} = this.props;
    return (
      <View className='index'>
        <View className='view-container'>
          <View className='routine-image'>
            <AtAvatar image={orgImageUrl} size='small' />
            <Text className='title'>
              {title}
            </Text>
            <Text className='end'>
              {
                end === 'Y'? "已截止": ""
              }
            </Text>
          </View>
          <View className='content'>
            <Text >
              {content}
            </Text>
          </View>
          <View className='org-name'>
            {orgName}
          </View>
          <View className='extra-info'>
            <View className='attachment'>
            </View>
            <Text>
              中央人名出版社
            </Text>
          </View>
        </View>
      </View>
    )
  }

}
