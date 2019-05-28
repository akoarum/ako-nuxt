import { shallowMount } from '@vue/test-utils'
import VTextarea from '~/components/atoms/VTextarea'

describe('VTextarea', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VTextarea, {
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
