import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui';
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatOutline extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} />
        </View>
        <ScrollView scrollY className='flex-1'>

        </ScrollView>
      </View>
    );
  }
}
