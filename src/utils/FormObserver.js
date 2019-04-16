export default class FormValidator {
  constructor(names = []) {
    this._items = this._createItems(names)
  }

  /**
   * @return {Boolean}
   */
  get btnDisabled() {
    for (const name in this._items) {
      if (this._items[name].error || !this._items[name].dirty) return true
    }
    return false
  }

  /**
   * itemオブジェクトの生成
   * @param {Array} names name配列
   */
  _createItems(names) {
    const items = {}

    names.forEach(item => {
      items[item] = {
        error: false,
        dirty: false
      }
    })

    return items
  }

  /**
   * itemの更新
   * @param {String}  name  name値
   * @param {String}  prop  更新するプロパティ名
   * @param {Boolean} value 値
   */
  updateItem(name, prop, value) {
    this._items[name][prop] = value
  }
}
