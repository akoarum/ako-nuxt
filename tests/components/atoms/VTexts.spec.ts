import { shallowMount } from '@vue/test-utils'
import VTexts from '~/components/atoms/VTexts.vue'

describe('VTexts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VTexts, {
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
    it('styledClasses: propsからクラス配列を生成して返す', () => {
      wrapper.setProps({ caution: true })
      expect(wrapper.vm.styledClasses).toEqual(['-caution'])
      wrapper.setProps({ caution: true, small: true })
      expect(wrapper.vm.styledClasses).toEqual(['-small', '-caution'])
      wrapper.setProps({ caution: false, small: false })
      expect(wrapper.vm.styledClasses).toEqual([])
    })
  })
})
