import { shallowMount } from '@vue/test-utils'
import VRadio from '~/components/atoms/VRadio'

describe('VRadio', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VRadio, {
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
