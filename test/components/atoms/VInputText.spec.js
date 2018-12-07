import { shallowMount } from '@vue/test-utils'
import VInputText from '~/components/atoms/VInputText'

const wrapperFactory = (propsData = {}) => shallowMount(VInputText, {
  propsData: {
    type: 'text',
    name: 'test',
    value: '',
    ...propsData
  }
})

describe('VInputText', () => {
  let wrapper

  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it('[computed] appearanceClasses: props を元に class 配列を返す', () => {
    expect(VInputText.computed.appearanceClasses.call({ error: false })).toEqual([])
    expect(VInputText.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
  })

  it('[methods] focusHandler: focus を emit して isFocused を true にする', () => {
    wrapper.vm.focusHandler()
    expect(wrapper.emitted().focus).toBeTruthy()
    expect(wrapper.vm.isFocused).toBe(true)
  })

  it('[methods] blurHandler: blur を emit して isBlurred を true に、isInput で isDirtied でなければ dirty を emit して isDirtied を true にする', () => {
    wrapper.setData({ isInput: true })
    wrapper.vm.blurHandler()
    expect(wrapper.emitted().blur).toBeTruthy()
    expect(wrapper.emitted().dirty).toBeTruthy()
    expect(wrapper.vm.isBlurred).toBe(true)
    expect(wrapper.vm.isDirtied).toBe(true)
  })

  it('[methods] blurHandler: isInput ではない、もしくは isDirtied の場合は何もしない', () => {
    wrapper.vm.blurHandler()
    expect(wrapper.emitted().dirty).toBeFalsy()

    wrapper.setData({ isDirtied: true })
    wrapper.vm.blurHandler()
    expect(wrapper.emitted().dirty).toBeFalsy()
  })

  it('[methods] inputHandler: input を emit して isInput を true にする', () => {
    wrapper.vm.inputHandler({ target: { value: 'aaa' }})
    expect(wrapper.emitted().input[0][0]).toBe('aaa')
    expect(wrapper.vm.isInput).toBe(true)
  })
})
