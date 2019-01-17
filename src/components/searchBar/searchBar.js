import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtSearchBar, AtForm} from "taro-ui";
import PropTypes from "prop-types";

/**
 * 搜索栏组件
 * @author litianfeng
 * Created on 2018/12/23
 */
export default class SearchBar extends Component {

  static defaultProps = {
    navigateBackPath: '',
    onKeywordSearch: () => {}
  };

  state = {
    value: ''
  };

  constructor(props) {
    super(props);

  }

  /**
   * 根据navigateBackPath
   * 返回指定的上一页
   *
   */
  handleActionClick = () => {
    let {navigateBackPath} = this.props;
    if (typeof navigateBackPath === "undefined" || navigateBackPath === '') {
      Taro.navigateBack({
        delta: 1
      })
    }
    else {
      Taro.redirectTo({
        url: navigateBackPath
      })
    }
  };

  /**
   * 搜索栏输入事件
   */
  handleOnChange = (value) => {
    this.setState({
      value: value
    })
  };

  /**
   * 搜索提交事件
   */
  handleOnConfirm = () => {
    let {onKeywordSearch} = this.props;
    let {value} = this.state;

    onKeywordSearch(value);
  };

  render() {
    let {value} = this.state;
    return (
      <View>
        <AtForm
          onSubmit={this.handleOnConfirm}
        >
          <AtSearchBar
            actionName='取消'
            value={value}
            onChange={this.handleOnChange}
            onActionClick={this.handleActionClick}
          />
        </AtForm>

      </View>
    );
  }
}

SearchBar.propTypes = {
  /**
   * 点击按钮应返回的页面
   */
  navigateBackPath: PropTypes.string,
  /**
   * 关键词搜索事件
   */
  onKeywordSearch: PropTypes.func
};
