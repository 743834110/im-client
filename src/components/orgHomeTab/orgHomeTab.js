import Taro, {Component} from '@tarojs/taro'
import {View, RichText, ScrollView} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtTabs, AtTabsPane} from "taro-ui";
import RoutineList from "../routineList/routineList";
import {getSystemInfo} from "../../utils/display";
import AccordionList from "../accordionList/accordionList";

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
    scrollHeight: '10px'
  };

  componentWillMount() {
    getSystemInfo()
      .then((rect) => {
        let scrollHeight = rect.windowHeight - 46 * 2 - 150;
        this.setState({
          scrollHeight: scrollHeight + 'px'
        })
      })
  }

  handleTabClick = (current) => {
    this.setState({
      current: current
    })
  };

  handleUpperRefresh = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        routineList: [
          ...prevState.routineList,
          {}, {}, {}
        ]
      }))
    }, 300)
  };

  render() {
    let {tabList, org, routineList, onLowerRefresh, onRoutineClick} = this.props;
    let {scrollHeight} = this.state;
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
            <RichText nodes={org.orgDescription} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View>
            <RoutineList
              scrollHeight={scrollHeight}
              routineList={routineList}
              useUpperRefresh={false}
              onUpperRefresh={this.handleUpperRefresh}
              onRoutineClick={onRoutineClick}
              onLowerRefresh={onLowerRefresh}
            />
          </View>
        </AtTabsPane>
        {
          tabList.length >= 3?
            <AtTabsPane current={this.state.current} index={2}>
            <View >
              <AccordionList />
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
  routineList: PropTypes.array,
  /**
   *
   */
  onRoutineClick: PropTypes.func,
  /**
   *
   */
  onLowerRefresh: PropTypes.func

};
