import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import RoutineDesc from "../../components/routineDesc/routineDesc";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import FrequentAsk from "../../components/frequentAsk/frequentAsk";

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
   let param = decodeURIComponent(this.$router.params.routine).trim();
    let routine = JSON.parse(param);
    this.setState({
      routine: routine
    })

  }

  render() {
    let {routine} = this.state;
    let {discussionList} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='详情' backToPath='' />
        </View>
        <ScrollView
          className='flex-1'
          scrollY
        >
          <RoutineDesc routine={routine} />
          <FrequentAsk />
        </ScrollView>
        <View>
          fdfd
        </View>
      </View>
    )
  }
}


