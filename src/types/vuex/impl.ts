import 'vuex'
import * as Auth from '~/store/auth/type'

declare module 'vuex' {
  type RootState = {
    auth: Auth.S
  }
  type RootGetters = Auth.RG
  type RootMutations = Auth.RM
  type RootActions = Auth.RA
}
