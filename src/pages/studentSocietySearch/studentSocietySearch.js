import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CategoryTag from "../../components/categoryTag/categoryTag";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});
@connect(mapStateToProps, mapDispatchToProps)
export default class StudentSocietySearch extends Component{

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='学生社团' />
        </View>
        <View className='flex-1'>
          <CategoryTag />
        </View>
      </View>
    );
  }
}
