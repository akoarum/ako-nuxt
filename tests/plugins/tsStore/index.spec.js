import Vuex from 'vuex'
import plugin, { TsStore } from '~/plugins/tsStore'

describe('tsStore', () => {
  describe('TsStoreクラス', () => {
    let tsStore
    const store = {
      state: {
        state: 'test'
      },
      getters: {
        getTest: () => ''
      },
      actions: {
        action() {}
      },
      mutations: {
        mutation() {}
      },
      dispatch: {
        dispatch() {}
      }
    }

    beforeEach(() => {
      tsStore = new TsStore(store)
    })

    it('init', () => {
      expect(tsStore._store).toEqual(store)
    })

    it('storeにアクセスすると内部のstoreを返す', () => {
      expect(tsStore.store).toEqual(store)
    })

    it('stateにアクセスすると内部のstateを返す', () => {
      expect(tsStore.state).toEqual(store.state)
    })

    it('gettersにアクセスすると内部のgettersを返す', () => {
      expect(tsStore.getters).toEqual(store.getters)
    })

    it('commitにアクセスすると内部のcommitを返す', () => {
      expect(tsStore.commit).toEqual(store.commit)
    })

    it('dispatchにアクセスすると内部のdispatchを返す', () => {
      expect(tsStore.dispatch).toEqual(store.dispatch)
    })
  })

  describe('plugin', () => {
    it('TsStoreをnewしてそれぞれinject関数で反映させる', () => {
      const context = {
        store: {
          store: {},
          state: { test: 'test' },
          getters: { test: () => 'test' },
          commit: { testCommit() {} },
          dispatch: { testDispatch() {} }
        }
      }
      const inject = jest.fn()
      plugin(context, inject)
      expect(inject).toHaveBeenCalledTimes(5)
    })
  })
})
