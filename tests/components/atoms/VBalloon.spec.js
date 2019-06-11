import { shallowMount } from '@vue/test-utils'
import VBalloon from '~/components/atoms/VBalloon'

describe('VBalloon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VBalloon, {
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
