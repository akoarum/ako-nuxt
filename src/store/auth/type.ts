export interface S {
  token: string
}

export interface A {
  setToken: { token: string }
}

export interface RA {
  'auth/setToken': A['setToken']
}

export interface M {
  setToken: { token: string }
}

export interface RM {
  'auth/setToken': M['setToken']
}

export interface G {
  getToken: string
}

export interface RG {
  'auth/getToken': G['getToken']
}
