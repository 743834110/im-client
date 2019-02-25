import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtButton} from "taro-ui";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import {getSubmitObject} from "../../utils/common";
import CustomTextarea from "../../components/customTextarea/customTextarea";


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

  state = {

  };

  componentWillMount() {
    let params = decodeURI(this.$router.params.params);
    this.setState(JSON.parse(params))
  }



  /**
   * 此处做一些兼容小程序使用ref变量的操作
   */
  handleOnClick = () => {
   let data = getSubmitObject(this.refs);
   let {keyName, keyValue} = this.state;
   data[keyName] = keyValue;
   let {ref} = this.state;
   data[ref] = data["_input"];
   delete data["_input"];
   console.log(data, ref)
  };

  render() {
    let {title} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={title} />
        </View>
        <View className='flex-1' style={{
          marginTop: '48px'
        }}
        >
          <CustomTextarea height={400} ref='_input' />
        </View>
        <View className='margin-bottom-24'>
          <AtButton full type='primary' onClick={this.handleOnClick}>保存</AtButton>
        </View>
      </View>
    );
  }
}
