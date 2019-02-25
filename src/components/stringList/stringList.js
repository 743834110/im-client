import Taro, {Component} from '@tarojs/taro';
import {AtList} from 'taro-ui'
import PropTypes from 'prop-types'
import {View, Text} from "@tarojs/components";
import CustomListItem from "../customListItem/customListItem";
import './stringList.scss'


/**
 * @author LTF
 * @description 字符串列表
 * Created on 2019/2/25
 */
export default class StringList extends Component{

  static defaultProps = {
    data: [],
    onClick: () => {},
  };

  state = {

  };

  render() {
    let {data, onClick} = this.props;
    return (
      <AtList >
        {
          data.map((value, index) => (
            <View className='string-list-container' >
              <CustomListItem value={value} key={index} onClick={onClick}  />
              <View className='override'>
                <Text className='text'>
                  {value.extraText}
                </Text>
              </View>
            </View>
          ))
        }
      </AtList>
    );
  }
}

StringList.propTypes = {
  /**
   * 列表数据
   */
  data: PropTypes.array,
  /**
   * 列表数据点击事件
   */
  onClick: PropTypes.func
};
