import { shallowMount } from '@vue/test-utils'
import VFlex from '~/components/atoms/VFlex'
import VFlexItem from '~/components/atoms/VFlexItem'

const wrapperFactory = (propsData = {}) => shallowMount(VFlex, {
  propsData: {
    ...propsData
  },
  slots: {
    default: `
      <VFlexItem>テスト</VFlexItem>
      <VFlexItem>テスト</VFlexItem>
      <VFlexItem>テスト</VFlexItem>
    `
  },
  stubs: {
    VFlexItem
  }
})

describe('VFlex', () => {
  it('[render] props を元にルートの要素にクラスをつける', () => {
    const wrapper = wrapperFactory()
    wrapper.setProps({ pcColumns: 4, spColumns: 2 })

    expect(wrapper.classes()).toContain('-pc-4')
    expect(wrapper.classes()).toContain('-sp-2')
  })
})
