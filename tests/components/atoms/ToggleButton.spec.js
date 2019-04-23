import { shallowMount } from '@vue/test-utils'
import ToggleButton from '~/components/atoms/ToggleButton'

describe('ToggleButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ToggleButton, {
      propsData: {
        checkedValue: [],
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
