import { shallowMount } from '@vue/test-utils'
import ModalContainer from '~/components/molecules/ModalContainer'

describe('ModalContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ModalContainer, {
      propsData: {
        isVisible: false
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
    it('windowWidth: windowSizeが持つwidthを返す', () => {
      expect(ModalContainer.computed.windowWidth.call({ windowSize: { width: 600 } })).toBe(600)
    })

    it('windowHeight: windowSizeが持つheightを返す', () => {
      expect(ModalContainer.computed.windowHeight.call({ windowSize: { height: 600 } })).toBe(600)
    })

    describe('contentStyled', () => {
      it('コンテンツの高さがウィンドウの高さを超えなければ空オブジェクトを返す', () => {
        const calledObject = {
          originalHeight: 500,
          closePosition: 40,
          windowHeight: 760
        }
        expect(ModalContainer.computed.contentStyled.call(calledObject)).toEqual({})
      })

      it('コンテンツの高さがウィンドウの高さを超えていたらスタイルを指定する', () => {
        const calledObject = {
          originalHeight: 500,
          closePosition: 40,
          windowHeight: 400
        }
        expect(ModalContainer.computed.contentStyled.call(calledObject)).toEqual({
          '--height': '480px',
          overflowY: 'scroll'
        })
      })
    })
  })

  describe('methods', () => {
    it('handleClose: closeをemit', () => {
      wrapper.vm.handleClose()
      expect(wrapper.emitted().close).toBeTruthy()
    })

    describe('handleEscKey', () => {
      const mockPrevent = jest.fn()
      const event = {
        keyCode: 27,
        preventDefault: mockPrevent
      }

      it('keyCodeが27の場合はcloseをemit', () => {
        wrapper.vm.handleEscKey(event)
        expect(wrapper.emitted().close).toBeTruthy()
      })

      it('keyCodeが27以外なら何もしない', () => {
        event.keyCode = 13
        wrapper.vm.handleEscKey(event)
        expect(wrapper.emitted().close).toBeFalsy()
      })
    })
  })
})
