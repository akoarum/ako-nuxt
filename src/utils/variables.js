export const VALIDATES = {
  required: '入力してください。',
  selected: '選択してください。',
  file: 'ファイルをアップロードしてください。',
  tel: {
    regex: /^\d{2,4}-?\d{4}-?\d{4}$/,
    message: '電話番号は半角数字とハイフンで入力してください。'
  },
  email: {
    regex: /^[-a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)*\.[a-zA-Z]{2,6}$/,
    message: 'メールアドレスを正しく入力してください。'
  }
}
