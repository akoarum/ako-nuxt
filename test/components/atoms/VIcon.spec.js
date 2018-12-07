import VIcon from '~/components/atoms/VIcon/Presenter'

describe('VIcon', () => {
  it('[computed] appearanceClasses: props から class 配列を生成して返す', () => {
    expect(VIcon.computed.appearanceClasses.call({ primary: true })).toEqual(['-primary'])
    expect(VIcon.computed.appearanceClasses.call({ secondary: true })).toEqual(['-secondary'])
    expect(VIcon.computed.appearanceClasses.call({ primary: false, secondary: false })).toEqual([])
  })
})
