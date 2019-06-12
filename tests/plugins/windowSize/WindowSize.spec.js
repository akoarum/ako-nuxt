import WindowSize from '~/plugins/windowSize/WindowSize'

describe('WindowSize', () => {
  let windowSize
  const spyAddEventListener = jest.spyOn(window, 'addEventListener')
  const spyRemoveEventListener = jest.spyOn(window, 'removeEventListener')

  beforeEach(() => {
    jest.useFakeTimers()
    windowSize = new WindowSize()
  })

  afterEach(() => {
    spyAddEventListener.mockClear()
    spyRemoveEventListener.mockClear()
  })

  it('get width: windowWidthを返す', () => {
    windowSize.windowWidth = 1200
    expect(windowSize.width).toBe(1200)
  })

  it('get height: windowHeightを返す', () => {
    windowSize.windowHeight = 1000
    expect(windowSize.height).toBe(1000)
  })

  describe('handleResize: updateResizeを実行する', () => {
    it('実行する', () => {
      windowSize.updateSize = jest.fn()
      windowSize.handleResize()
      jest.runAllTimers()
      expect(windowSize.updateSize).toHaveBeenCalled()
    })
  })

  describe('init: updateSizeを呼び出してresizeをイベントリスナに登録する', () => {
    it('通常', () => {
      windowSize.updateSize = jest.fn()
      windowSize.init()
      expect(windowSize.updateSize).toHaveBeenCalled()
      expect(spyAddEventListener).toHaveBeenCalledTimes(1)
      expect(spyAddEventListener).toHaveBeenCalled()
    })

    it('二度以上は実行しない（initialized=true）', () => {
      windowSize.updateSize = jest.fn()
      windowSize.init()
      windowSize.init()
      expect(spyAddEventListener).toHaveBeenCalledTimes(1)
    })
  })

  it('updateSize: windowWidthとwindowHeightを更新する', () => {
    global.window.innerWidth = 1200
    global.window.innerHeight = 800
    windowSize.updateSize()
    expect(windowSize['windowWidth']).toBe(1200)
    expect(windowSize['windowHeight']).toBe(800)
  })

  describe('destroy: resizeのイベントリスナを削除してinitializedをfalseにする', () => {
    beforeEach(() => {
      windowSize.init()
    })

    it('通常時', () => {
      windowSize.destroy()
      expect(spyRemoveEventListener).toHaveBeenCalled()
      expect(windowSize.initialized).toBe(false)
    })

    it('すでにdestroy済みの場合（initialized = false）は何度も叩くことはできない', () => {
      windowSize.initialized = false
      windowSize.destroy()
      expect(spyRemoveEventListener).not.toHaveBeenCalled()
    })
  })
})
