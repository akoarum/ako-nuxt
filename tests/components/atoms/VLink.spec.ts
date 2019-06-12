import { shallowMount } from '@vue/test-utils'
import VLink from '~/components/atoms/VLink.vue'

describe('VLink', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VLink, {
      propsData: {},
      slots: {
        default: 'テスト'
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
