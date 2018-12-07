import VTexts from '~/components/atoms/VTexts'

describe('VTexts', () => {
  it('[computed] appearanceClasses: props を元にクラスの配列を生成して返す', () => {
    expect(VTexts.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
    expect(VTexts.computed.appearanceClasses.call({ error: false })).toEqual([])
  })
})
