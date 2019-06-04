export type Option = {
  id: string | number
  label: string
  value?: string | number
}

export type ListItem = {
  id: string | number
  label: string
}

export type ValidatePattern = {
  regex?: RegExp
  message: string
}
