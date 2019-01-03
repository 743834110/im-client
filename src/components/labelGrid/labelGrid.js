import Taro, {Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import {AtGrid} from "taro-ui";
import PropTypes from 'prop-types'
import './labelGrid.scss'

/**
 * @author litianfeng
 * @description 带有的标签的宫格组件
 * Created on 2018/12/31
 */
export default class LabelGrid extends Component{

  static defaultProps = {
    title: '信息院',
    titleId: '001',
    onGridElementClick: () => {},
    orgList: [
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
      {
        shortName: '自强社',
        orgImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png'
      },
    ]
  };

  state = {

  };
  /**
   * 将被渲染的数据
   */
  renderData = [];



  constructor(props) {
    super(props);
    let {orgList} = props;
    this.resetGridData(orgList);
  }

  componentWillReceiveProps(nextProps) {
    let {orgList} = nextProps;
    this.resetGridData(orgList);
  }

  /**
   * 重新整备将要被宫格渲染的数据
   * 暂时不按照id过滤数据
   * @param orgList
   */
  resetGridData(orgList) {
    this.renderData = orgList.map((value) => ({
        ...value,
      image: value.orgImageUrl,
      value: value.shortName
    }));
  }

  render() {
    let {title, titleId, orgList, onGridElementClick} = this.props;
    return (
      <View className='label-grid-container'>
        <Text className='text'>{title}</Text>
        <AtGrid mode='square' hasBorder={false} data={this.renderData} onClick={onGridElementClick} />
      </View>
    )
  }
}

LabelGrid.propTypes = {
  /**
   * 宫格标题
   */
  title: PropTypes.string,
  /**
   * 宫格标题Id
   */
  titleId: PropTypes.string,
  /**
   * 归属某Id的组织信息
   */
  orgList:PropTypes.array,
  /**
   * 网格元素点击事件
   */
  onGridElementClick: PropTypes.func

};
