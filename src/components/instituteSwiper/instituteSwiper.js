import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import './instituteSwiper.scss'


/**
 * 学院信息轮播组件
 * @author litianfeng
 * Created on 2018/12/28
 */
export default class InstituteSwiper extends Component{

  static defaultProps = {
    bannerList: [
      {
        bannnerId: '1',
        bannerImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        bannerTitle: 'XXX院',
        routineId: '',
      },
      {
        bannnerId: '2',
        bannerImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        bannerTitle: 'XXX院',
        routineId: '',
      },
      {
        bannnerId: '3',
        bannerImageUrl: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        bannerTitle: 'XXX院',
        routineId: '',
      }
    ],

    onClick: () => {}
  };

  state = {

  };

  render() {
    let {bannerList, onClick} = this.props;
    return (
      <View>
        <Swiper
          className='institute-swiper-container'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          autoplay
        >
          {
            bannerList.map((value, index) => (
              <SwiperItem key={index} className='swiper-item-container'>
                <View className='banner-wrapper' onClick={onClick.bind(this, value)}>
                  <Text className='banner-title'>

                  </Text>
                  <Image
                    className='banner-image'
                    src={value.bannerImageUrl}
                    style={{
                      width: '100%'
                    }}
                  />
                </View>
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
    )
  }
}

InstituteSwiper.propTypes = {
  /**
   * 横幅信息列表
   */
  bannerList: PropTypes.array,
  /**
   * 横幅点击事件
   */
  onClick: PropTypes.func
};

