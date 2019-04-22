import { shallowMount } from '@vue/test-utils'
import TextIcon from '~/components/atoms/TextIcon'

describe('TextIcon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TextIcon, {
      propsData: {}
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
      expect(TextIcon.computed.styledClass.call({ primary: true })).toBe('-primary')
      expect(TextIcon.computed.styledClass.call({ secondary: true })).toBe('-secondary')
      expect(TextIcon.computed.styledClass.call({ caution: true })).toBe('-caution')
      expect(TextIcon.computed.styledClass.call({})).toBe('')
    })
  })
})
