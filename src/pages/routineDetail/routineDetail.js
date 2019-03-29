import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import RoutineDesc from "../../components/routineDesc/routineDesc";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import FrequentAsk from "../../components/frequentAsk/frequentAsk";
import InputBar from "../../components/inputBar/inputBar";

/**
 * 日常活动详情页面
 */
@connect((state) => ({
  state
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

  handleOnClick = (value) => {
    console.log(value)
  };


  render() {
    let {routine} = this.state;
    let {discussionList} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='详情' backToPath='' />
        </View>
        <ScrollView
          className='display-flex-column flex-1'
          scrollY
        >
          <RoutineDesc routine={routine} />
          <View style={{flex: 1}}>
            <FrequentAsk discussionList={discussionList} />
          </View>
        </ScrollView>
        <View>
          <InputBar onClick={this.handleOnClick} />
        </View>
      </View>
    )
  }
}


