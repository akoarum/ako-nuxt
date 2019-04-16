import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/utils/variables'
import FormTextarea from '~/components/molecules/FormTextarea'

describe('FormTextarea', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormTextarea, {
      propsData: {
        name: 'test',
        value: '',
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
      it('requiredでvalueがない場合は空文字列を返す', () => {
        wrapper.setProps({ required: false })
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('isDirtyでない場合、空文字列を返す', () => {
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('isDirtyでrequired、valueが空の場合はREQUIREDエラーを返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe(VALIDATES.required)
      })

      it('isDirtyでminlengthよりvalueの文字数が少ない場合、エラーを返す', () => {
        wrapper.setProps({ minlength: 10 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('a')).toBe(`10字以上で入力して下さい。`)
      })

      it('isDirtyでmaxlengthよりvalueの文字数が多い場合、エラーを返す', () => {
        wrapper.setProps({ maxlength: 10 })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('abcdefghijkl')).toBe(`10字以内で入力して下さい。`)
      })
    })

    describe('updateDirty', () => {
      it('valueが空でなくisDirtyでなければisDirtyをtrueにする', () => {
        const mockValidate = jest.fn()
        wrapper.setProps({ value: 'test' })
        wrapper.setMethods({ validate: mockValidate })
        wrapper.vm.updateDirty()
        expect(wrapper.vm.isDirty).toBe(true)
        expect(mockValidate).toHaveBeenCalled()
      })
    })
  })
})
