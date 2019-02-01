import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import PopUpBar from "../../components/popUpBar/popUpBar";
import './popUpNavBar.scss'

/**
 * @description 带有弹出窗口的页面组件
 * @author litianfeng
 * Created on 2019/1/3
 */
export default class PopUpNavBar extends Component{

  static defaultProps = {
    rightFirstIconType: 'add-circle',
    title: '机构简称',
    onPopUpBlockClick: () => {},
    popUpList: [
      {iconType: 'message', title: '发布消息', url: '/pages/routinePublish/routinePublish'},
      {iconType: 'link', title: '创建工作群', url: '/pages/buildGroup/buildGroup'},
      {iconType: 'settings', title: '管理', url: '/pages/manageGroup/manageGroup'},
      {iconType: 'help', title: '反馈', url: '/pages/feedbackGroup/feedbackGroup'},
    ],
  };

  state = {
    hiddenStyle: {
      display: 'none'
    }
  };

  handleExtraClick = (event) => {
    this.setState(prevState => {
      let hiddenStyle = prevState.hiddenStyle === ""?
        {display: 'none'}: "";
      return {
        hiddenStyle: hiddenStyle
      }
    })
  };

  handlePopDownClick = (event) => {

    // let rect = this.refs.popUpBarWrapper;
    // console.log(rect);

    // this.setState({
    //   hiddenStyle: {display: 'none'}
    // })
  };



  render() {
    let {rightFirstIconType, title, onPopUpBlockClick, popUpList} = this.props;
    let {hiddenStyle} = this.state;

    return (
      <View className='pop-up-nav-bar-container' onClick={this.handlePopDownClick}>
        <View className={`mask ${hiddenStyle === ''?'mask-hidden':''}`}>
        </View>
        <SimpleNavBar
          title={title}
          rightFirstIconType={rightFirstIconType}
          onRightFirstIconClick={this.handleExtraClick}
        />
        <View className='pop-up-bar-wrapper' style={hiddenStyle}>
          <PopUpBar onPopUpBlockClick={onPopUpBlockClick} popUpList={popUpList}  />
        </View>
      </View>
    )
  }
}

PopUpNavBar.propTypes = {
  /**
   * 导航栏最右边图标类型
   */
  rightFirstIconType: PropTypes.string,
  /**
   * 导航栏名称
   */
  title: PropTypes.string,
  /**
   * 弹窗元素点击事件
   */
  onPopUpBlockClick: PropTypes.func,
  /**
   * 弹窗元素列表
   */
  popUpList: PropTypes.array
};
