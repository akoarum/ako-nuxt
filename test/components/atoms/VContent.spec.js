import { shallowMount } from '@vue/test-utils'
import VContent from '~/components/atoms/VContent'

const wrapperFacotry = (propsData = {}) => shallowMount(VContent, {
  propsData: {
    ...propsData
  },
  slots: {
    default: '<p>テスト</p>'
  }
})

describe('VContent', () => {
  it('[render] tagで渡した要素で描画する', () => {
    const wrapper = wrapperFacotry()

    wrapper.setProps({ tag: 'section' })
    expect(wrapper.is('section')).toBeTruthy()

    wrapper.setProps({ tag: 'article' })
    expect(wrapper.is('article')).toBeTruthy()
  })
})
