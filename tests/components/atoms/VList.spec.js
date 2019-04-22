import { shallowMount } from '@vue/test-utils'
import VList from '~/components/atoms/VList'

describe('VList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VList, {
      propsData: {
        items: [
          { id: 1, display: 'テスト' },
          { id: 2, display: 'テスト2' }
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
    it('styledClass: propsを元にクラスを生成して返す', () => {
      expect(VList.computed.styledClass.call({ ordered: true })).toBe('-ordered')
      expect(VList.computed.styledClass.call({})).toBe('')
    })
  })
})
