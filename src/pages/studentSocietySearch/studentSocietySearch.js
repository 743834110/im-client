import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import { AtLoadMore } from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomTagBar from "../../components/customTagBar/customTagBar";
import CommonList from "../../components/commonList/commonList";
import SQL from "../../utils/query";

const mapStateToProps = (
  {organization: {entities, pagination, mappings: {searchCurrent, agencyCurrent}},
    loading,
    dictionary}) => {
  return {
    org: {
      list: new SQL().select(searchCurrent).from(entities).exec().map(item => ({
        title: item.shortName,
        url: `/pages/orgHome/orgHome?orgId=${item.orgId}`,
        thumb: item.userImageUrl,
        arrow: 'right',
        note: '',
        iconInfo: {
          size: 25,
          color: '#78A4FA',
          value: 'map-pin'
        },
        ext: {
          path: ''
        }
      })),
      pagination,
    },
    agencyOrg: new SQL().select(agencyCurrent).from(entities).exec(),
    dictionary: {
      list: new SQL().select(dictionary.mappings.current).from(dictionary.entities).exec()
    },
    loading: loading.effects.organization.fetch
  };
};
/**
 * @description 学生社团搜索页面
 * Created on 2019/1/1
 */
@connect(mapStateToProps)
export default class StudentSocietySearch extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };


  state = {
    formValue: {}
  };

  componentDidMount() {
    const {dispatch} = this.props;
    // 获取社团类型
    dispatch.dictionary.fetch({
      pager: {
        param: {
          codeItemId: 'ASSOCIATE' // 社团类型
        },
        limit: 99
      }
    });

    // 查询校级和院级学校机构
    dispatch.organization.fetch({
      pager: {
        param: {
          orgType: 'SCHOOL_AGENCY'
        },
        limit: 99
      },
      currentType: 'agencyCurrent'
    });

    // 查询社团
    dispatch.organization.fetch({
      pager: {
        param: {
          orgType: 'STUDENT_CLUB'
        },
      },
      currentType: 'searchCurrent'
    })
  }


  /**
   * 处理标签栏点击事件
   * 搜索标签与其他的处理标签有所不同：
   * 弹出便于用户输入的搜索框
   * 而其他的则弹出类选择器
   * @param value
   * @param event
   */
  handleTagClick = (value, index, event) => {
    console.log(value + ":" + index + event)

    if (value.tagName === '搜索') {

    }
    else {

    }
  };

  /**
   * 过滤选择事件
   * @param value
   */
  handlePickerChange = (value) => {
    const {agencyOrg, dictionary, dispatch} = this.props;
    const {formValue} = this.state;
    if (value.index === 0) {
      formValue.associateType = dictionary.list[value.value]? dictionary.list[value.value].codeId: null;
    } else if (value.index === 1) {
      formValue.parentId = agencyOrg[value.value]? agencyOrg[value.value].orgId: null;
    }

    // state
    this.setState({
      formValue
    });

    // 根据选到的值进行过滤选择查询社团
    dispatch.organization.fetch({
      pager: {
        param: {
          orgType: 'STUDENT_CLUB',
          ...formValue
        },
      },
      currentType: 'searchCurrent'
    })

  };

  /**
   * 关键词搜索
   * @param value
   */
  handleSearchClick = (value) => {
    const {formValue} = this.state;
    const {dispatch} = this.props;
    formValue.orgName = value;

    // state
    this.setState({
      formValue
    });

    // 查询社团
    dispatch.organization.fetch({
      pager: {
        param: {
          orgType: 'STUDENT_CLUB',
          ...formValue
        },
      },
      currentType: 'searchCurrent'
    })
  };

  /**
   * 搜索列表点击事件
   * @param value
   */
  handleListClick = (value) => {
    Taro.navigateTo({
      url: value.url
    })
  };

  /**
   * 渲染tagList，建议往上提
   * @param agencyOrg
   * @param dictionary
   * @return {*[]}
   */
  renderTagList = (agencyOrg, dictionary) => {
    return [
      {
        tagName: '类别',

        iconType: 'chevron-down',
        selector: [
          ...dictionary.list.map(item => item.codeName),
          "不限"
        ]

      },
      {
        tagName: '所属',
        iconType: 'chevron-down',
        selector: [
          ...agencyOrg.map(item => item.shortName),
          "不限"
        ]
      }
    ]
  };

  render() {
    const {org, agencyOrg, dictionary, loading} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title={'学生社团'} />
          <CustomTagBar tagList={this.renderTagList(agencyOrg, dictionary)}  onPickerChange={this.handlePickerChange} onSearchClick={this.handleSearchClick} />
        </View>
        <ScrollView
          className='flex-1 margin-top-24'
          scrollY
          style={{
            height: '10px'
          }}
        >
          {
            org.list.length === 0?
              <AtLoadMore status='noMore' />: <CommonList onClick={this.handleListClick} data={org.list} loading={loading} />
          }
        </ScrollView>
      </View>
    );
  }
}
