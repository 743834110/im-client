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
    title: '机构简称'
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

    let rect = this.refs.popUpBarWrapper;
    console.log(rect);

    // this.setState({
    //   hiddenStyle: {display: 'none'}
    // })
  };



  render() {
    let {rightFirstIconType, title} = this.props;
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
        <View ref='popUpBarWrapper' className='pop-up-bar-wrapper' style={hiddenStyle}>
          <PopUpBar />
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
  title: PropTypes.string
};
