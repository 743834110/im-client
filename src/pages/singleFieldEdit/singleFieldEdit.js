import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtButton} from "taro-ui";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import {getSubmitObject} from "../../utils/common";
import CustomTextarea from "../../components/customTextarea/customTextarea";


const mapStateToProps = ({loading}) => ({
  loading
});
@connect(mapStateToProps)
export default class SingleFieldEdit extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  componentWillMount() {
    let params = decodeURI(this.$router.params.params);
    console.log(JSON.parse(params));
    this.setState(JSON.parse(params))
  }



  /**
   * 此处做一些兼容小程序使用ref变量的操作
   */
  handleOnClick = () => {
   let data = getSubmitObject(this.refs);
   let {keyName, keyValue, type} = this.state;
   data[keyName] = keyValue;
   let {ref} = this.state;
   data[ref] = data["_input"];
   delete data["_input"];
   const {dispatch} = this.props;
    dispatch[type].update({
      ...data,
      callback(res) {
      }
    });

  };

  render() {
    let {title, value, type} = this.state;
    let {loading} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={title} />
        </View>
        <View className='flex-1' style={{
          marginTop: '48px'
        }}
        >
          <CustomTextarea height={400} ref='_input' value={value} />
        </View>
        <View className='margin-bottom-24'>
          <AtButton full type='primary' disabled={loading.models[type]} loading={loading.models[type]} onClick={this.handleOnClick}>保存</AtButton>
        </View>
      </View>
    );
  }
}
