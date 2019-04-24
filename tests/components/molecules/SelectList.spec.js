import { mount } from '@vue/test-utils'
import SelectList from '~/components/molecules/SelectList'

describe('SelectList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SelectList, {
      propsData: {
        name: 'test',
        selects: [
          { id: 1, value: '1', label: '項目1' },
          { id: 2, value: '2', label: '項目2' }
        ],
        value: []
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
