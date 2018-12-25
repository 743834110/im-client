import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import RoutineDesc from "../../components/routineDesc/routineDesc";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

/**
 * 日常活动详情页面
 */
@connect((state) => ({
  state
}), (dispatch) => ({
  dispatch
}))
export default class RoutineDetail extends Component{

  config = {
    navigationBarTitleText: ''
  };


  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let routine = JSON.parse(this.$router.params.routine);

    this.setState({
      routine: routine
    })

  }

  render() {
    let {routine} = this.state;
    let {discussion} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='详情' backToPath='' />
        </View>
        <View className='flex-1'>
          <RoutineDesc discussion={discussion} routine={routine} />
          
        </View>
        <View>
          fdfd
        </View>
      </View>
    )
  }
}


