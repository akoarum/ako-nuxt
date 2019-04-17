import { shallowMount } from '@vue/test-utils'
import VMask from '~/components/atoms/VMask'

describe('VMask', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VMask, {
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
    it('styledClass: propsからclass配列を返す', () => {
      expect(VMask.computed.styledClass.call({ transparent: true })).toEqual(['-transparent'])
      expect(VMask.computed.styledClass.call({ transparent: false })).toEqual([])
    })
  })
})
