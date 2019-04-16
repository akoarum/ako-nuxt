import { shallowMount } from '@vue/test-utils'
import VTexts from '~/components/atoms/VTexts'

describe('VTexts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VTexts, {
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
    it('styledClasses: propsからクラス配列を生成して返す', () => {
      expect(VTexts.computed.styledClasses.call({ caution: true, small: true })).toEqual(['-caution', '-small'])
      expect(VTexts.computed.styledClasses.call({ caution: true, small: false })).toEqual(['-caution'])
      expect(VTexts.computed.styledClasses.call({ caution: false, small: false })).toEqual([])
    })
  })
})
