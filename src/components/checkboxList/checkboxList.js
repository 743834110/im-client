import Taro, {Component} from '@tarojs/taro'
import {View, Checkbox} from '@tarojs/components'
import {AtList, AtListItem} from 'taro-ui'
import './checkboxList.scss'

/**
 * checkbox与AtList的集成组件
 * @author LTF
 * Created on 2019/1/16
 */
export default class CheckboxList extends Component{

  static defaultProps = {
    data: [
      {
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        extraText: '15软件服务外包1班'
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = props;
  }

  handleCheckboxListClick = (index, event) => {
    this.handleCheckboxClick(index, event);
  };

  handleCheckboxClick = (index, event) => {
    event.stopPropagation();
    console.log(index)
    let {data} = this.props;
    data[index].checked = !data[index].checked;
    this.setState({
      data: data
    })
  };

  render() {
    let {data} = this.state;
    return (
      <AtList>
        {
          data.map((value, index) => (
            <View className='checkbox-list-container' onClick={this.handleCheckboxListClick.bind(this, index)} >
              <Checkbox checked={value.checked} onClick={this.handleCheckboxClick.bind(this, index)} />
              <AtListItem
                title={value.title}
                key={index}
                note={value.extraText}
                thumb={value.thumb}
              />
            </View>
          ))
        }
      </AtList>
    )
  }
}
