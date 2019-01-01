import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtTabs, AtTabsPane} from "taro-ui";
import {getSystemInfo} from "../../utils/display";

/**
 * 垂直滚动栏
 * @author litianfeng
 * Created on 2018/12/31
 */
export default class VerticalScrollTab extends Component {

  static defaultProps = {
    onClick: () => {},
    instituteList: [
      {shortName: '信息院'},
    ]
  };

  state = {
    current: 0
  };




  /**
   * 标签栏的点击切换事件
   */
  handleTabClick = (index) => {
    let {onClick, instituteList} = this.props;
    this.setState({
      current: index
    });
    onClick(instituteList[index]);
  };

  render() {
    let {current} = this.state;
    let {instituteList} = this.props;
    // 不建议这样做
    let orgNameTitleMapping = instituteList.map(value => ({
      title: value.shortName
    }));

    return (
      <View style={{
        height: '100%',
        backgroundColor: 'white'
      }}
      >
        <AtTabs
          current={current}
          scroll
          tabDirection='vertical'
          tabList={orgNameTitleMapping}
          onClick={this.handleTabClick}
        >
        </AtTabs>
      </View>
    )
  }
}


VerticalScrollTab.propTypes = {
  /**
   * 某一标签栏的点击事件
   */
  onClick: PropTypes.func,
  /**
   * 按学院导航（包括校级机构）的信息
   */
  instituteList: PropTypes.array
};
