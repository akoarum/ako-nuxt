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
})
