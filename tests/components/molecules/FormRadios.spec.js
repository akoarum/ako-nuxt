import { shallowMount } from '@vue/test-utils'
import FormRadios from '~/components/molecules/FormRadios'

describe('FormRadios', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormRadios, {
      propsData: {
        name: 'test',
        items: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ],
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
    it('updateDirty: isDirtyを更新する', () => {
      wrapper.setProps({ required: true })
      wrapper.vm.updateDirty()
      expect(wrapper.vm.isDirty).toBe(true)
    })

    describe('validate: バリデーション', () => {
      it('isDirtyでなければ空文字列を返す', () => {
        expect(wrapper.vm.validate(1)).toBe('')
      })

      it('requiredでvalueが空ならselectエラーを返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe('選択してください。')
      })

      it('それ以外なら空文字列を返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate(1)).toBe('')
      })
    })
  })
})
