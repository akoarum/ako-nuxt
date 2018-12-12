import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import VButton from '~/components/atoms/VButton/VButton'
import VButtonLink from '~/components/atoms/VButton/VButtonLink'
import VHeadings from '~/components/atoms/VHeadings'
import VTexts from '~/components/atoms/VTexts'
import VDate from '~/components/atoms/VDate'
import VList from '~/components/atoms/VList'
import VInputText from '~/components/atoms/VInputText'
import VInputRadio from '~/components/atoms/VInputRadio'
import VInputCheckbox from '~/components/atoms/VInputCheckbox'
import VTextarea from '~/components/atoms/VTextarea'
import VSelect from '~/components/atoms/VSelect'
import VIconClose from '~/components/atoms/VIcon/VIconClose'
import VContent from '~/components/atoms/VContent'
import VTable from '~/components/atoms/VTable'
import VTabs from '~/components/atoms/VTabs'

storiesOf('Atoms', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .addDecorator(StoryRouter({}))
  .add('VButton', () => {
    const label = text('ラベル', 'ボタン')
    const disabled = select('活性 / 非活性', {
        'false': 'false',
        'true': 'true'
    }, 'false')
    const color = select('カラー', {
      'default': '',
      'primary': 'primary',
      'secondary': 'secondary'
    }, '')
    const size = select('サイズ', {
      'medium': '',
      'small': 'small'
    }, '')

    return {
      components: { VButton },
      template: `
        <VButton label="${label}" ${color} ${size} ${disabled === 'true' ? 'disabled': ''} @click="action" />
      `,
      methods: {
        action: action('action')
      },
    }
  }, {
    notes: `
      リンクとして使用する場合はVButtonLinkを使用してください。
      カラーとサイズは下記のものを属性で指定してください。指定しない場合はデフォルトのスタイルになります。
      color: primary / secondary
      size: small
    `
  })
  .add('VButtonLink', () => {
    const label = text('ラベル', 'ボタン')
    const color = select('カラー', {
      'default': '',
      'primary': 'primary',
      'secondary': 'secondary'
    }, '')
    const size = select('サイズ', {
      'medium': '',
      'small': 'small'
    }, '')

    return {
      components: { VButtonLink },
      template: `
        <VButtonLink to="/" label="${label}" ${color} ${size} />
      `
    }
  }, {
    notes: `
      VButtonのリンク版です。
      カラーとサイズは下記のものを属性で渡してください。
      color: primary, secondary（指定しない場合はデフォルトのスタイルになります）
      size: small（指定しない場合はデフォルトのスタイルになります）
    `
  })
  .add('VHeadings', () => {
    const level = select('レベル', {
      '2': '2',
      '3': '3',
      '4': '4'
    }, '2')
    const visual = select('見た目レベル', {
      '2': '2',
      '3': '3',
      '4': '4'
    }, '2')
    const texts = text('テキスト', 'あのイーハトーヴォのすきとおった風')

    return {
      components: { VHeadings },
      template: `
        <VHeadings :level="${Number(level)}" :visual-level="${Number(visual)}" text="${texts}" />
      `,
      propsDescription: {
        level: 'HTMLの要素としてのレベル',
        visualLevel: '見た目（デザイン）上のレベル'
      }
    }
  }, {
    notes: `
      HTMLの要素としてのレベルと見た目のレベルをそれぞれ2〜4の3段階で、別々に設定できます。
      HTMLのレベルは見た目にとらわれず、コンテキストに合わせて適切なレベルを指定してください。
    `
  })
  .add('VTexts', () => {
    const texts = text('テキスト', 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、\nうつくしい森で飾られたモリーオ市。')
    const appearance = select('見た目', {
      '通常': '',
      'エラー': 'error'
    }, '')

    return {
      components: { VTexts },
      template: `<VTexts text="${texts}" ${appearance} />`,
      propsDescription: {
        error: 'エラー文の場合に付与'
      }
    }
  })
  .add('VDate', () => ({
    components: { VDate },
    template: `<VDate date="2018-12-01" />`,
    propsDescription: {
      date: 'YYYY-MM-DDの形式'
    }
  }))
  .add('VList', () => {
    const tag = select('タグ', {
      'ul': 'ul',
      'ol': 'ol'
    }, 'ul')
    const visual = select('見た目', {
      'ビュレット': 'bullet',
      '数字': 'number'
    }, 'bullet')

    return {
      components: { VList },
      template: `<VList :items="items" tag="${tag}" visual="${visual}" />`,
      data() {
        return {
          items: ['項目1', '項目2', '項目3']
        }
      },
      propsDescription: {
        tag: 'HTMLの要素の指定。ul / ol',
        visual: '見た目の指定。bullet / number',
        items: 'String[]'
      }
    }
  }, {
    notes: `
      HTMLのulもしくはol要素です。
      tag属性で適切な要素を指定してください。見た目はvisual属性で変更できます。
    `
  })
  .add('VInputText', () => {
    const type = select('TYPE', {
      'text': 'text',
      'number': 'number',
      'email': 'email',
      'tel': 'tel'
    }, 'text')
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VInputText },
      template: `
        <VInputText v-model="value"
                    type="${type}"
                    name="test"
                    ${error === 'true' ? 'error' : ''}
                    @focus="focusHandler"
                    @blur="blurHandler"
                    @input="inputHandler"
                    @dirty="dirtyHandler" />`,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focusHandler: action('focus'),
        blurHandler: action('blur'),
        inputHandler: action('input'),
        dirtyHandler: action('dirty')
      },
      propsDescription: {
        type: 'input要素としてのtype属性値'
      }
    }
  }, {
    notes: `
      テキストボックス系のフォームパーツコンポーネント。バリデーション機能が必要な場合はmolecules/FormInputTextを使用してください。
      フォーカス、フォーカスアウト、入力時、初めて入力してフォーカスアウトした時（dirty）にイベントが発火します。
      value属性は v-model として渡すことも可能です。
    `
  })
  .add('VInputRadio', () => {
    const defaultChecked = select('初期チェック', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VInputRadio },
      template: `
        <VInputRadio name="test"
                     value="test-value"
                     label="テスト"
                     :checked="value"
                     ${error === 'true' ? 'error' : ''}
                     @change="changeHandler" />
      `,
      data() {
        return {
          value: defaultChecked === 'true' ? 'test-value' : ''
        }
      },
      methods: {
        changeHandler(value) {
          this.value = value
          this.action(value)
        },
        action: action('change')
      },
      propsDescription: {
        checked: 'チェックされている値'
      }
    }
  }, {
    notes: `
      チェック済みの値は checked 属性に渡します。
      v-modelは使用不可です。
    `
  })
  .add('VInputCheckbox', () => {
    const defaultChecked = select('初期チェック', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VInputCheckbox },
      template: `
        <VInputCheckbox name="test"
                        value="test-value"
                        label="テスト"
                        :checked="checked"
                        ${error === 'true' ? 'error' : ''}
                        @change="changeHandler" />
      `,
      data() {
        return {
          checked: defaultChecked === 'true' ? ['test-value'] : []
        }
      },
      methods: {
        changeHandler({ value, checked }) {
          if (checked) {
            this.checked = this.checked.concat([value])
          } else {
            this.checked = this.checked.filter(item => value !== item)
          }

          this.action({ value, checked })
        },
        action: action('change')
      },
      propsDescription: {
        checked: 'チェックされている値'
      }
    }
  }, {
    notes: `
      チェック済みの値は checked 属性に渡します。
      v-modelは使用不可です。
    `
  })
  .add('VTextarea', () => {
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VTextarea },
      template: `
        <VTextarea v-model="value"
                   name="test"
                   id="test-input"
                   ${error === 'true' ? 'error' : ''}
                   @focus="focusHandler"
                   @blur="blurHandler"
                   @input="inputHandler"
                   @dirty="dirtyHandler" />`,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focusHandler: action('focus'),
        blurHandler: action('blur'),
        inputHandler: action('input'),
        dirtyHandler: action('dirty')
      }
    }
  }, {
    notes: `
      バリデーション機能が必要な場合はmolecules/FormInputTextを使用してください。
      フォーカス、フォーカスアウト、入力時、初めて入力してフォーカスアウトした時（dirty）にイベントが発火します。
      value属性は v-model として渡すことも可能です。
    `
  })
  .add('VSelect', () => {
    const defaultValue = select('初期値', {
      'なし': '',
      '項目1': '1'
    }, '')
    const error = select('エラー', {
      'false': 'false',
      'true': 'true'
    }, 'false')

    return {
      components: { VSelect },
      template: `
        <VSelect name="test"
                 v-model="value"
                 :options="options"
                 ${error === 'true' ? 'error' : ''}
                 @change="updateValue"
                 @open="openHandler"
                 @close="closeHandler" />
      `,
      data() {
        return {
          value: defaultValue,
          options: [
            {
              id: 1,
              value: '1',
              display: '項目1'
            },
            {
              id: 2,
              value: '2',
              display: '項目2'
            },
            {
              id: 3,
              value: '3',
              display: '項目3'
            }
          ]
        }
      },
      methods: {
        updateValue(value) {
          this.value = value
          this.changeHandler(value)
        },
        changeHandler: action('change'),
        openHandler: action('open'),
        closeHandler: action('close')
      }
    }
  }, {
    notes: `
      HTMLのselect要素に相当するフォームパーツコンポーネントです。
      optionsの配列は下記のインタフェースのオブジェクトのみ包含できます。
      ==
      {
      --id: number（一意のID）,
      --value: string（実際に使用するvalue値）,
      --display: string（画面上に表示される値）
      }
    `
  })
  .add('VIconClose', () => {
    const color = select('色', {
      'default': '',
      'primary': 'primary',
      'secondary': 'secondary'
    }, '')
    return {
      components: { VIconClose },
      template: `<VIconClose ${color} />`
    }
  }, {
    notes: `
      カラーは下記のいずれかの属性を指定します。指定しない場合はデフォルトカラーで表示されます。
      primary / secondary
    `
  })
  .add('VContent', () => {
    const tag = select('タグ', {
      'div': 'div',
      'section': 'section',
      'article': 'article'
    }, 'div')
    return {
      components: { VContent },
      template: `
        <VContent tag="${ tag }">
          <p>テキストテキスト</p>
        </VContent>
      `,
      propsDescription: {
        tag: 'HTMLの要素を指定します。コンテキストに合わせて、div、section、articleなど使い分けてください。'
      }
    }
  })
  .add('VTable', () => ({
    components: { VTable },
    template: `
      <VTable :headers="headers" :widths="widths">
        <tr v-for="item in items" :key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.gender }}</td>
        </tr>
      </VTable>
    `,
    data() {
      return {
        headers: [
          { id: 1, display: 'No.', align: 'left' },
          { id: 2, display: 'Name' },
          { id: 3, display: 'Age' },
          { id: 4, display: 'Gender' }
        ],
        widths: ['6%', '54%', '15%', '25%'],
        items: [
          { id: 1, name: 'Test Taro', age: 28, gender: 'Male' },
          { id: 2, name: 'Test Tesuko', age: 46, gender: 'Female' },
          { id: 3, name: 'Test Tesuo', age: 30, gender: 'Male' },
          { id: 4, name: 'Spec Speco', age: 22, gender: 'Female' }
        ]
      }
    },
    propsDescription: {
      widths: 'String[]: 各列の幅をパーセントで指定',
      headers: '型はNOTES参照'
    }
  }), {
    notes: `
      headersの配列は下記のインタフェースのオブジェクトのみ包含できます。
      ==
      {
      --id: number（一意のID）
      --display: string（表示する文字列）
      --align: string（テキストの水平方向位置揃え。 default は center）
      --vertical: string（テキストの垂直方向位置揃え。default は middle）
      }
    `
  })
  .add('VTabs', () => {
    const current = select('Current', {
      '1': '1',
      '2': '2',
      '3': '3'
    }, '1')

    return {
      components: { VTabs },
      template: `
        <VTabs :tabs="tabs"
              :current="current"
              :id="id"
              @update="updateHandler" />
      `,
      data() {
        return {
          tabs: [
            { id: '1', display: 'Item1' },
            { id: '2', display: 'Item2' },
            { id: '3', display: 'Item3' }
          ],
          current,
          id: 1
        }
      },
      methods: {
        updateHandler: action('update')
      },
      propsDescription: {
        id: '属するコンポーネントのVueコンポーネントとしてのID',
        current: '現在選択されているタブのID',
        tabs: 'タブ配列。型はNOTES参照'
      }
    }
  }, {
    notes: `
      tabsの配列は下記のインタフェースのオブジェクトのみ包含できます。
      ==
      {
      --id: string（一意のID。ただし文字列）
      --display: string（表示するテキスト）
      }
    `
  })
