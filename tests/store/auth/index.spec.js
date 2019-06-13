import * as store from '~/store/auth'

describe('auth store', () => {
  it('state', () => {
    expect(store.state()).toEqual({ token: '' })
  })

  describe('actions', () => {
    it('setToken: tokenをcommitする', () => {
      const mockCommit = jest.fn()
      store.actions.setToken({ commit: mockCommit }, { token: 'test' })
      expect(mockCommit).toHaveBeenCalledWith('setToken', { token: 'test' })
    })
  })

  describe('mutations', () => {
    it('setToken: tokenをstateに反映する', () => {
      const state = { token: '' }
      store.mutations.setToken(state, { token: 'test' })
      expect(state.token).toBe('test')
    })
  })

  describe('getters', () => {
    it('getToken: state.tokenを返す', () => {
      const state = { token: 'test' }
      expect(store.getters.getToken(state)).toBe('test')
    })
  })
})
