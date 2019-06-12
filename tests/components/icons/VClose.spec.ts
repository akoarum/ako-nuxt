import { shallowMount } from '@vue/test-utils'
import VClose from '~/components/icons/VClose.vue'

describe('VClose', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VClose, {
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
})
