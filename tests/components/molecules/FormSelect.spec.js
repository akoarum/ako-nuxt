import { shallowMount } from '@vue/test-utils'
import { VALIDATES } from '~/utils/variables'
import FormSelect from '~/components/molecules/FormSelect'

describe('FormSelect', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FormSelect, {
      propsData: {
        name: 'test',
        options: [
          { id: 1, label: '項目1', value: '1' },
          { id: 2, label: '項目2', value: '2' },
          { id: 3, label: '項目3', value: '3' },
          { id: 4, label: '項目4', value: '4' }
        ],
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
      it('requiredでない場合は空文字列を返す', () => {
        wrapper.setProps({ required: false })
        expect(wrapper.vm.validate('1')).toBe('')
      })

      it('isDirtyでない場合は空文字列を返す', () => {
        expect(wrapper.vm.validate('1')).toBe('')
      })

      it('requiredかつisDirtyで、valueが空の場合はselectedエラーを返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('')).toBe(VALIDATES.selected)
      })

      it('requiredかつisDirtyで、valueが空でない場合は空文字列を返す', () => {
        wrapper.setData({ isDirty: true })
        expect(wrapper.vm.validate('1')).toBe('')
      })
    })

    describe('updateDirty', () => {
      it('valueが空でなければisDirtyをtrueにする', () => {
        wrapper.vm.updateDirty('1')
        expect(wrapper.vm.isDirty).toBe(true)
      })
    })
  })
})
