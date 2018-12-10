import { shallowMount } from '@vue/test-utils'
import VSelect from '~/components/atoms/VSelect'

const options = [
  { id: 1, value: '1', display: 'test1' },
  { id: 2, value: '2', display: 'test2' },
  { id: 3, value: '3', display: 'test3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(VSelect, {
  propsData: {
    name: 'test',
    value: '',
    options,
    ...propsData
  }
})

describe('VSelect', () => {
  it('[computed] displayValue: options から value と合致する値を持つオブジェクトの display を取り出す', () => {
    expect(VSelect.computed.displayValue.call({ options, value: '2' })).toBe('test2')
  })

  it('[computed] displayValue: value が空の場合は placeholder を返す', () => {
    const placeholder = '選択してください'
    expect(VSelect.computed.displayValue.call({ options, placeholder, value: '' })).toBe(placeholder)
  })

  it('[computed] appearanceClasses: props を元に class 配列を返す', () => {
    expect(VSelect.computed.appearanceClasses.call({ error: false })).toEqual([])
    expect(VSelect.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
  })

  it('[watch] isOpened: isOpened が true の時は open、 false の時は close を emit する', () => {
    const wrapper = wrapperFactory()
    wrapper.setData({ isOpened: true })
    expect(wrapper.emitted().open).toBeTruthy()

    wrapper.setData({ isOpened: false })
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('[methods] openOption: isOpened を true にする', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.openOption()
    expect(wrapper.vm.isOpened).toBe(true)
  })

  it('[methods] closeOption: isOpened を false にする', () => {
    const wrapper = wrapperFactory()
    wrapper.setData({ isOpened: true })
    wrapper.vm.closeOption()
    expect(wrapper.vm.isOpened).toBe(false)
  })

  it('[methods] selectOption: change を emit して closeOption を呼び出す', () => {
    const mock = jest.fn()
    const wrapper = wrapperFactory()
    wrapper.setMethods({ closeOption: mock })
    wrapper.setData({ isOpened: true })
    wrapper.vm.selectOption({ target: options[0] })

    expect(wrapper.emitted().change[0][0]).toBe('1')
    expect(mock).toHaveBeenCalled()
  })

  it('[methods] escKeyHandler: Escキーのイベントの場合、 closeOption を呼び出す', () => {
    const mock = jest.fn()
    const wrapper = wrapperFactory()

    wrapper.setMethods({ closeOption: mock })
    wrapper.setData({ isOpened: true })
    wrapper.vm.escKeyHandler({ keyCode: 27 })

    expect(mock).toHaveBeenCalled()
  })

  it('[methods] escKeyHandler: Escキーのイベントではない場合は何もしない', () => {
    const mock = jest.fn()
    const wrapper = wrapperFactory()

    wrapper.setMethods({ closeOption: mock })
    wrapper.setData({ isOpened: true })
    wrapper.vm.escKeyHandler({ keyCode: 13 })

    expect(mock).not.toHaveBeenCalled()
  })
})
