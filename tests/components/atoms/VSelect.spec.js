import { shallowMount } from '@vue/test-utils'
import VSelect from '~/components/atoms/VSelect'

describe('VSelect', () => {
  let wrapper

  const options = [
    { id: 1, label: '項目1', value: '1' },
    { id: 2, label: '項目2', value: '2' },
    { id: 3, label: '項目3', value: '3' }
  ]

  beforeEach(() => {
    wrapper = shallowMount(VSelect, {
      propsData: {
        options,
        checkedValue: ''
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

  describe('computed', () => {
    describe('selectedView', () => {
      it('選択されているoptionのlabelを表示する', () => {
        expect(VSelect.computed.selectedView.call({ options, checkedValue: '2' })).toBe('項目2')
      })

      it('選択されていない場合は「選択してください」を表示する', () => {
        expect(VSelect.computed.selectedView.call({ options, checkedValue: '' })).toBe('選択してください')
      })
    })
  })

  describe('methods', () => {
    it('isSelected: 引数valueとcheckedValueを比較してcheckedかどうかを返す', () => {
      wrapper.setProps({ checkedValue: '1' })
      expect(wrapper.vm.isSelected('1')).toBe(true)
      expect(wrapper.vm.isSelected('2')).toBe(false)
    })

    it('updateOptionView: 引数statusをoptionVisibleに入れる', () => {
      wrapper.vm.updateOptionView(true)
      expect(wrapper.vm.optionVisible).toBe(true)

      wrapper.vm.updateOptionView(false)
      expect(wrapper.vm.optionVisible).toBe(false)
    })
  })
})
