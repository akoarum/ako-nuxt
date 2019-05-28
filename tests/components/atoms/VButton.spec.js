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
    it('styledClasses: propsからクラス配列を生成して返す', () => {
      wrapper.setProps({ secondary: true, small: true })
      expect(wrapper.vm.styledClasses).toEqual(['-secondary', '-small'])
    })
  })
})
