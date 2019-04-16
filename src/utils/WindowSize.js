export default class WindowSize {
  constructor(delay = 80) {
    this._width = 0
    this._height = 0
    this._delay = delay
    this._cullTime = null
    this._initialized = false
    this._handler = this._handleResize.bind(this)
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get initialized() {
    return this._initialized
  }

  /**
   * 初期化メソッド
   */
  initialize() {
    if (this._initialized) return this
    this._updateState()
    window.addEventListener('resize', this._handler)
    this._initialized = true
    return this
  }

  /**
   * ステートの更新
   */
  _updateState() {
    this._width = window.innerWidth
    this._height = window.innerHeight
  }

  /**
   * リサイズハンドラ
   */
  _handleResize() {
    clearTimeout(this._cullTime)
    this._cullTime = setTimeout(() => {
      this._updateState()
    }, this._delay)
  }

  /**
   * 解放する
   */
  destroy() {
    if (!this._initialized) return this
    window.removeEventListener('resize', this._handler)
    this._initialized = false
    return this
  }
}
