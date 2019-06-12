import { shallowMount } from '@vue/test-utils'
import VHeading from '~/components/atoms/VHeading.vue'

describe('VHeading', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VHeading, {
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
    it('styledClass: visualからクラス名を生成する', () => {
      wrapper.setProps({ visual: 3 })
      expect(wrapper.vm.styledClass).toBe('-lv3')
    })
  })
})
