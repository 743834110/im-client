import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";
import AccordionList from "../../components/accordionList/accordionList";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class EditMember extends Component{
  config = {
    navigationBarTitleText: ''
  };

  handleButtonItemClick = (optionIndex, value, index) => {
    console.log(optionIndex)
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'成员调整'} />
        </View>
        <View className='flex-1'>
          <View className='margin-top-24'>
            <CommonList />
          </View>
          <View className='margin-top-24'>
            <AccordionList options={['兼任', '转职', '移除']} onButtonItemClick={this.handleButtonItemClick} />
          </View>
        </View>
      </View>
    );
  }
}
