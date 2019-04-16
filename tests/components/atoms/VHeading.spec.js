import { shallowMount } from '@vue/test-utils'
import VHeading from '~/components/atoms/VHeading'

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
})
