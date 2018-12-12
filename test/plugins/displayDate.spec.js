import { displayDate } from '~/plugins/displayDate'

describe('displayDate', () => {
  it('"yyyy-mm-dd"の形式の文字列を渡すと、yyyy/mm/ddで返す"', () => {
    expect(displayDate('2018-12-01')).toBe('2018/12/01')
  })

  it('別の形式や空文字列を渡すと、そのまま返す', () => {
    expect(displayDate('2018年12月1日')).toBe('2018年12月1日')
    expect(displayDate('')).toBe('')
  })
})
