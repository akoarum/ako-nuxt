import { shallowMount } from '@vue/test-utils'
import VButton from '~/components/atoms/VButton'

describe('VButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VButton, {
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
    it('styledClass: propsからクラスを生成して返す', () => {
      expect(VButton.computed.styledClass.call({ secondary: true })).toBe('-secondary')
      expect(VButton.computed.styledClass.call({ caution: true })).toBe('-caution')
    })
  })
})
