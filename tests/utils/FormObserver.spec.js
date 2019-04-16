import FormObserver from '~/utils/FormObserver'

describe('FormObserver', () => {
  it('_createItems: namesからオブジェクトを生成して返す', () => {
    const names = ['name', 'email', 'tel']
    expect(FormObserver.prototype._createItems(names)).toEqual({
      name: { error: false, dirty: false },
      email: { error: false, dirty: false },
      tel: { error: false, dirty: false }
    })
  })

  it('updateItem: アイテムのデータを更新する', () => {
    const formObserver = new FormObserver(['name', 'test'])
    formObserver.updateItem('name', 'error', true)
    expect(formObserver._items.name).toEqual({ error: true, dirty: false })
  })

  describe('btnDisabled', () => {
    let formObserver

    beforeEach(() => {
      formObserver = new FormObserver(['name', 'test'])
    })

    it('items配列の中で1つでもerrorか!dirtyがあればtrueを返す', () => {
      formObserver._items = {
        name: { error: true, dirty: true },
        test: { error: false, dirty: true }
      }
      expect(formObserver.btnDisabled).toBe(true)
    })

    it('items配列の全てが!error、dirtyでfalseを返す', () => {
      formObserver._items = {
        name: { error: false, dirty: true },
        test: { error: false, dirty: true }
      }
      expect(formObserver.btnDisabled).toBe(false)
    })
  })
})
