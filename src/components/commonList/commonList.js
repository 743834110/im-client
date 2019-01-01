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
            data.map((value, index) => (
              <AtListItem
                key={index}
                iconInfo={value.iconInfo}
                title={value.title}
                arrow={value.arrow}
                note={value.note}
                onClick={onClick.bind(this, value)}
              />
            ))
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
