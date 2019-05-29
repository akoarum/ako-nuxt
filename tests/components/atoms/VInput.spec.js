import { shallowMount } from '@vue/test-utils'
import VInput from '~/components/atoms/VInput'

describe('VInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VInput, {
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
