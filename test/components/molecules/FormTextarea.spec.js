import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/assets/js/variables'
import FormTextarea from '~/components/molecules/FormTextarea'

const wrapperFactory = (propsData = {}) => shallowMount(FormTextarea, {
  propsData: {
    name: 'test',
    value: '',
    ...propsData
  }
})

describe('FormTextarea', () => {
  let wrapper
  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it('[watch] value: validateメソッドを実行する', () => {
    const mock = jest.fn().mockReturnValue('')
    wrapper.setMethods({ validate: mock })
    wrapper.setData({ value: 'test' })

    expect(mock).toHaveBeenCalled()
  })

  it('[watch] isDirtied: validateメソッドを実行する', () => {
    const mock = jest.fn().mockReturnValue('')
    wrapper.setMethods({ validate: mock })
    wrapper.setData({ isDirtied: true })

    expect(mock).toHaveBeenCalled()
  })

  it('[watch] error: errorをemitする', () => {
    wrapper.setData({ error: 'error' })
    expect(wrapper.emitted().error[0][0]).toEqual({ name: 'test', error: true })
  })

  it('[methods] inputHandler: inputをemitする', () => {
    wrapper.vm.inputHandler('test')
    expect(wrapper.emitted().input[0][0]).toBe('test')
  })

  it('[methods] validate: requiredでisDirtied、valueが空の場合はEMPTYエラーを返す', () => {
    wrapper.setProps({ required: true })
    wrapper.setData({ isDirtied: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.EMPTY.message)
  })
})
