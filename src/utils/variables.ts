import { ValidatePattern } from '~/types/models'

export const VALIDATE_PATTERNS: { [key: string]: ValidatePattern } = {
  required: {
    message: '入力してください。'
  },
  selected: {
    message: '選択してください。'
  },
  tel: {
    regex: /^\d{2,5}-?\d{1,4}-?\d{4}$/,
    message: '電話番号は半角数字とハイフンで入力してください。'
  },
  email: {
    regex: /^[-a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)*\.[a-zA-Z]{2,6}$/,
    message: 'メールアドレスを正しく入力してください。'
  }
}
