import { shallowMount } from '@vue/test-utils'
import VHeadings from '~/components/atoms/VHeadings'

const wrapperFactory = (propsData = {}) => shallowMount(VHeadings, {
  propsData: {
    text: 'テキスト',
    ...propsData
  }
})

describe('VHeadings', () => {
  it('render: props の level と visualLevel からDOMを生成する', () => {
    const level2 = wrapperFactory({ level: 2 })
    const level3Visual2 = wrapperFactory({ level: 3, visualLevel: 2 })

    expect(level2.is('h2')).toBeTruthy()
    expect(level3Visual2.is('h3')).toBeTruthy()
    expect(level3Visual2.classes()).toContain('-lv2')
  })
})
