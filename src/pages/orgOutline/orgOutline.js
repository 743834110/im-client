import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import InstituteSwiper from "../../components/instituteSwiper/instituteSwiper";
import CommonList from "../../components/commonList/commonList";
import TabBar from "../../components/tabBar/tabBar";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

/**
 * 机构轮廓页面
 */

const mapStateToProps = ({tabPage}) => ({
  tabPage
});

const mapDispatchToProps = ({tabPage: {switchTab}}) => ({
  dispatchSwitchTab: (props) => {
    switchTab(props)
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class OrgOutline extends Component {

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {
    currentOrgEntrance: [
      {
        title: '15外包1班',
        ext: {
          path: ''
        }
      },
      {
        title: '朝歌艺术团',
        ext: {
          path: ''
        }
      },
      {
        title: 'ReflectMind',
        ext: {
          path: ''
        }
      }
    ]
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  handleSwiperClick = (value) => {
    console.log(value);
  };

  /**
   * 机构选择入口点击事件
   * @param value
   */
  handleCommonListClick = (value) => {
    console.log(value);
    Taro.navigateTo({
      url: value.url
    })
  };



  render() {
    let {currentOrgEntrance} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='学院机构' isBack={false} />
        </View>
        <ScrollView
          className='flex-1'
          scrollY
          style={{
            height: '10px'
          }}
        >
          <View>
            <InstituteSwiper onClick={this.handleSwiperClick} />
          </View>

          <View className='margin-top-24'>
            <CommonList onClick={this.handleCommonListClick} />
          </View>
          <View className='margin-top-24 white'>
            <Text style={{
              color: '#999999',
              fontSize: '0.68267rem',
              marginLeft: '12px'
            }}
            >
              我的机构
            </Text>
            <CommonList data={currentOrgEntrance} />
            <CommonList data={currentOrgEntrance} />
            <CommonList data={currentOrgEntrance} />
            <CommonList data={currentOrgEntrance} />
          </View>
        </ScrollView>
        <View>
          <TabBar current={1} />
        </View>
      </View>
    )

  }

}
