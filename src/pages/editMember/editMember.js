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

  static defaultProps = {
    options: [
      {
        title: '兼职',
        range: ["本部门", "本机构", "本学院", "不限"],
        onChange: (optionIndex, value, index, event) => {

        }
      },
      {
        title: '转职',
        range: ['干事', '部长', '副会长', '会长'],
        onChange: (optionIndex, value, index, event) => {

        }
      },
      '移除'
    ],
    commonListData: [
      {
        title: '添加成员',
        url: '/pages/addMember/addMember',
        arrow: 'right',

      }
    ]
  };

  handleButtonItemClick = (optionIndex, value, index) => {

  };

  handleCommonListClick = (value, event) => {
    Taro.navigateTo({
      url: value.url
    })
  };

  render() {
    let {options, commonListData} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'成员调整'} />
        </View>
        <View className='flex-1'>
          <View className='margin-top-24'>
            <CommonList data={commonListData} onClick={this.handleCommonListClick}  />
          </View>
          <View className='margin-top-24'>
            <AccordionList options={options} onButtonItemClick={this.handleButtonItemClick} />
          </View>
        </View>
      </View>
    );
  }
}
