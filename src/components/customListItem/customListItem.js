import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import {AtListItem} from "taro-ui";


/**
 * @author LTF
 * @description 自定义列表项组件
 * Created on 2019/2/9
 */
export default class CustomListItem extends Component{

  static defaultProps = {
    value: {
      key: '002',
      thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
      title: '行者孙',
      note: '15软件服务外包1班1班1班1班1班1班1班1班1班1班',
      extraText: '2015874136',
      fromId: "001"
    }
  };

  render() {
    let {value, onClick} = this.props;
    return (
      <AtListItem
        title={value.title}
        key={value.key}
        note={value.note}
        thumb={value.thumb}
        iconInfo={value.iconInfo}
        arrow={value.arrow}
        onClick={onClick.bind(this, value)}
        extraThumb={value.extraThumb}
        disabled={value.disabled}
      />
    );
  }
}

CustomListItem.propTypes = {
  /**
   * 列表单元项数据
   */
  value: PropTypes.object,
  /**
   * 列表点击事件
   */
  onClick: PropTypes.func
};
