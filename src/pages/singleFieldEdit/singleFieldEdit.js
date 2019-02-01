import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtButton} from "taro-ui";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomTextarea from "../../../.temp/components/customTextarea/customTextarea";
import {getSubmitObject} from "../../utils/common";


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

  componentWillMount() {
    let params = decodeURI(this.$router.params.params);
    this.setState(JSON.parse(params))
  }

  handleOnClick = () => {
   let data = getSubmitObject(this.refs);
   let {keyName, keyValue} = this.state;
   data[keyName] = keyValue;
   console.log(data)
  };

  render() {
    let {title, ref} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={title} />
        </View>
        <View className='flex-1' style={{
          marginTop: '48px'
        }}
        >
          <CustomTextarea height={400} ref={ref} />
        </View>
        <View className='margin-bottom-24'>
          <AtButton full type='primary' onClick={this.handleOnClick}>保存</AtButton>
        </View>
      </View>
    );
  }
}
