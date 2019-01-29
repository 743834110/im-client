import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList, AtListItem, AtButton} from 'taro-ui'
import PropTypes from 'prop-types'
import './buttonList.scss'

/**
 * @author LTF
 * @description 带有滑动组件的列表组件
 * 在本组件中只是纯粹着进行数据的展示，不涉及到操作过滤的细节。
 * Created on 2019/1/28
 */
export default class ButtonList extends Component {

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
    options: ["移除"],
    onListItemClick: () => {},
    onButtonItemClick: () => {}

  };

  state = {

  };


  render() {
    let {data, options, onButtonItemClick, onListItemClick} = this.props;
    console.log(data)
    return (
      <AtList >
        {
          data.map((value, index) => (
            <View className='swipe-list-item-container' key={value.id}>
              <AtListItem
                className='list-item'
                title={value.title}
                key={value.id}
                note={value.note}
                thumb={value.thumb}
                onClick={onListItemClick.bind(this, value, index)}
              />
              <View className='button-container'>
                {
                  options.map((title, optionIndex) => (
                    <View className='button-wrapper' key={optionIndex}>
                      <AtButton
                        type='primary'
                        size='small'
                        onClick={onButtonItemClick.bind(this, optionIndex, value, index)}
                      >
                        {title}
                      </AtButton>
                    </View>
                  ))
                }
              </View>
            </View>
          ))
        }
      </AtList>
    );
  }
}

ButtonList.propTypes = {
  /**
   * 普通列表数据
   */
  data: PropTypes.array,
  /**
   * 列表带有的额外选项
   */
  options: PropTypes.array,
  /**
   * 列表项点击事件
   */
  onListItemClick: PropTypes.func,
  /**
   * 列表项中按钮点击事件
   */
  onButtonItemClick: PropTypes.func

};
