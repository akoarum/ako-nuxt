import { shallowMount } from '@vue/test-utils'
import VCaret from '~/components/icons/VCaret.vue'

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
})
