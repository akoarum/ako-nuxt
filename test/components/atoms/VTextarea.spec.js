import { shallowMount } from '@vue/test-utils'
import VTextarea from '~/components/atoms/VTextarea'

const wrapperFactory = (propsData = {}) => shallowMount(VTextarea, {
  propsData: {
    name: 'test',
    value: '',
    ...propsData
  }
})

describe('VTextarea', () => {
  it('[computed] appearanceClasses: props を元に class 配列を返す', () => {
    expect(VTextarea.computed.appearanceClasses.call({ error: false })).toEqual([])
    expect(VTextarea.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
  })

  it('[methods] focusHandler: isFocused = true にして focus を emit する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.focusHandler()
    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.emitted().focus).toBeTruthy()
  })

  it('[methods] blurHandler: isBlurred = true にして blur を emit する。isInput が true なら isDirtied を更新して dirty を emit する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.blurHandler()
    expect(wrapper.vm.isBlurred).toBe(true)
    expect(wrapper.emitted().blur).toBeTruthy()

    wrapper.setData({ isInput: true })
    wrapper.vm.blurHandler()
    expect(wrapper.vm.isDirtied).toBe(true)
    expect(wrapper.emitted().dirty).toBeTruthy()
  })

  it('[methods] inputHandler: isInput = true にして input を emit する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.inputHandler({ target: { value: 'test' }})
    expect(wrapper.vm.isInput).toBe(true)
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
