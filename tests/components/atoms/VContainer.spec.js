import { shallowMount } from '@vue/test-utils'
import VContainer from '~/components/atoms/VContainer'

describe('VContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VContainer, {
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
    it('styled: maxWidthの指定があればスタイルを返す', () => {
      expect(VContainer.computed.styled.call({ maxWidth: '' })).toEqual({})
      expect(VContainer.computed.styled.call({ maxWidth: '1024px' })).toEqual({ '--maxWidth': '1024px' })
    })
  })
})
