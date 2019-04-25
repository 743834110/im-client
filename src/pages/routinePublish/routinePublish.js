import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import {AtButton, AtList} from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomInput from "../../components/customInput/customInput";
import {getSubmitObject} from "../../utils/common";
import CustomTextarea from "../../components/customTextarea/customTextarea";
import CustomImagePicker from "../../components/customImagePicker/customImagePicker";
import ItemPicker from "../../components/itemPicker/itemPicker";
import ItemSwitch from "../../components/itemSwitch/itemSwitch";
import SQL from "../../utils/query";


const mapStateToProps = ({dictionary: {entities, mappings: {current}}, loading}) => ({
  dictionary: {
    list: new SQL()
      .select(current)
      .from(entities)
      .exec()
  },
  loading: loading.effects.routine.add
});
/**
 * 消息发布界面
 * @author litianfeng
 * Created on 2019/1/9
 */
@connect(mapStateToProps)
export default class RoutinePublish extends Component{
  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  componentDidMount() {
    const params = this.$router.params;
    const {dispatch} = this.props;
    // 要获取可见范围
    dispatch({
      type: 'dictionary/fetch',
      payload: {
        pager: {
          param: {
            codeItemId: `ROUTINE_ACCESS_${params.orgType}`
          },
          sorter: {
            codeName: 'desc'
          }
        }
      }
    })
  }

  handleSubmit = (event) => {
    let object = getSubmitObject(this.refs);
    const {dispatch} = this.props;
    dispatch.routine.add({
      routine: {
        ...object,
        orgId: this.$router.params.orgId,
        orgName: decodeURIComponent(this.$router.params.orgName)
      },
      callback: (res) => {
        // 跳转至发布结果界面
        const status = res.status >= 200 && res.status <= 300;
        Taro.navigateTo({
          url: `/pages/operateStatus/operateStatus?status=${status}`
        })
      }
    });
  };

  handleReSet = (event) => {
    console.log(event)
  };

  render() {
    const {dictionary, loading} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title={'消息发布'} />
        </View>
        <ScrollView
          style={{
            height: '10px'
          }}
          scrollY
          className='flex-1'
        >
          <View className='default-padding-left '>
            <CustomInput ref='title' placeholder={'标题'} />
          </View>
          <View className='margin-top-24'>
            <CustomTextarea ref='content' placeholder={'基本内容'} maxLength={400} />
          </View>
          <View className='margin-top-24'>
            <CustomImagePicker ref='files' />
          </View>
          <View className='margin-top-24'>
            <AtList>
              <ItemPicker title={'可见范围'} ref='visibility' range={dictionary.list} />
              <ItemPicker title={'消息分类'} ref='routineType' />
              <ItemPicker title={'截止日期'} mode='date' ref='endTime' />
              <ItemSwitch title={'启用横幅'} ref='banner' />
            </AtList>
          </View>
          <View className='margin-top-24'>
            <AtButton loading={loading} type='primary' onClick={this.handleSubmit}>提交</AtButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}
