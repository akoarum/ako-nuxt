import { shallowMount } from '@vue/test-utils'
import VModal from '~/components/molecules/VModal'

describe('VModal', () => {
  let wrapper

  const wrapperFactory = (mocks = {}) => shallowMount(VModal, {
    propsData: {
      isVisible: false
    },
    mocks
  })

  beforeEach(() => {
    wrapper = wrapperFactory()
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
    describe('contentStyle', () => {
      it('コンテンツの高さがブラウザの高さを超えていなければ空オブジェクトを返す', () => {
        global.window.innerHeight = 1000
        wrapper.setData({ contentHeight: 500 })
        expect(wrapper.vm.contentStyle).toEqual({})
      })
    })
  })

  describe('methods', () => {
    it('handleClose: closeをemit', () => {
      wrapper.vm.handleClose()
      expect(wrapper.emitted().close).toBeTruthy()
    })

    describe('updateContentSize: モーダルコンテンツのサイズを取得する', () => {
      it('コンテンツ本体のDOMが取得できない場合は何も実行しない', () => {
        const $refs = { modalBody: null }
        const _wrapper = wrapperFactory({ $refs })
        _wrapper.setData({ contentWidth: 0, contentHeight: 0 })
        _wrapper.vm.updateContentSize()
        expect(_wrapper.vm.contentWidth).toBe(0)
        expect(_wrapper.vm.contentHeight).toBe(0)
      })
    })

    it('resetContentSize: 記録したサイズをリセットする', () => {
      wrapper.setData({ contentWidth: 768, contentHeight: 800, btnPositionY: -40 })
      wrapper.vm.resetContentSize()
      expect(wrapper.vm.contentWidth).toBe(0)
      expect(wrapper.vm.contentHeight).toBe(0)
      expect(wrapper.vm.btnPositionY).toBe(0)
    })
  })
})
