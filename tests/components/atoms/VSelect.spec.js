import { shallowMount } from '@vue/test-utils'
import VSelect from '~/components/atoms/VSelect'

describe('VSelect', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VSelect, {
      propsData: {
        value: '',
        options: [
          { id: 1, label: 'テスト' },
          { id: 2, label: 'テスト2' }
        ]
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
