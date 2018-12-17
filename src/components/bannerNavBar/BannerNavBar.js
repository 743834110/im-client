import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui'
import PropTypes from "prop-types";


export default class BannerNavBar extends Component {

  state = {
    current: 0
  };

  static defaultProps = {
    tabList: [
      {
        title: '标签页1',
        type: "A"
      },
      {
        title: '标签页2',
        type: "B"
      },
      {
        title: '标签页3',
        type: "C"
      }
    ]
  };

  handleClick (value) {
    let {tabList, onClick} = this.props;
    onClick(tabList[value].type);
    this.setState({
      current: value
    })

  }

  render() {
    let {tabList} = this.props;

    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane  index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane  index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}



BannerNavBar.propTypes = {
  tabList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string
  })).isRequired,
  onClick: PropTypes.func.isRequired
}
