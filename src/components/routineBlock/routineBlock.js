import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar} from "taro-ui";
import './routineBlock.css'
import DateText from "../dateText/dateText";


/**
 * 校园资讯块基础组件块
 *
 */


export default class RoutineBlock extends Component{

  static defaultProps = {
    orgImageUrl: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png",
    title: "写一篇2500字的论文XXXXXX",
    end: "Y",
    content: "党支部统一要求围绕话题一“习近平总书记视察广东重要讲话精神”撰写文章，然后私发到邮箱到邮箱412730497@qq.com",
    orgName: "中央人民出版社",
    files: [
      {
        fileId: "1",
        orgName: "XXX",
        extension: "doc",
        filePath: "/power"
      },
      {
        fileId: "2",
        orgName: "XXXX",
        extension: "doc",
        filePath: "/angle/beat"
      },
      {
        fileId: "3",
        orgName: "XXXX",
        extension: "doc",
        filePath: "/angle/beat"
      },
      {
        fileId: "4",
        orgName: "XXXX",
        extension: "doc",
        filePath: "/angle/beat"
      }
    ],
    createTime: Date.now(),
    read: 5
  };


  render() {
    let {onClick, orgImageUrl, title, end, content, orgName, files, createTime, read} = this.props;
    return (
      <View className='routine-block-index' onClick={onClick}>
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
          <View className='org-name text'>
            {orgName}
          </View>
          <View className='extra-info'>
            <View className='attachment'>
              {
                files.map((file, index) => (
                  <Text className='text' key={file.fileId}>
                    附件{index + 1}
                  </Text>
                ))
              }
            </View>
            <View className='date-read'>
              <DateText className='text' date={createTime} />
              <Text className='text'>
                {read}人已读
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

}
