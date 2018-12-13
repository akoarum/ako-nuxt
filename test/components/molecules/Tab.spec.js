import { shallowMount } from '@vue/test-utils'
import Tab from '~/components/molecules/Tab'
import VTabPanel from '~/components/atoms/VTabPanel'

const tabs = [
  { id: '1', display: 'Item1' },
  { id: '2', display: 'Item2' },
  { id: '3', display: 'Item3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(Tab, {
  propsData: {
    tabs,
    ...propsData
  },
  slots: {
    default: `
      <VTabPanel>テスト</VTabPanel>
      <VTabPanel>テスト</VTabPanel>
      <VTabPanel>テスト</VTabPanel>
    `
  },
  stubs: {
    VTabPanel
  }
})

describe('Tab', () => {
  it('[computed] id: _uid からコンポーネントのユニークIDを返す', () => {
    expect(Tab.computed.id.call({ _uid: 10 })).toBe(10)
  })

  it('[methods] updateCurrent: current を渡された ID に更新する', () => {
    const wrapper = wrapperFactory()
    wrapper.vm.updateCurrent('2')
    expect(wrapper.vm.current).toBe('2')
  })
})
