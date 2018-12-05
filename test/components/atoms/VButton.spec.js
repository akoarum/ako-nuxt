import VButton from '~/components/atoms/VButton/Presenter'

describe('VButton', () => {
  it('[computed] appearanceClasses: propsを元にクラスの配列を返す', () => {
    expect(VButton.computed.appearanceClasses.call({ primary: true })).toEqual(['-primary'])
    expect(VButton.computed.appearanceClasses.call({ secondary: true })).toEqual(['-secondary'])
    expect(VButton.computed.appearanceClasses.call({ primary: true, small: true })).toEqual(['-primary', '-small'])
  })
})
