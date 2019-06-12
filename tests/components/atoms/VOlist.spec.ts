import { shallowMount } from '@vue/test-utils'
import VOlist from '~/components/atoms/VOlist.vue'

describe('VOlist', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VOlist, {
      propsData: {
        items: [
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

  describe('computed', () => {
    it('styledClass: propsからクラスを生成して返す', () => {
      expect(wrapper.vm.styledClass).toBe('-ordered')
      wrapper.setProps({ ordered: false })
      expect(wrapper.vm.styledClass).toBe('')
    })
  })
})
