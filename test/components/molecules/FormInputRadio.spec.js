import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/assets/js/variables'
import FormInputRadio from '~/components/molecules/FormInputRadio'

const items = [
  { id: 1, display: 'テスト1', value: 'test1' },
  { id: 2, display: 'テスト2', value: 'test2' },
  { id: 3, display: 'テスト3', value: 'test3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(FormInputRadio, {
  propsData: {
    name: 'test',
    value: '',
    items,
    ...propsData
  }
})

describe('FormInputRadio', () => {
  it('[watch] error: errorをemitする', () => {
    const wrapper = wrapperFactory()
    wrapper.setData({ error: 'test' })
    expect(wrapper.emitted().error[0][0]).toBe(true)
  })

  it('[methods] changeHandler: change を emit する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.changeHandler('test')
    expect(wrapper.emitted().change[0][0]).toBe('test')
  })

  it('[methods] validate: requiredで未選択の場合はEMPTYエラーを返す', () => {
    const wrapper = wrapperFactory()
    wrapper.setProps({ required: true })
    expect(wrapper.vm.validate()).toBe(VALIDATES.EMPTY.message)
  })
})
