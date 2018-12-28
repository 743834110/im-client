import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import InstituteSwiper from "../../components/instituteSwiper/instituteSwiper";

/**
 *
 */
@connect((state) => ({
  state
}), (dispatch) => ({
  dispatch
}))
export default class OrgOutline extends Component{

  static defaultProps = {

  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.$router)
  }

  render() {

    return (
      <View>
        <InstituteSwiper />
      </View>
    )

  }

}
