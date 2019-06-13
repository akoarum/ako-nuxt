import 'vuex'

declare module 'vuex' {
  type Getters<S, G> = {
    [K in keyof G]: (
      state: S,
      getters: G,
      rootState: RootState,
      rootGetters: RootGetters
    ) => G[K]
  }

  type Mutations<S, M> = { [K in keyof M]: (state: S, payload: M[K]) => void }

  type TsCommit<M> = <T extends keyof M>(type: T, payload?: M[T]) => void
  type TsDispatch<A> = <T extends keyof A>(type: T, payload?: A[T]) => any
  type TsActionContext<S, A, G, M> = {
    commit: TsCommit<M>
    dispatch: TsDispatch<A>
    state: S
    getters: G
    rootState: RootState
    rootGetters: RootGetters
  }
  type Actions<S, A, G = {}, M = {}> = {
    [K in keyof A]: (ctx: TsActionContext<S, A, G, M>, payload: A[K]) => any
  }

  interface TsStore extends Store<RootState> {
    getters: RootGetters
    commit: TsCommit<RootMutations>
    dispatch: TsDispatch<RootActions>
  }

  type storeContext = TsActionContext<
    RootState,
    RootActions,
    RootGetters,
    RootMutations
  >
}
