import { shallowMount } from '@vue/test-utils'
import VCaret from '~/components/icons/VCaret'

describe('VCaret', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VCaret, {
      propsData: {}
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
    it('styled: propsからwidth, heightを設定する', () => {
      expect(VCaret.computed.styled.call({ width: 10, height: 8 })).toEqual({
        '--width': '10px',
        '--height': '8px'
      })

      expect(VCaret.computed.styled.call({ width: 6 })).toEqual({
        '--width': '6px'
      })
    })
  })
})
