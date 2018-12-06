import VInputText from '~/components/atoms/VInputText'

describe('VInputText', () => {
  it('[computed] appearanceClasses: props を元に class 配列を返す', () => {
    expect(VInputText.computed.appearanceClasses.call({ error: false })).toEqual([])
    expect(VInputText.computed.appearanceClasses.call({ error: true })).toEqual(['-error'])
  })
})
