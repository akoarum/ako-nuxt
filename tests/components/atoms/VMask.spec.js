import { shallowMount } from '@vue/test-utils'
import VMask from '~/components/atoms/VMask'

describe('VMask', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VMask, {
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
    it('styledClass: propsから生成したクラスを返す', () => {
      expect(wrapper.vm.styledClass).toBe('')
      wrapper.setProps({ transparent: true })
      expect(wrapper.vm.styledClass).toBe('-transparent')
    })
  })
})
