export const VALIDATES = {
  EMPTY: {
    message: '入力してください。'
  },
  NUMBER: {
    regex: /^[0-9]+?$/,
    message: '数字で入力してください。'
  },
  EMAIL: {
    regex: /^[-a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)*\.[a-zA-Z]{2,6}$/,
    message: 'メールアドレスの形式になっていません。'
  },
  TEL: {
    regex: /^[0-9]{2,4}-?[0-9]{2,4}-?[0-9]{4}$/,
    message: '電話番号の形式になっていません。'
  },
  URL: {
    regex: /^http(s):\/\/.+?\.+?$/,
    message: 'URLの形式になっていません。'
  }
}
