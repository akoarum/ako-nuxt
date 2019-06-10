export default class WindowSize {
  private windowWidth: number = 0
  private windowHeight: number = 0
  private delay: number = 0
  private initialized: boolean = false
  private cullTime?: number
  private handler

  constructor(delay: number = 80) {
    this.delay = delay
    this.handler = this.handleResize.bind(this)
  }

  get width(): number {
    return this.windowWidth
  }

  get height(): number {
    return this.windowHeight
  }

  private handleResize() {
    window.clearTimeout(this.cullTime)
    this.cullTime = window.setTimeout(() => {
      this.updateSize()
    }, this.delay)
  }

  init(): WindowSize {
    if (typeof window === 'undefined') return this
    if (this.initialized) return this

    this.updateSize()
    window.addEventListener('resize', this.handler)
    this.initialized = true

    return this
  }

  updateSize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
  }

  destroy(): WindowSize {
    if (!this.initialized) return this

    window.removeEventListener('resize', this.handler)
    this.initialized = false

    return this
  }
}
