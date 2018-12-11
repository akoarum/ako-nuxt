import { shallowMount } from '@vue/test-utils'
import VTable from '~/components/atoms/VTable'

const wrapperFactory = (propsData = {}) => shallowMount(VTable, {
  propsData: {
    ...propsData
  }
})

describe('VTable', () => {
  let wrapper

  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it('[computed] columnWidths: widths を id 付きに変更する', () => {
    const widths = ['25%', '25%', '50%']
    const returns = [
      { id: 0, width: '25%' },
      { id: 1, width: '25%' },
      { id: 2, width: '50%' }
    ]
    expect(VTable.computed.columnWidths.call({ widths })).toEqual(returns)
  })

  it('[methods] headClasses: 渡されたデータをもとにクラス配列を返す', () => {
    expect(wrapper.vm.headClasses({ align: 'left', vertical: 'top' })).toEqual(['-left', '-top'])
    expect(wrapper.vm.headClasses({ align: 'right', vertical: 'bottom' })).toEqual(['-right', '-bottom'])
  })
})
