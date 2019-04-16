import { shallowMount } from '@vue/test-utils'
import VLink from '~/components/atoms/VLink'

describe('VLink', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VLink, {
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
