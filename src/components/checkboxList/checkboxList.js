import Taro, {PureComponent} from '@tarojs/taro'
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
export default class CheckboxList extends PureComponent{

  static defaultProps = {
    data: [
      {
        id: '001',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        note: '15软件服务外包1班',
        extraText: '2015874136',
      },
      {
        id: '002',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        note: '15软件服务外包1班',
        extraText: '2015874136',
      }
    ],
    onCheckboxItemClick: () => {},
    excludeIds: [],
    defaultIds: []
  };

  state = {
    listData: []
  };

  constructor(props) {
    super(props);

    // 进行默认选中的数据和禁止点击的数据
    let {excludeIds, defaultIds, data} = this.props;
    data.forEach(value => {
      value.disabled = excludeIds.some(excludeId => excludeId === value.key);
      value.checked = defaultIds.some(defaultId => defaultId === value.key);
    });

    this.state = {
      listData: [
        ...data
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data)
    console.log(this.props.data)
  }

  handleCheckboxListClick = (index, event) => {
    this.handleCheckboxClick(index, event);
  };

  handleCheckboxClick = (index, event) => {

    event.stopPropagation();
    let {listData} = this.state;

    // 检查该选项时候应该被排除在外
    if (listData[index].disabled) {
      return;
    }
    listData[index].checked = !listData[index].checked;
    let value = listData.filter(value => value.checked).map(value => value.id);
    console.log(listData);
    this.setState({
      listData: [
        ...listData
      ]
    });
    let {onCheckboxItemClick} = this.props;
    onCheckboxItemClick(value);

  };

  render() {
    let {listData, temp} = this.state;
    console.log(temp);
    return (
      <AtList>
        {
          listData.map((value, index) => (
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
                disabled={value.disabled}
              />
              <AtListItem
                className='list-item'
                title={value.title}
                key={index}
                note={value.note}
                thumb={value.thumb}
                extraText={value.extraText}
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
  /**
   * 排除在选则范围之外的Id数组
   */
  excludeIds: PropTypes.array,
  /**
   * 默认选中的Id数组
   */
  defaultIds: PropTypes.array
};
