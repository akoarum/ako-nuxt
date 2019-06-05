import { shallowMount } from '@vue/test-utils'
import FormCheckboxes from '~/components/molecules/FormCheckboxes'

describe('FormCheckboxes', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormCheckboxes, {
      propsData: {
        name: 'test',
        items: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ],
        value: []
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
    describe('setCheckedValues: propsからオブジェクトを生成してcheckedValuesにセットする', () => {
      it('通常時は全てfalse', () => {
        wrapper.vm.setCheckedValues()
        expect(wrapper.vm.checkedValues).toEqual({ 1: false, 2: false, 3: false })
      })

      it('valueに値がある場合は、その値と一致したkeyのvalueだけがtrueになる', () => {
        wrapper.setProps({ value: [2] })
        wrapper.vm.setCheckedValues()
        expect(wrapper.vm.checkedValues).toEqual({ 1: false, 2: true, 3: false })
      })
    })

    it('updateDirty: isDirtyを更新する', () => {
      wrapper.setProps({ required: true })
      wrapper.vm.updateDirty()
      expect(wrapper.vm.isDirty).toBe(true)
    })

    it('updateValue: 引数のIDと一致したcheckedValuesのvalueを反転させる', () => {
      wrapper.setData({ checkedValues: { 1: false } })
      wrapper.vm.updateValue(1)
      expect(wrapper.vm.checkedValues[1]).toBe(true)
      wrapper.vm.updateValue(1)
      expect(wrapper.vm.checkedValues[1]).toBe(false)
    })

    describe('validate: バリデーション', () => {
      it('isDirtyでなければ空文字列を返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: false })
        expect(wrapper.vm.validate([])).toBe('')
      })

      it('requiredでisDirty、valueが空ならselectedエラーを返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate([])).toBe('選択してください。')
      })

      it('minが設定されていて、valueの数がminより少なければエラーを返す', () => {
        wrapper.setProps({ min: 2 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate([1])).toBe('2個以上選択してください。')
      })

      it('maxが設定されていて、valueの数がmaxより多ければエラーを返す', () => {
        wrapper.setProps({ max: 2 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate([1, 2, 3])).toBe('選択できるのは2個までです。')
      })
    })
  })
})
