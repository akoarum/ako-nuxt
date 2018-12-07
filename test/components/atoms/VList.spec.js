import { shallowMount } from '@vue/test-utils'
import VList from '~/components/atoms/VList'

const items = ['テスト', 'テスト', 'テスト']

const wrapperFactory = (propsData = {}) => shallowMount(VList, {
  propsData: {
    items,
    ...propsData
  }
})

describe('VList', () => {
  it('items で渡したものが li で表示される', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.findAll('li').length).toBe(3)
  })

  it('tag に渡した要素でレンダリングする', () => {
    const ulWrapper = wrapperFactory({ tag: 'ul' })
    const olWrapper = wrapperFactory({ tag: 'ol' })
    expect(ulWrapper.is('ul')).toBeTruthy()
    expect(olWrapper.is('ol')).toBeTruthy()
  })

  it('visual に渡した名前がクラス名に使用される', () => {
    const bulletWrapper = wrapperFactory({ visual: 'bullet' })
    const numberWrapper = wrapperFactory({ visual: 'number' })
    expect(bulletWrapper.classes()).toContain('-bullet')
    expect(numberWrapper.classes()).toContain('-number')
  })
})
