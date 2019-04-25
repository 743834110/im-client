import Taro, {PureComponent} from '@tarojs/taro';
import {AtButton} from "taro-ui";
import {connect} from '@tarojs/redux';
import {ScrollView, View} from "@tarojs/components";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

import CustomTextarea from "../../components/customTextarea/customTextarea";
import CustomImagePicker from "../../components/customImagePicker/customImagePicker";
import {getSubmitObject} from "../../utils/common";
import {base} from "../../utils/config";
import request from "../../utils/request";

const mapStateToProps = ({loading}) => {
  return {
    loading: loading.effects.feedback.add
  }
};

@connect(mapStateToProps)
export default class AddFeedBack extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
  }


  handleOnClick = () => {
    const {orgId} = this.$router.params;
    const {dispatch} = this.props;
    const object = getSubmitObject(this.refs);
    Taro.showModal({
      title: '提示',
      content: '是否确认进行消息的反馈?'
    }).then(res => {
      // 管理不同端的行为:允许微信端进行文件上传操作
      if (res.confirm) {
        Taro.showLoading({
          title: 'loading',
          mask: true
        });
        const response = [];
        const uploadProcess = [];
        if (process.env.TARO_ENV === 'weapp') {
          object.files.forEach(file => {
            uploadProcess.push(Taro.uploadFile({
              url: `${base}/rest/fileService/upload`,
              filePath: file.url,
              name: 'files',
              fail: err => {
                console.log(err);
              },
              success: (res1 => {
                response.push(res1);
              })
            }))
          });
        }
        // 处理上传结果，准备反馈信息的上传
        Promise.all(uploadProcess).then((res) => {
          object.imageUrlOne = response.length > 0? JSON.parse(response[0].data).data.filePath: null;
          object.imageUrlTwo = response.length > 1? JSON.parse(response[1].data).data.filePath: null;
          object.orgId = orgId;
          dispatch.feedback.add({
            ...object,
            callback: () => {
              Taro.hideLoading();
              Taro.showToast({
                title: '反馈完毕',
                icon: 'success',
                duration: 2000,
                success: () => {
                  setTimeout(() => {
                    Taro.redirectTo({
                      url: `/pages/orgHome/orgHome?orgId=${orgId}`
                    })
                  }, 2000)
                }
              })
            }
          })
        });

      }
    });
  };

  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='意见反馈' />
        </View>
        <ScrollView scrollY className='flex-1'>
          <View>
            <View className='common-desc-text margin-top-24' >匿名反馈信息</View>
            <View>
              <CustomTextarea ref='content'  />
            </View>
            <View className='margin-top-24'>
              <CustomImagePicker length={4} limit={2} ref='files'  />
            </View>
          </View>
          <AtButton full type='primary' className='margin-top-24'  onClick={this.handleOnClick} >反馈</AtButton>
        </ScrollView>
      </View>
    )
  }
}
