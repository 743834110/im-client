import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import FeedbackList from "../../components/feedbackList/feedbackList";
import LoadMore from "../../components/loadMore/loadMore";
import {REFRESH_STATUS} from "../../utils/config";
import Tab from "../../components/index/tab";
import SQL from '../../utils/query'

const mapStateToProps = ({feedback: {entities, pagination, mappings: {readCurrent, unReadCurrent}}}) => {
  return {
    feedback: {
      list: [
        // N
        [
          ...new SQL().select(unReadCurrent).from(entities).exec()
        ],
        // Y
        [
          ...new SQL().select(readCurrent).from(entities).exec()
        ]
      ],
      pagination
    }
  }
};
/**
 * @author LTF
 * @description 消息反馈容器组件
 * 原则上容器组件不应该承载涉及到太多页面布局的逻辑代码，但由于支持性问题，本组件
 * 支持标签组件的业务逻辑
 * Created on 2019/2/6
 */
@connect(mapStateToProps)
export default class FeedbackGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {
    current: 0,
    tabList: ['待查阅', '已查阅'],
    refreshStatusList: [
      REFRESH_STATUS.NORMAL,
      REFRESH_STATUS.NORMAL
    ]

  };

  static defaultProps = {

  };

  componentWillMount() {
    this.setState(
      JSON.parse(decodeURI(this.$router.params.params))
    );
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const {keyValue} = this.state;
    Taro.showLoading({
      title: 'loading' ,
      mask: true,
    });
    dispatch({
      type: 'feedback/fetch',
      payload: {
        pager: {
          param: {
            read: 'N',
            orgId: keyValue
          }
        },
        paginationType: 'unRead',
        currentType: 'unReadCurrent',
        callback: () => {
          dispatch({
            type: 'feedback/fetch',
            payload: {
              pager: {
                param: {
                  read: 'Y',
                  orgId: keyValue
                }
              },
              paginationType: 'read',
              currentType: 'readCurrent',
              callback: () => {
                Taro.hideLoading()
              }
            }
          })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const {feedback} = nextProps;
    this.setState(prevState => {
      return {
        refreshStatusList: [
          feedback.pagination.unRead.current * feedback.pagination.unRead.pageSize >= feedback.pagination.unRead.total?
            REFRESH_STATUS.NO_MORE_DATA: REFRESH_STATUS.NORMAL,
          feedback.pagination.read.current * feedback.pagination.read.pageSize >= feedback.pagination.read.total?
            REFRESH_STATUS.NO_MORE_DATA: REFRESH_STATUS.NORMAL,
        ]
      }
    })
  }

  /**
   * 将某反馈变更为已读状态
   * @param data
   */
  handleButtonClick = (data) => {
    console.log(data)
    const{dispatch} = this.props;
    dispatch({
      type: 'feedback/update',
      payload: {
        feedback: {
          feedbackId: data.feedbackId,
          read: 'Y',
        },
        callback: () => {
          Taro.showToast({
            title: '修改状态成功',
            icon: 'success',
            duration: 2000
          })
            .then(() => this.componentDidMount())
        }
      }
    })
  };

  handleContentClick = (data) => {
    console.log(data)
  };

  handleImageClick = (data, index) => {
    console.log(data);
    console.log(index)
  };

  handleTabClick = (current) => {
    this.setState({
      current
    })
  };

  /**
   * 获取余下内容
   */
  handleOnScrollToLower = () => {
    const {keyValue, refreshStatusList, current} = this.state;
    if (refreshStatusList[current] !== REFRESH_STATUS.NO_MORE_DATA) {
      this.setState(prevState => ({
        refreshStatusList: prevState.refreshStatusList.map((item, index) => index === current? REFRESH_STATUS.REFRESHING: item)
      }));
      const {dispatch, feedback: {pagination}} = this.props;
      let read = 'Y';
      let currentType = 'readCurrent';
      let paginationType = 'read';
      if (current === 0) {
        read = 'N';
        currentType = 'unReadCurrent';
        paginationType = 'unRead'
      }
      console.log(pagination);
      dispatch({
        type: 'feedback/fetchLatter',
        payload: {
          pager: {
            param: {
              read,
              orgId: keyValue,
            },
            ...pagination[paginationType],
            offset: pagination[paginationType].current
          },
          currentType,
          paginationType
        }
      })
    }
  };
  
  render() {
    let {current, tabList, refreshStatusList} = this.state;
    const {feedback} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'反馈信息'} />
          <Tab tabList={tabList} current={current} onTabClick={this.handleTabClick} />
        </View>
        {
          feedback.list.filter((item, index) => index === current).map((item, index) => (
            <ScrollView scrollY className='flex-1' key={index} onScrollToLower={this.handleOnScrollToLower}>
              {
                <FeedbackList
                  list={item}
                  onImageClick={this.handleImageClick}
                  onContentClick={this.handleContentClick}
                  onButtonClick={this.handleButtonClick}
                />
              }
              <LoadMore status={refreshStatusList[current]} />
            </ScrollView>
          ))
        }
      </View>
    );
  }
}
