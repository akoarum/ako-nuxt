import { shallowMount } from '@vue/test-utils'
import FormSelect from '~/components/molecules/FormSelect.vue'

describe('FormSelect', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormSelect, {
      propsData: {
        name: 'test',
        options: [
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
