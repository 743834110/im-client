import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'
import PropTypes from 'prop-types'
import VerticalScrollTab from "../verticalScrollTab/verticalScrollTab";
import LabelGrid from "../labelGrid/labelGrid";
import {getHeightOfComponent} from "../../utils/display";
/**
 * @description 垂直标签宫格组件
 * @author litianfeng
 * Created on 2018/12/31
 */
export default class VerticalTabGrid extends Component{

  static defaultProps = {
    instituteList: [
      {shortName: '信息院1', orgId: '001'},
    ],
    orgList: [],
    onGridElementClick: () => {}
  };

  componentDidMount() {
  }


  handleTabClick = (value) => {
    console.log(value)
    this.setState({
      scrollIntoViewId: 'element-' + value.orgId
    })
  };

  render() {
    let {instituteList, orgList, onGridElementClick} = this.props;
    let {scrollIntoViewId} = this.state;
    return (
      <View style={{
        height: '100%',
        display: "flex",
        flexDirection: 'row',
      }}
      >
        <View style={{
          borderRight: '1px solid #d6e4ef',
          height: '100%'
        }}
        >
          <VerticalScrollTab onClick={this.handleTabClick} instituteList={instituteList} />
        </View>
        <ScrollView
          className='scroll-view'
          style={{
          flex: 1
        }}
          scrollY
          animation
          scrollIntoView={scrollIntoViewId}
        >
          {
            instituteList.map((value, index) => (
              <View id={`element-${value.orgId}`} key={value.orgId}>
                <LabelGrid orgList={orgList[index]} title={value.shortName} titleId={value.orgId} onGridElementClick={onGridElementClick} />
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

VerticalTabGrid.propTypes = {
  /**
   * 学院信息列表
   */
  instituteList: PropTypes.array,
  /**
   * 学生机构信息列表
   */
  orgList: PropTypes.array,
  /**
   * 元素点击事件
   */
  onGridElementClick: PropTypes.func
};
