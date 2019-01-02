import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtList, AtListItem} from "taro-ui";

/**
 * 通用列表组件
 * @author litianfeng
 * Created on 2018/12/29
 */
export default class CommonList extends Component {


  static defaultProps = {
    data: [
      {
        title: '校园级机构',
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
      },
      {
        title: '我的学院',
        arrow: 'right',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
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
    onClick: () => {
    }
  };

  render() {
    let {data, onClick} = this.props;

    return (
      <View>
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
  onClick: PropTypes.func
};
