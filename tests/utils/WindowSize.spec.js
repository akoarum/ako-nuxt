import WindowSize from '~/utils/WindowSize'

describe('WindowSize', () => {
  const spyAddListener = jest.spyOn(window, 'addEventListener')
  const spyRemoveListener = jest.spyOn(window, 'removeEventListener')
  let windowSize

  beforeEach(() => {
    jest.useFakeTimers()
    windowSize = new WindowSize()
  })

  afterEach(() => {
    spyAddListener.mockClear()
    spyRemoveListener.mockClear()
  })

  describe('initialize', () => {
    let mockUpdate

    beforeEach(() => {
      mockUpdate = jest.fn()
      windowSize._updateState = mockUpdate
      windowSize.initialize()
    })

    it('updateStateメソッドを呼び出す', () => {
      expect(mockUpdate).toHaveBeenCalledTimes(1)
    })

    it('resizeイベントをwindowに対してセットする', () => {
      expect(spyAddListener).toHaveBeenCalledWith('resize', windowSize._handler)
    })

    it('複数回呼び出すことはできない', () => {
      windowSize.initialize()
      expect(mockUpdate).toHaveBeenCalledTimes(1)
    })
  })

  it('_handleResize: 実行を間引きつつupdateStateメソッドを呼び出す', () => {
    const mockUpdate = jest.fn()

    windowSize._updateState = mockUpdate
    windowSize._handleResize()

    expect(clearTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockUpdate).toHaveBeenCalled()
  })

  describe('destroy', () => {
    beforeEach(() => {
      windowSize.initialize()
      windowSize.destroy()
    })

    it('初期化してない場合は何もしない', () => {
      windowSize.destroy()
      expect(spyRemoveListener).toHaveBeenCalledTimes(1)
    })

    it('windowのresizeイベントを解除する', () => {
      expect(spyRemoveListener).toHaveBeenCalledWith('resize', windowSize._handler)
    })
  })
})
