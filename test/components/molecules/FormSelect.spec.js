import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/functions/variables'
import FormSelect from '~/components/molecules/FormSelect'

const options = [
  { id: 1, display: '項目1', value: 'test1' },
  { id: 2, display: '項目2', value: 'test2' },
  { id: 3, display: '項目3', value: 'test3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(FormSelect, {
  propsData: {
    name: 'test',
    value: '',
    options,
    ...propsData
  }
})

describe('FormSelect', () => {
  let wrapper
  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it('[watch] error: error を emit する', () => {
    wrapper.setData({ error: 'test' })
    expect(wrapper.emitted().error[0][0]).toBe(true)
  })

  it('[watch] value: validate メソッドを実行する', () => {
    const mock = jest.fn().mockReturnValue('')

    wrapper.setMethods({ validate: mock })
    wrapper.setProps({ value: 'test' })

    expect(mock).toHaveBeenCalled()
  })

  it('[methods] changeHandler: change を emit する', () => {
    wrapper.vm.changeHandler('test')
    expect(wrapper.emitted().change[0][0]).toBe('test')
  })

  it('[methods] closeHandler: validate を実行する', () => {
    const mock = jest.fn().mockReturnValue('')
    wrapper.setData({ opened: true })
    wrapper.setMethods({ validate: mock })
    wrapper.vm.closeHandler()
    expect(mock).toHaveBeenCalled()
  })

  it('[methods] validate: valueが空ならSELECTエラーを返す', () => {
    wrapper.setProps({ required: true })
    wrapper.setData({ opened: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.SELECT.message)
  })
})
