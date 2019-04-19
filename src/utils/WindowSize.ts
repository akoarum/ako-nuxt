export default class WindowSize {
  private _width: number = 0
  private _height: number = 0
  private delay: number = 80
  private cullTime = null
  private _initialized: boolean = false
  private handler = this.handleResize.bind(this)

  constructor(delay: number = 80) {
    this.delay = delay
  }

  public get width() {
    return this._width
  }

  public get height() {
    return this._height
  }

  public get initialized() {
    return this._initialized
  }

  /**
   * 初期化メソッド
   */
  public initialize() {
    if (this._initialized) return this
    this.updateState()
    window.addEventListener('resize', this.handler)
    this._initialized = true
    return this
  }

  /**
   * ステートの更新
   */
  public updateState() {
    this._width = window.innerWidth
    this._height = window.innerHeight
  }

  /**
   * リサイズハンドラ
   */
  private handleResize() {
    clearTimeout(this.cullTime)
    this.cullTime = setTimeout(() => {
      this.updateState()
    }, this.delay)
  }

  /**
   * 解放する
   */
  public destroy() {
    if (!this._initialized) return this
    window.removeEventListener('resize', this.handler)
    this._initialized = false
    return this
  }
}
