import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs, AtTabsPane} from "taro-ui";
import PropTypes from "prop-types";
import RoutineList from "../routineList/routineList";


/**
 * @author litianfeng
 * Created on 2018/12/22
 */
export default class RoutineContainer extends Component{

  static defaultProps = {
    onRoutineClick: () => {},
    onRoutineLongPress: () => {},
    onUpperRefresh: () => {},
    onLowerRefresh: () => {},
    navigateToPath: '/pages/routineSearch/routineSearch',
    routineList: [
      {
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
      }
    ],
    dict: [
      {
        type: 'NEWS',
        title: '要闻'
      },
      {
        type: 'ACTIVITY',
        title: '活动',
      },
      {
        type: 'RECRUIT',
        title: '招聘'
      },
      {
        type: 'OTHERS',
        title: '其他'
      }
    ]
  };

  state = {
    /**
     * 当前标签页
     */
    current: 0,
    /**
     * 滚动组件应有的高度
     */
    scrollHeight: '10px'
  };

  constructor(props) {
    props.dict = [
      ...props.dict,
      {
        type: 'search',
        title: '🔍'
      }
    ];
    super(props);
  }

  componentWillReceiveProps(newProps) {

    if (Taro.getEnv() !== 'WEB') {
      return;
    }
    // 会报非法重写的错误，暂时这样写
    newProps.dict = [
      ...newProps.dict,
      {
        type: 'search',
        title: '🔍'
      }
    ];
  }


  /**
   * 估算组件的高度
   * 为routineList组件准备显示的高度
   */
  componentDidMount() {
    setTimeout(() => {
      Taro.createSelectorQuery().in(this.$scope || this)
        .select('.routine-container')
        .boundingClientRect(rect => {
          let containerHeight = rect.height;
          let scrollHeight = containerHeight - 50;
          this.setState({
            scrollHeight: '' + scrollHeight + 'px'
          })
        })
        .exec();
    }, 500);
  }

  componentWillUnmount() {
  }

  /**
   * 处理标签标题点击事件
   */
  handleTitleClick = (value) => {
    // 点击搜索栏，将跳转至指定的搜索页面
    let {dict, navigateToPath} = this.props;
    if (value === dict.length - 1) {
      Taro.navigateTo({
        url: navigateToPath
      });
      return;
    }

    this.setState({
      current: value
    })
  };

  render() {
    let {dict, routineList, onLowerRefresh, onUpperRefresh, onRoutineClick, onRoutineLongPress} = this.props;
    let {current, scrollHeight} = this.state;
    return (
      <View style={{
        height: '100%'
      }} className='routine-container'
      >
        <AtTabs current={current} tabList={dict} onClick={this.handleTitleClick} className='at-tabs-wrapper'>
          {
            dict
              .filter(element => element.type !== 'search')
              .map((element, index) => (
              <AtTabsPane key={index} current={current} index={index}>
                <View className='scroll-wrapper' style={{
                  height: scrollHeight
                }}
                >
                  <RoutineList
                    type={element.type}
                    onUpperRefresh={onUpperRefresh}
                    onLowerRefresh={onLowerRefresh}
                    routineList={routineList}
                    scrollHeight={scrollHeight}
                    onRoutineLongPress={onRoutineLongPress}
                    onRoutineClick={onRoutineClick}
                  />
                </View>
              </AtTabsPane>
            ))
          }

          <AtTabsPane key={dict.length} current={current} index={dict.length}>
            <View />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

RoutineContainer.propTypes = {
  /**
   * 日常活动数据分类
   */
  dict: PropTypes.array,
  /**
   * 日常活动数据
   */
  routineList: PropTypes.array,
  /**
   * 某滑块顶部刷新事件
   */
  onUpperRefresh: PropTypes.func,
  /**
   * 某滑块底部刷新事件
   */
  onLowerRefresh: PropTypes.func,
  /**
   * 将要被导航到指定页面的路径
   */
  navigateToPath: PropTypes.string,
  /**
   * 日常活动点击事件
   */
  onRoutineClick: PropTypes.func,
  /**
   * 日常活动长按事件
   */
  onRoutineLongPress: PropTypes.func
};
