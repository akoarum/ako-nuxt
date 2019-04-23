import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/utils/variables'
import FormInputFile from '~/components/molecules/FormInputFile'

describe('FormInputFile', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormInputFile, {
      propsData: {
        name: 'test'
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
    describe('validate: バリデーション', () => {
      it('requiredでなければ空文字列を返す', () => {
        expect(wrapper.vm.validate()).toBe('')
      })

      it('isDirtyでなければ空文字列を返す', () => {
        wrapper.setProps({ required: true })
        expect(wrapper.vm.validate()).toBe('')
      })

      it('valueに値があれば空文字列を返す', () => {
        wrapper.setData({ isDirty: true })
        wrapper.setProps({ required: true, value: {} })
        expect(wrapper.vm.validate()).toBe('')
      })

      it('上記以外ならfileエラーを返す', () => {
        wrapper.setData({ isDirty: true })
        wrapper.setProps({ required: true, value: null })
        expect(wrapper.vm.validate()).toBe(VALIDATES.file)
      })
    })

    it('handleInput: 引数を持ってemit', () => {
      wrapper.vm.handleInput('test')
      expect(wrapper.emitted().input).toBeTruthy()
    })
  })
})
