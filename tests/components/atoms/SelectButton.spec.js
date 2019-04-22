import { shallowMount } from '@vue/test-utils'
import SelectButton from '~/components/atoms/SelectButton'

describe('SelectButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SelectButton, {
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
