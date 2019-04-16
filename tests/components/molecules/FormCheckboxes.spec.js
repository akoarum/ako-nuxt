import { mount } from '@vue/test-utils'
import { VALIDATES } from '~/utils/variables'
import FormCheckboxes from '~/components/molecules/FormCheckboxes'

describe('FormCheckboxes', () => {
  let wrapper
  const selects = [
    { id: 1, label: '1', value: '1' },
    { id: 2, label: '2', value: '2' },
    { id: 3, label: '3', value: '3' }
  ]

  beforeEach(() => {
    wrapper = mount(FormCheckboxes, {
      propsData: {
        name: 'test',
        value: [],
        selects,
        required: true
      }
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

  describe('methods', () => {
    describe('validate', () => {
      it('requiredでない場合は空文字列を返す', () => {
        wrapper.setProps({ required: false })
        expect(wrapper.vm.validate([])).toBe('')
      })

      it('isDirtyでない場合も空文字列を返す', () => {
        wrapper.setData({ isDirty: false })
        expect(wrapper.vm.validate([])).toBe('')
      })

      it('requiredでisDirty、valueが空配列の場合はselectedエラーを返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate([])).toBe(VALIDATES.selected)
      })

      it('minが設定されていて、valueの数が足りない場合はエラーを返す', () => {
        wrapper.setProps({ min: 2 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate(['1'])).toBe('2個以上選択してください。')
      })

      it('maxが設定されていて、valueの数が超えている場合はエラーを返す', () => {
        wrapper.setProps({ max: 2 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate(['1', '2', '3'])).toBe('2個以内で選択してください。')
      })
    })

    describe('updateDirty', () => {
      it('isDirtyをtrueにする', () => {
        wrapper.vm.updateDirty()
        expect(wrapper.vm.isDirty).toBe(true)
      })
    })
  })
})
