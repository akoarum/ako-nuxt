import { mount } from '@vue/test-utils'
import FormInputText from '~/components/molecules/FormInputText'
import { VALIDATES } from '~/functions/variables'

const wrapperContainer = (propsData = {}) => mount(FormInputText, {
  propsData: {
    type: 'text',
    name: 'test',
    value: '',
    ...propsData
  }
})

describe('FormInputText', () => {
  let wrapper
  beforeEach(() => {
    wrapper = wrapperContainer()
  })

  it('[watch] value: validate を実行する', () => {
    const mock = jest.fn().mockReturnValue('')
    wrapper.setMethods({ validate: mock })
    wrapper.setProps({ value: 'aaa' })
    expect(mock).toHaveBeenCalled()
  })

  it('[watch] isDirtied: validate を実行する', () => {
    const mock = jest.fn().mockReturnValue('')
    wrapper.setMethods({ validate: mock })
    wrapper.setData({ isDirtied: true })
    expect(mock).toHaveBeenCalled()
  })

  it('[watch] error: error を emit する', () => {
    wrapper.setData({ error: 'テスト' })
    expect(wrapper.emitted().error[0][0]).toEqual({ error: true, name: 'test' })
  })

  it('[methods] inputHandler: value を持って input を emit する', () => {
    wrapper.vm.inputHandler('test')
    expect(wrapper.emitted().input[0][0]).toBe('test')
  })

  it('[methods] validate: isDirtied が true でなければ空を返す', () => {
    expect(wrapper.vm.validate()).toBe('')
  })

  it('[methods] validate: required で value が空なら EMPTY エラーにする', () => {
    wrapper.setProps({ required: true, value: '' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.EMPTY.message)
  })

  it('[methods] validate: value が空でも required でなければ空を返す', () => {
    wrapper.setProps({ required: false, value: '' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe('')
  })

  it('[methods] validate: type が number で value が数字以外なら NUMBER エラーにする', () => {
    wrapper.setProps({ type: 'number', value: 'あ' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.NUMBER.message)
  })

  it('[methods] validate: type が email で value がメールアドレスでなければ EMAIL エラーにする', () => {
    wrapper.setProps({ type: 'email', value: 'a' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.EMAIL.message)
  })

  it('[methods] validate: type が tel で value が電話番号でなければ TEL エラーにする', () => {
    wrapper.setProps({ type: 'tel', value: 'a' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.TEL.message)
  })

  it('[methods] validate: type が url で value がURLでなければ URL エラーにする', () => {
    wrapper.setProps({ type: 'url', value: 'a' })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.URL.message)
  })
})
