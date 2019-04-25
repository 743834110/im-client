import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import ButtonList from "../../components/buttonList/buttonList";

/**
 * 将state数据映射到容器组件中
 * @param state
 * @returns {{selectedMembers: any[], currentUser: *}}
 */
const mapStateToProps = (state) => {
  let userOrg = state.userOrg .entities;
  let data = state.selectedMembers
    .map(userId => userOrg[userId]? {
      id: userId,
      thumb: userOrg[userId].userImageUrl,
      title: userOrg[userId].userName,
      note: userOrg[userId].orgName
    }: {

    });
  return {
    data: data,
    selectedMembers: state.selectedMembers,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  deleteSelected: (item) => dispatch.selectedMembers.deleteSelected(item),
});

/**
 * @author LTF
 * @description 已选择成员界面容器组件
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class SelectedMember extends Component {

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {
    options: ["移除"],
    data: []
  };

  state = {

  };

  handleListItemClick = (value, index, event) => {
  };

  handleButtonItemClick = (optionIndex, value, index, event) => {
    let {data, deleteSelected} = this.props;
    if (optionIndex === 0) {
      deleteSelected(data[index].id);
    }
  };


  render() {
    let {data, options} = this.props;
    console.log(data)
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'已选成员'} />
        </View>
        <ScrollView className='flex-1' scrollY>
          <ButtonList data={data} options={options} onButtonItemClick={this.handleButtonItemClick} onListItemClick={this.handleListItemClick} />
        </ScrollView>
      </View>
    );
  }
}
