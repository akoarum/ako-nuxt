import { shallowMount } from '@vue/test-utils'
import FormInput from '~/components/molecules/FormInput'
import { VALIDATES } from '~/utils/variables'

describe('FormInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormInput, {
      propsData: {
        name: 'name',
        type: 'text',
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
      it('引数valueが空でrequiredでない場合は空文字列を返す', () => {
        wrapper.setProps({ required: false })
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('引数valueが空でrequired、!isDirtyの場合は空文字列を返す', () => {
        expect(wrapper.vm.validate('')).toBe('')
      })

      it('引数valueが空でrequired、isDirtyの場合はrequiredを返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe(VALIDATES.required)
      })

      it('type: email、引数valueがEMAILになっていない場合はemail.messageを返す', () => {
        wrapper.setProps({ type: 'email' })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('test')).toBe(VALIDATES.email.message)
      })

      it('type: tel、引数valueがTELになっていない場合はtel.messageを返す', () => {
        wrapper.setProps({ type: 'tel' })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('test')).toBe(VALIDATES.tel.message)
      })

      it('上記以外であれば空文字列を返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('test')).toBe('')
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
