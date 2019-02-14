import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtLoadMore} from 'taro-ui'
import './chatSearchBlock.scss'
import CommonList from "../commonList/commonList";


/**
 * @author LTF
 * @description 聊天信息搜索界面单元数据组件
 * Created on 2019/2/13
 */
export default class ChatSearchBlock extends Component{

  static defaultProps = {
    title: "联系人",
    data: [],
    onLoadMoreClick: () => {},
    onListItemClick: () => {},
  };

  state = {
    status: 'more'
  };

  componentWillReceiveProps(newProps) {
    let {data} = this.props;
    let status = "loading";
    if (newProps.data.length === data.length) {
      status = "noMore"
    }
    else if (newProps.data.length > data.length) {
      status = "more";
    }
    setTimeout(() => this.setState({
      status
    }), 500)
  };

  render() {
    let {title, onListItemClick, onLoadMoreClick, data} = this.props;
    let {status} = this.state;

    return (
      <View className='chat-search-block-container'>
        <View className='title'>
          <Text>{title}</Text>
        </View>
        <View className='content'>
          <CommonList data={data} onClick={onListItemClick} />
        </View>
        <AtLoadMore onClick={onLoadMoreClick} status={status} />
      </View>
    );
  }
}

ChatSearchBlock.propTypes = {
  /**
   * 搜索对象标题
   */
  title: PropTypes.string,
  /**
   * 搜索对象显示数据
   */
  data: PropTypes.array,
  /**
   * 查看更多点击事件
   */
  onLoadMoreClick: PropTypes.func,
  /**
   * 数据单元项点击事件
   */
  onListItemClick: PropTypes.func
};
