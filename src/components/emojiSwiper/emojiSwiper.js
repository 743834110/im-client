import { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import PropTypes from 'prop-types'
import './emojiSwiper.scss';
import EmojiGrid from "../emojiGrid/emojiGrid";

/**
 * 274E
 * @author LTF
 * @description 表情包展示组件
 * Created on 2019/2/19
 */
export default class EmojiSwiper extends Component {

  static defaultProps = {
    onEmojiClick: PropTypes.func,
    start: 128513,
    end: 128591,
    exclude: [128519, 128520],
    rowNum: 3,
    columnNum: 7,
    deleteSymbol: "[274E]"
  };

  /**
   * 表情包unicode编号列表
   * @type {Array}
   */
  emojiLists = [];


  state = {

  };

  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(newProps) {
    if (this.emojiLists.length !== 0) {
      return;
    }

    let {start, end, exclude, rowNum, columnNum, deleteSymbol} = newProps;
    let maxEmojiLenth = rowNum * columnNum - 1;
    let tempIndex = 0;
    let tempList;
    for (let i = start; i <= end ; i++) {
      if (!exclude.some((value => value === i))) {
        if (tempIndex === maxEmojiLenth) {
          tempList.push(deleteSymbol);
          this.emojiLists.push(tempList);
          tempIndex = 0;
        }
        if (tempIndex === 0) {
          tempList = [];
        }
        tempList.push('[' + i.toString(16) + ']');
        tempIndex++;
      }
    }
  }

  render() {

    let {onEmojiClick} = this.props;
    return (
      <Swiper
        className='emoji-swiper-container'
        indicatorActiveColor='#919191'
        circular
        indicatorDots
      >
        {
          this.emojiLists.map((value, index) => (
            <SwiperItem key={index}>
              <EmojiGrid onClick={onEmojiClick} list={value}  />
            </SwiperItem>
          ))
        }
      </Swiper>
    )
  }
}

EmojiSwiper.propTypes = {
  /**
   * 表情包点击事件
   */
  onEmojiClick: PropTypes.func,
  /**
   * 表情包开始unicode编号
   */
  start: PropTypes.number,
  /**
   * 表情包结束unicode编号
   */
  end: PropTypes.number,
  /**
   * 排除的表情包编号列表
   */
  exclude: PropTypes.arrayOf(PropTypes.number),
  /**
   * 显示的列数
   */
  columnNum: PropTypes.number,
  /**
   * 显示的行数
   */
  rowNum: PropTypes.number,
  /**
   * 带有删除含义的unicode编号
   */
  deleteSymbol: PropTypes.string

};

