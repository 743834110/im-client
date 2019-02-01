import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtAccordion, AtList, AtListItem} from "taro-ui";
import CommonList from "../commonList/commonList";
import ButtonList from "../buttonList/buttonList";

/**
 * 数据驱动手风琴组件
 * @author litianfeng
 * Created on 2019/1/7
 */
export default class AccordionList extends Component{

  static defaultProps = {
    data: [
      {
        shortName: '办公室',
        id: '1',
        list: [
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
        ]
      }
    ],
    options: null,
    onButtonItemClick: () => {},
    onListItemClick: () => {}
  };

  state = {

  };

  handleOnClick = () => {
    console.log("fdfdf")
  };

  render() {
    let {data, options, onButtonItemClick, onListItemClick} = this.props;
    return (
      <View
        style={{
          marginTop: '24px'
        }}
      >
        {
          data.map((value) => (
            <AtAccordion
              key={value.id}
              onClick={this.handleOnClick}
              title={value.shortName}
              customStyle={{
                backgroundColor: 'white'
              }}
            >
              <ButtonList data={value.list} options={options} onButtonItemClick={onButtonItemClick} onListItemClick={onListItemClick}  />
            </AtAccordion>
          ))
        }
      </View>
    )
  }
}

AccordionList.propTypes = {
  /**
   * 数据数组
   */
  data: PropTypes.array,
  /**
   * 按钮文本列表
   */
  options: PropTypes.array,
  /**
   * 按钮项目点击事件
   */
  onButtonItemClick: PropTypes.func,
  /**
   * 列表项点击事件
   */
  onListItemClick: PropTypes.func
};
