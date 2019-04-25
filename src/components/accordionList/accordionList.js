import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtAccordion} from "taro-ui";
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
        name: '办公室',
        key: '1',
        list: [
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
        ]
      },
      {
        name: '办公室',
        key: '1',
        list: [
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
          {title: '张三', note: '描述信息', thumb: ''},
        ]
      },
    ],
    options: null,
    onButtonItemClick: () => {},
    onListItemClick: () => {},
    onPickerChange: () => {}
  };

  constructor(props) {
    super(props)
    this.state = {
      opens: []
    };
  }

  handleOnClick = (index, open, event) => {
    let {opens} = this.state;
    opens[index] = !opens[index];
    this.setState({
      opens
    });
  };


  render() {
    let {data, options, onButtonItemClick, onListItemClick, onPickerChange} = this.props;
    let {opens} = this.state;
    return (
      <View>
        {
          data.map((value, index) => {
            const open = opens[index];
            return (
              <AtAccordion
                open={open}
                key={value.key}
                onClick={this.handleOnClick.bind(this, index)}
                title={value.name}
                customStyle={{
                  backgroundColor: 'white',
                }}

              >
                <ButtonList data={value.list} options={options} onPickerChange={onPickerChange.bind(this, index)}  onButtonItemClick={onButtonItemClick.bind(this, index)} onListItemClick={onListItemClick}  />
              </AtAccordion>
            )

            })
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
  onListItemClick: PropTypes.func,
  /**
   * 选择器点击事件
   */
  onPickerChange: PropTypes.func
};
