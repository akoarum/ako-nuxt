import VInputCheckbox from '~/components/atoms/VInputCheckbox'

describe('VInputCheckbox', () => {
  it('[computed] isChecked: value が checked に含まれていれば true 、なければ false を返す', () => {
    expect(VInputCheckbox.computed.isChecked.call({ value: 'test', checked: ['test'] })).toBe(true)
    expect(VInputCheckbox.computed.isChecked.call({ value: 'test', checked: [] })).toBe(false)
  })
})
