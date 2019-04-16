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
