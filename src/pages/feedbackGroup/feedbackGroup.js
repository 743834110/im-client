import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui';
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import FeedbackList from "../../components/feedbackList/feedbackList";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * @author LTF
 * @description 消息反馈容器组件
 * 原则上容器组件不应该承载涉及到太多页面布局的逻辑代码，但由于支持性问题，本组件
 * 支持标签组件的业务逻辑
 * Created on 2019/2/6
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class FeedbackGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {
    current: 0,
    tabList: [
      {title: '待查阅', list: [{}, {}, {}]},
      {title: '已查阅', list: [{}, {}, {}, {}]},
    ]

  };

  static defaultProps = {

  };

  handleButtonClick = (data) => {
    console.log(data)
  };

  handleContentClick = (data) => {
    console.log(data)
  };

  handleImageClick = (data, index) => {
    console.log(data)
    console.log(index)
  };

  handleTabClick = (current) => {
    this.setState({
      current
    })
  };


  render() {
    let {current, tabList} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'反馈信息'} />
        </View>
        <ScrollView scrollY className='flex-1'>
          <AtTabs customStyle={{overflowY: 'auto'}}  current={current} tabList={tabList} onClick={this.handleTabClick}>
            {
              tabList.map((value, index) => (
                <AtTabsPane current={current} index={index}>
                  <FeedbackList
                    list={value.list}
                    onImageClick={this.handleImageClick}
                    onContentClick={this.handleContentClick}
                    onButtonClick={this.handleButtonClick}
                  />
                </AtTabsPane>
              ))
            }
          </AtTabs>
        </ScrollView>
      </View>
    );
  }
}
