import { shallowMount } from '@vue/test-utils'
import VTabs from '~/components/atoms/VTabs'

const tabs = [
  { id: '1', display: 'Item1' },
  { id: '2', display: 'Item2' },
  { id: '3', display: 'Item3' }
]

const wrapperFactory = (propsData = {}) => shallowMount(VTabs, {
  propsData: {
    tabs,
    current: '1',
    id: 1,
    ...propsData
  }
})

describe('VTabs', () => {
  it('[computed] tabIds: props.tabs から id のみの配列を生成して返す', () => {
    expect(VTabs.computed.tabIds.call({ tabs })).toEqual(['1', '2', '3'])
  })

  it('[methods] keyupHandler: keyCode=35 の場合、tabs配列最後のIDを持って update を emit する', () => {
    const wrapper = wrapperFactory()

    wrapper.vm.keyupHandler({ keyCode: 35 })
    expect(wrapper.emitted().update[0][0]).toBe('3')
  })

  it('[methods] keyupHandler: keyCode=36 の場合、tabs配列最初のIDを持って update を emit する', () => {
    const wrapper = wrapperFactory()

    wrapper.vm.keyupHandler({ keyCode: 36 })
    expect(wrapper.emitted().update[0][0]).toBe('1')
  })

  it('[methods] keyupHandler: keyCode=37 で、current が tabs 配列の先頭でなければ update を emit する', () => {
    const wrapper = wrapperFactory()

    wrapper.vm.keyupHandler({ keyCode: 37 })
    expect(wrapper.emitted().update).toBeFalsy()

    wrapper.setProps({ current: '2' })
    wrapper.vm.keyupHandler({ keyCode: 37 })
    expect(wrapper.emitted().update[0][0]).toBe('1')
  })

  it('[methods] keyupHandler: keyCode=39 で、current が tabs 配列の最後でなければ update を emit する', () => {
    const wrapper = wrapperFactory()

    wrapper.setProps({ current: '3' })
    wrapper.vm.keyupHandler({ keyCode: 39 })
    expect(wrapper.emitted().update).toBeFalsy()

    wrapper.setProps({ current: '1' })
    wrapper.vm.keyupHandler({ keyCode: 39 })
    expect(wrapper.emitted().update[0][0]).toBe('2')
  })
})
