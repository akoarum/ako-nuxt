import { shallowMount } from '@vue/test-utils'
import VCheckbox from '~/components/atoms/VCheckbox.vue'

describe('VCheckbox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VCheckbox, {
      propsData: {
        value: 'test'
      }
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
