import Taro, {Component} from '@tarojs/taro'
import {View, Checkbox} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtList, AtListItem} from 'taro-ui'
import './checkboxList.scss'
import {isRequireEnvironment} from "../../utils/display";

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
      },
      {
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        extraText: '15软件服务外包1班'
      }
    ],
    onCheckboxItemClick: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  handleCheckboxListClick = (index, event) => {
    this.handleCheckboxClick(index, event);
  };

  handleCheckboxClick = (index, event) => {
    event.stopPropagation();
    let {data} = this.state;
    data[index].checked = !data[index].checked;
    let value = data.filter(value => value.checked);
    this.setState({
      data: data,

    });
    let {onCheckboxItemClick} = this.props;
    onCheckboxItemClick(value);

  };

  render() {
    let {data} = this.state;
    return (
      <AtList>
        {
          data.map((value, index) => (
            <View
              key={index}
              className='checkbox-list-container'
              onClick={this.handleCheckboxListClick.bind(this, index)}
            >
              <Checkbox
                className={isRequireEnvironment('h5')?`checkbox ${value.checked?'checkbox-active': ''}`: ''}
                color={isRequireEnvironment('h5')? '#fff': '#6190E8'}
                checked={value.checked}
                onClick={this.handleCheckboxClick.bind(this, index)}
              />
              <AtListItem
                className='list-item'
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

CheckboxList.propTypes = {
  /**
   * 被展示的数据
   */
  data: PropTypes.array,
  /**
   * 列表多选组件点击事件
   */
  onCheckboxItemClick: PropTypes.func,

};
