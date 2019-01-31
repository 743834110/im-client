import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SingleFieldEdit extends Component {

  config = {
    navigationBarTitleText: ''
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'XXX'} />
        </View>
        <View className='flex-1'>
          
        </View>
      </View>
    );
  }
}
