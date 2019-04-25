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
    showModal: false,
    onKeywordSearch: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    value: '',
    actionName: '取消',
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
    let {showModal} = this.props;
    let {value} = this.state;
    if (showModal) {
      Taro.showModal({
        title: '提示',
        content: '操作不可逆，是否确认取消？',
      })
        .then(res => {
          if (res.cancel) {
            return;
          }
          this.navigateBack();
        })
    }
    else if (value) {
      this.handleOnConfirm();
    }
    else {
      this.navigateBack();
    }


  };

  navigateBack = () => {
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
  }



  /**
   * 搜索栏输入事件
   */
  handleOnChange = (value) => {
    this.setState({
      value: value,
      actionName: value? '搜索': '取消'
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
    let {value, actionName} = this.state;
    let {placeholder, onFocus, onBlur} = this.props;
    return (
      <View>
        <AtForm
          onSubmit={this.handleOnConfirm}
        >
          <AtSearchBar
            actionName={actionName}
            value={value}
            onChange={this.handleOnChange}
            onActionClick={this.handleActionClick}
            placeholder={placeholder}
            onConfirm={this.handleOnConfirm}
            onFocus={onFocus}
            onBlur={onBlur}
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
  onKeywordSearch: PropTypes.func,
  /**
   * 占位符
   */
  placeholder: PropTypes.string,
  /**
   * 动作名称
   */
  actionName: PropTypes.string,
  /**
   * 是否显示取消对话框
   */
  showModal: PropTypes.bool,
  /**
   * 获得焦点事件
   */
  onFocus: PropTypes.func,
  /**
   * 失去焦点事件
   */
  onBlur: PropTypes.func
};
