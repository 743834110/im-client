import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtTabs, AtTabsPane} from "taro-ui";
import RoutineList from "../routineList/routineList";

/**
 * @description 机构主页标签页
 * @author litianfeng
 * Created on 2019/1/4
 */
export default class OrgHomeTab extends Component {

  static defaultProps = {
    tabList: [
      {title: '简介'},
      {title: '动态'},
      {title: '组织架构'},
      {title: '联系我们'},
    ],
    org: {},
    routineList: [
      {}, {}, {}
    ]
  };

  state = {
    current: 0,
    routineList: []
  };

  handleTabClick = (current) => {
    this.setState({
      current: current
    })
  };

  handleUpperRefresh = () => {
    this.setState(prevState => ({
      routineList: [
        ...prevState.routineList,
        {}, {}, {}
      ]
    }))
  };

  render() {
    let {tabList, org} = this.props;
    let {routineList} = this.state;
    return (
      <AtTabs
        customStyle={{
          height: '100%'
        }}
        current={this.state.current}
        tabList={tabList}
        onClick={this.handleTabClick}
      >
        <AtTabsPane current={this.state.current} index={0} >
          <View>

          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View>
            <RoutineList
              routineList={routineList}
              onUpperRefresh={this.handleUpperRefresh}
            />
          </View>
        </AtTabsPane>
        {
          tabList.length >= 3?
            <AtTabsPane current={this.state.current} index={2}>
            <View>

            </View>
          </AtTabsPane>: ''
        }
        {
          tabList.length >= 4?
            <AtTabsPane current={this.state.current} index={3}>
              <View>

              </View>
            </AtTabsPane>: ''
        }
      </AtTabs>
    )
  }
}

OrgHomeTab.propTypes = {
  /**
   * 标签标题列表
   */
  tabList: PropTypes.array,
  /**
   * 组织基本信息
   */
  org: PropTypes.object,
  /**
   * 有关于该组织发布的消息
   */
  routineList: PropTypes.array

};
