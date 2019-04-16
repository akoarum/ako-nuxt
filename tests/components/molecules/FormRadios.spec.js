import { shallowMount } from '@vue/test-utils'
import FormRadios from '~/components/molecules/FormRadios'
import { VALIDATES } from '~/utils/variables'

describe('FormRadios', () => {
  let wrapper
  const selects = [
    { id: 1, label: 'ラベル1', value: '1' },
    { id: 2, label: 'ラベル2', value: '2' },
    { id: 3, label: 'ラベル3', value: '3' },
    { id: 4, label: 'ラベル4', value: '4' }
  ]

  beforeEach(() => {
    wrapper = shallowMount(FormRadios, {
      propsData: {
        name: 'name',
        value: '',
        selects
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
      it('requiredでisDirtyでない場合は空文字列を返す', () => {
        expect(wrapper.vm.validate('1')).toBe('')
      })

      it('requiredかつisDirtyでvalueが空ならselectedエラーを返す', () => {
        wrapper.setProps({ required: true })
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe(VALIDATES.selected)
      })

      it('valueが空でない場合は空文字列を返す', () => {
        wrapper.setProps({ isDirty: true })
        expect(wrapper.vm.validate('1')).toBe('')
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
