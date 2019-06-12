import { shallowMount } from '@vue/test-utils'
import VUlist from '~/components/atoms/VUlist.vue'

describe('VUlist', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VUlist, {
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
      expect(wrapper.vm.styledClass).toBe('')
      wrapper.setProps({ ordered: true })
      expect(wrapper.vm.styledClass).toBe('-ordered')
    })
  })
})
