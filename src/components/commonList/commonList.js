import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtActivityIndicator, AtList, AtListItem} from "taro-ui";

/**
 * 通用列表组件
 * @author litianfeng
 * Created on 2018/12/29
 */
export default class CommonList extends Component {


  static defaultProps = {
    data: [
      {
        title: '学校机构',
        url: '/pages/orgReview/orgReview',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        arrow: 'right',
        note: '',
        iconInfo: {
          size: 25,
          color: '#78A4FA',
          value: 'map-pin'
        },
        ext: {
          path: ''
        }
      },
      {
        title: '学生机构',
        url: '/pages/orgReview/orgReview',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        arrow: 'right',
        note: '',
        iconInfo: {
          size: 25,
          color: '#78A4FA',
          value: 'map-pin'
        },
        ext: {
          path: ''
        }
      },
      {
        title: '学生社团',
        url: '/pages/studentSocietySearch/studentSocietySearch',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        arrow: 'right',
        note: '',
        iconInfo: {
          size: 25,
          color: '#78A4FA',
          value: 'calendar'
        },
        ext: {
          path: ''
        }
      }
    ],
    onClick: () => {},
    onSwitchChange: () => {},
    loading: undefined
  };

  state = {

  };

  render() {
    let {data, onClick, onSwitchChange, loading} = this.props;
    const isLoadingDefined = typeof loading !== 'undefined';
    return (
      <View>
        {
          isLoadingDefined?
            loading?
              <AtActivityIndicator mode='center' />: null
            : null
        }
        <AtList>
          {
            data.map((value, index) => {
              let thumb = typeof value.iconInfo !== 'undefined'? null: value.thumb;
              return (
              <AtListItem
                thumb={thumb}
                key={index}
                iconInfo={value.iconInfo}
                title={value.title}
                arrow={value.arrow}
                note={value.note}
                onClick={onClick.bind(this, value)}
                isSwitch={value.switch}
                switchIsCheck={value.check}
                disabled={value.disabled}
                onSwitchChange={onSwitchChange.bind(this, index)}
              />
            )})
          }
        </AtList>
      </View>
    )
  }
}

CommonList.propTypes = {
  /**
   * 列表数据
   */
  data: PropTypes.array,
  /**
   * 列表点击事件
   */
  onClick: PropTypes.func,
  /**
   * 选择开关事件
   */
  onSwitchChange: PropTypes.func,
  /**
   * 是否在加载过程中
   */
  loading: PropTypes.bool
};
