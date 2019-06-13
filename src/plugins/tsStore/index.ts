import * as Vuex from 'vuex'

export class TsStore {
  _store: Vuex.TsStore

  constructor(store: Vuex.TsStore) {
    this._store = store
  }

  get store() {
    return this._store
  }

  get state() {
    return this._store.state
  }

  get getters() {
    return this._store.getters
  }

  get commit() {
    return this._store.commit
  }

  get dispatch() {
    return this._store.dispatch
  }
}

export default (context, inject) => {
  const store = new TsStore(context.store)

  inject('tsStore', store.store)
  inject('state', store.state)
  inject('getters', store.getters)
  inject('commit', store.commit)
  inject('dispatch', store.dispatch)
}
