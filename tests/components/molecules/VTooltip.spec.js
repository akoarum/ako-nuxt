import { shallowMount } from '@vue/test-utils'
import VTooltip from '~/components/molecules/VTooltip'

describe('VTooltip', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VTooltip, {
      propsData: {
        label: '？'
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
    it('componentId: 一意のIDであるuidを返す', () => {
      expect(VTooltip.computed.componentId.call({ _uid: 100 })).toBe(100)
    })

    it('contentStyled: バルーン用のスタイルを返す', () => {
      const calledObject = {
        leftPositionStyled: {
          left: '-50px'
        },
        verticalPositionStyled: {
          top: '-50px'
        }
      }
      expect(VTooltip.computed.contentStyled.call(calledObject)).toEqual({
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
      expect(VTooltip.computed.basePosition.call(calledObject)).toEqual({
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
        expect(VTooltip.computed.leftPositionStyled.call(calledObject)).toEqual({
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
        expect(VTooltip.computed.leftPositionStyled.call(calledObject)).toEqual({
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
        expect(VTooltip.computed.leftPositionStyled.call(calledObject)).toEqual({
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
        expect(VTooltip.computed.verticalPositionStyled.call(calledObject)).toEqual({
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
        expect(VTooltip.computed.verticalPositionStyled.call(calledObject)).toEqual({
          top: 'calc(100% + 14px)'
        })
      })
    })
  })

  describe('methods', () => {
    describe('updateVisible', () => {
      it('引数をisVisibleに反映する', () => {
        wrapper.vm.updateVisible(true)
        expect(wrapper.vm.isVisible).toBe(true)

        wrapper.vm.updateVisible(false)
        expect(wrapper.vm.isVisible).toBe(false)
      })
    })
  })
})
