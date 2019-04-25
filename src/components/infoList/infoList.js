import Taro, {Component} from '@tarojs/taro';
import {AtList} from 'taro-ui'
import PropTypes from 'prop-types'
import {View, Text} from "@tarojs/components";
import CustomListItem from "../customListItem/customListItem";
import './infoList.scss'


/**
 * @author LTF
 * @description 字符串列表
 * Created on 2019/2/25
 */
export default class InfoList extends Component{

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
            <View className='string-list-container' key={value.id} >
              <CustomListItem value={value} key={index} onClick={onClick}  />
              <View className='override'>
                {
                  !value.extraThumb?
                    <Text className='text'>
                      {value.extraText}
                    </Text>: ''
                }
              </View>
            </View>
          ))
        }
      </AtList>
    );
  }
}

InfoList.propTypes = {
  /**
   * 列表数据
   */
  data: PropTypes.array,
  /**
   * 列表数据点击事件
   */
  onClick: PropTypes.func
};
