import { shallowMount } from '@vue/test-utils'
import FormTextarea from '~/components/molecules/FormTextarea'

describe('FormTextarea', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormTextarea, {
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
    it('handleBlur: blurをemitして、isDirtyがfalseならupdateDirtyを呼び出す', () => {
      const mockUpdateDirty = jest.fn()
      wrapper.setMethods({ updateDirty: mockUpdateDirty })
      wrapper.vm.handleBlur()
      expect(wrapper.emitted().blur).toBeTruthy()
      expect(mockUpdateDirty).toHaveBeenCalled()
    })
    it('updateDirty: isDirtyを更新する', () => {
      wrapper.vm.updateDirty()
      expect(wrapper.vm.isDirty).toBe(true)
    })

    describe('validate: バリデーション', () => {
      it('isDirtyでない場合は空文字列を返す', () => {
        wrapper.setProps({ required: true })
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('requiredでvalueが空の場合はrequiredエラーを返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe('入力してください。')
      })

      it('それ以外は空文字列を返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('test')).toBe('')
      })
    })
  })
})
