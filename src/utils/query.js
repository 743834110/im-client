/**
 * 基本类sql信息处理类
 */
export default class SQL {

  _ids = [];

  _target = {};

  select(ids) {
    this._ids = ids;
    return this;
  }

  from(target) {
    this._target = target;
    return this;
  }

  where() {

    return this;
  }

  orderBy() {
    return this;
  }

  exec() {
    return this._ids.map(value => this._target[value]);
  }


}
