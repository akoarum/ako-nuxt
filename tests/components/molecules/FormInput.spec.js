import { shallowMount } from '@vue/test-utils'
import FormInput from '~/components/molecules/FormInput'

describe('FormInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormInput, {
      propsData: {
        name: 'test',
        value: ''
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
    it('handleBlur: blurをemitしてisDirtyでなければupdateDirtyを呼び出す', () => {
      const mockUpdateDirty = jest.fn()
      wrapper.setProps({ required: true, value: 'test' })
      wrapper.setMethods({ updateDirty: mockUpdateDirty })
      wrapper.vm.handleBlur()
      expect(wrapper.emitted().blur).toBeTruthy()
      expect(mockUpdateDirty).toHaveBeenCalled()
    })

    describe('updateDirty: isDirtyの更新', () => {
      it('値が入っていればisDirtyをtrueにする', () => {
        wrapper.setProps({ required: true, value: 'test' })
        wrapper.vm.updateDirty()
        expect(wrapper.vm.isDirty).toBe(true)
      })

      it('値が入っていなければ更新しない', () => {
        wrapper.setProps({ required: true, value: '' })
        wrapper.vm.updateDirty()
        expect(wrapper.vm.isDirty).toBe(false)
      })
    })

    describe('validate: バリデーション', () => {
      it('isDirtyでなければ空文字列を返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: false })
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('requiredでなく、valueが空文字列なら空文字列を返す', () => {
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('requiredでisDirty、valueが空文字列ならrequiredエラーを返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe('入力してください。')
      })

      it('typeがemailで、valueがemail型でなければエラーを返す', () => {
        wrapper.setProps({ type: 'email', required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('abc')).toBe('メールアドレスを正しく入力してください。')
      })

      it('typeがtelで、valueがtel型でなければエラーを返す', () => {
        wrapper.setProps({ type: 'tel', required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('abc')).toBe('電話番号は半角数字とハイフンで入力してください。')
      })
    })
  })
})
