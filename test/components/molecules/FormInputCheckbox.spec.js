import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/assets/js/variables'
import FormInputCheckbox from '~/components/molecules/FormInputCheckbox'

const items = [
  { id: 1, display: 'テスト', value: 'test1' },
  { id: 2, display: 'テスト', value: 'test2' },
  { id: 3, display: 'テスト', value: 'test3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(FormInputCheckbox, {
  propsData: {
    name: 'test',
    value: [],
    items,
    ...propsData
  }
})

describe('FormInputCheckbox', () => {
  it('[watch] error: errorをemitする', () => {
    const wrapper = wrapperFactory()
    wrapper.setData({ error: 'test' })
    expect(wrapper.emitted().error[0][0]).toBe(true)
  })

  it('[watch] value: isDirtied が true なら validateメソッドを実行する', () => {
    const mock = jest.fn()
    const wrapper = wrapperFactory()
    wrapper.setMethods({ validate: mock })
    wrapper.setData({ isDirtied: true })
    wrapper.setProps({ value: ['test1'] })
    expect(mock).toHaveBeenCalled()
  })

  it('[methods] changeHandler: 引数の checked が true なら value に追加、false なら value から削除する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.changeHandler({ value: 'test', checked: true })
    expect(wrapper.emitted().change[0][0]).toEqual(['test'])

    wrapper.setProps({ value: ['test1'] })
    wrapper.vm.changeHandler({ value: 'test1', checked: false })
    expect(wrapper.emitted().change[1][0]).toEqual([])
  })

  it('[methods] validate: required で value が一つもなければSELECTエラーを返す', () => {
    const wrapper = wrapperFactory()
    wrapper.setProps({ required: true })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.SELECT.message)
  })
})
