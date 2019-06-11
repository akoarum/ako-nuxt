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
    describe('innerStyle', () => {
      it('コンテンツの高さがブラウザの高さを超えている場合は位置を調整したスタイルを返す', () => {
        const context = {
          contentHeight: 800,
          windowHeight: 600,
          btnPositionY: -40,
          margin: 20
        }
        expect(VModal.extendOptions.computed.innerStyle.call(context)).toEqual({
          top: '60px',
          transform: 'translate(-50%, 0)'
        })
      })

      it('コンテンツの高さが収まる場合は空オブジェクトを返す', () => {
        const context = {
          contentHeight: 500,
          windowHeight: 700,
          btnPositionY: -40,
          margin: 20
        }
        expect(VModal.extendOptions.computed.innerStyle.call(context)).toEqual({})
      })
    })

    describe('contentStyle', () => {
      it('コンテンツの高さがブラウザの高さを超えていなければ空オブジェクトを返す', () => {
        const context = {
          windowHeight: 1000,
          contentHeight: 500
        }
        expect(VModal.extendOptions.computed.contentStyle.call(context)).toEqual({})
      })

      it('コンテンツの高さがブラウザの高さを超えている場合は収まるように調整したスタイルを返す', () => {
        const context = {
          windowHeight: 500,
          contentHeight: 700,
          btnPositionY: -40,
          margin: 20
        }
        expect(VModal.extendOptions.computed.contentStyle.call(context)).toEqual({
          overflowY: 'scroll',
          height: '420px',
          top: '0'
        })
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
