import { shallowMount } from '@vue/test-utils'
import VBox from '~/components/molecules/VBox'

describe('VBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VBox, {
      propsData: {
        title: 'テスト'
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
