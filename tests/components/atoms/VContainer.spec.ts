import { shallowMount } from '@vue/test-utils'
import VContainer from '~/components/atoms/VContainer.vue'

describe('VContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VContainer, {
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
    it('styled: propsからスタイルを返す', () => {
      wrapper.setProps({ maxWidth: '1500px' })
      expect(wrapper.vm.styled).toEqual({ '--maxWidth': '1500px' })
    })
  })
})
