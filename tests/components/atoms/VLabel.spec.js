import { shallowMount } from '@vue/test-utils'
import VLabel from '~/components/atoms/VLabel'

describe('VLabel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VLabel, {
      propsData: {},
      slots: {
        default: 'ラベル'
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
