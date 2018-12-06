import VTextarea from '~/components/atoms/VTextarea'

describe('VTextarea', () => {
  it('[computed] appearanceClasses: props を元に class 配列を返す', () => {
    expect(VTextarea.computed.appearanceClasses.call({ error: false })).toEqual([])
    expect(VTextarea.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
  })
})
