import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FeedbackGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'反馈信息'} />
        </View>
        <ScrollView scrollY className='flex-1'>

        </ScrollView>
      </View>
    );
  }
}
