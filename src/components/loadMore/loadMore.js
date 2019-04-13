import Taro, {PureComponent} from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './loadMore.less'
import {REFRESH_STATUS} from "../../utils/config";


/**
 * Created on 2019/4/11
 */
export default class LoadMore extends PureComponent {
  static propTypes = {
    status: PropTypes.number,
  };

  static defaultProps = {
    status: REFRESH_STATUS.NORMAL
  };

  render() {
    const {status} = this.props;

    let view = null;
    switch (status) {
      case REFRESH_STATUS.NORMAL: {
        view = <View className='normal' />
      }
        break;
      case REFRESH_STATUS.REFRESHING: {
        view = (
          <View className='loading'>
            <AtActivityIndicator size={15} color='#2d8cf0' content='loading...' />
          </View>
        )
      }
        break;
      case REFRESH_STATUS.NO_MORE_DATA: {
        view = <View className='no-more-data'>-- No More Data --</View>
      }
    }
    return (
      <View style={{backgroundColor: '#f5f5f9'}}>
        {view}
      </View>
    )
  }

}
