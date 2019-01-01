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
      {shortName: '信息院2', orgId: '002'},
      {shortName: '信息院3', orgId: '003'},
      {shortName: '信息院4', orgId: '004'},
      {shortName: '信息院5', orgId: '005'},
      {shortName: '信息院6', orgId: '006'},
      {shortName: '信息院7', orgId: '007'},
      {shortName: '信息院8', orgId: '008'},
      {shortName: '信息院9', orgId: '009'},
      {shortName: '信息院10', orgId: '010'},
      {shortName: '信息院11', orgId: '011'},
      {shortName: '信息院12', orgId: '012'},
      {shortName: '信息院13', orgId: '013'},
      {shortName: '信息院14', orgId: '014'},
    ],
    orgList: []
  };

  componentDidMount() {
  }


  handleTabClick = (value) => {
    console.log(value)
    this.setState({
      scrollIntoViewId: 'element-' + value.orgId
    })
  };

  handleElementClick = (value) => {
    console.log(value)
  }

  render() {
    let {instituteList} = this.props;
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
            instituteList.map((value) => (
              <View id={`element-${value.orgId}`} key={value.orgId}>
                <LabelGrid title={value.shortName} titleId={value.orgId} onGridElementClick={this.handleElementClick} />
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
  orgList: PropTypes.array
};
