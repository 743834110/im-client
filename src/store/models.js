/**
 * 标签页切换的state
 * @type {{state: {currentTabIndex: number}, reducers: {switchTab({currentTabIndex: *}, *): void}}}
 * 在redux中，原本的state的类型应该和输出的类型想匹配
 */
export const tabPage = {
  state: {
    currentTabIndex: 0
  },
  reducers: {
    switchTab(state, action) {
      console.log(state.currentTabIndex)
      return {
        currentTabIndex: action
      }
    }
  }
};









