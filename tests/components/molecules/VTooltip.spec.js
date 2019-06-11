import { shallowMount } from '@vue/test-utils'
import uuid from 'uuid'
import VTooltip from '~/components/molecules/VTooltip'

describe('VTooltip', () => {
  jest.spyOn(uuid, 'v4').mockReturnValue('test')
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VTooltip, {
      propsData: {
        label: '？'
      },
      slots: {
        default: '<p>テスト</p>'
      }
    })
  })

  describe('initialized', () => {
    it('mountable', () => {
      expect(wrapper.isVueInstance()).toBe(true)
    })
    it('snapshot', () => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('computed', () => {
    it('contentStyled: バルーン用のスタイルを返す', () => {
      const calledObject = {
        leftPositionStyled: {
          left: '-50px'
        },
        verticalPositionStyled: {
          top: '-50px'
        }
      }
      expect(VTooltip.extendOptions.computed.contentStyled.call(calledObject)).toEqual({
        left: '-50px',
        top: '-50px'
      })
    })

    it('basePosition: ボタンのトップ、横中央を返す', () => {
      const calledObject = {
        btnRect: {
          width: 30,
          x: 300,
          y: 50
        }
      }
      expect(VTooltip.extendOptions.computed.basePosition.call(calledObject)).toEqual({
        x: 315,
        y: 50
      })
    })

    describe('leftPositionStyled: バルーンのスタイル left を返す', () => {
      it('ボタンに対してセンタリングで表示できればセンタリングにする', () => {
        const calledObject = {
          btnRect: {
            width: 30,
            x: 300
          },
          contentSize: {
            width: 100
          },
          basePosition: {
            x: 315
          }
        }
        expect(VTooltip.extendOptions.computed.leftPositionStyled.call(calledObject)).toEqual({
          left: '50%',
          transform: 'translateX(-50%)'
        })
      })

      it('センタリングだと左に突き抜ける場合はブラウザ内に収まる位置にする', () => {
        const calledObject = {
          btnRect: {
            width: 30,
            x: 10
          },
          contentSize: {
            width: 100
          },
          basePosition: {
            x: 45
          }
        }
        expect(VTooltip.extendOptions.computed.leftPositionStyled.call(calledObject)).toEqual({
          left: '-10px'
        })
      })

      it('センタリングだと右に突き抜ける場合はブラウザ内に収まる位置にする', () => {
        const calledObject = {
          btnRect: {
            width: 30,
            x: 750
          },
          contentSize: {
            width: 100
          },
          basePosition: {
            x: 765
          },
          windowWidth: 780
        }
        expect(VTooltip.extendOptions.computed.leftPositionStyled.call(calledObject)).toEqual({
          left: '-70px'
        })
      })
    })

    describe('verticalPositionStyled: 上下の位置を指定する', () => {
      it('ボタンの上に表示できる場合は上にする', () => {
        const calledObject = {
          contentSize: {
            height: 50
          },
          basePosition: {
            y: 100
          }
        }
        expect(VTooltip.extendOptions.computed.verticalPositionStyled.call(calledObject)).toEqual({
          top: '-64px'
        })
      })

      it('上に収まらない場合は下にする', () => {
        const calledObject = {
          contentSize: {
            height: 50
          },
          basePosition: {
            y: 30
          }
        }
        expect(VTooltip.extendOptions.computed.verticalPositionStyled.call(calledObject)).toEqual({
          top: 'calc(100% + 14px)'
        })
      })
    })
  })

  describe('methods', () => {
    describe('handleEscKey: ESCキーで非表示にする', () => {
      const mockPrevent = jest.fn()

      afterEach(() => {
        mockPrevent.mockClear()
      })

      it('実行', () => {
        wrapper.setData({ isVisible: true })
        wrapper.vm.handleEscKey({ keyCode: 27, preventDefault: mockPrevent })
        expect(wrapper.vm.isVisible).toBe(false)
        expect(mockPrevent).toHaveBeenCalled()
      })

      it('ESCキー以外の場合は何も実行しない', () => {
        wrapper.setData({ isVisible: true })
        wrapper.vm.handleEscKey({ keyCode: 13, preventDefault: mockPrevent })
        expect(wrapper.vm.isVisible).toBe(true)
        expect(mockPrevent).not.toHaveBeenCalled()
      })
    })
  })
})
