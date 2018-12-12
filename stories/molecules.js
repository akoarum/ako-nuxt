import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import FormInputText from '~/components/molecules/FormInputText'
import FormInputRadio from '~/components/molecules/FormInputRadio'
import FormInputCheckbox from '~/components/molecules/FormInputCheckbox'
import FormSelect from '~/components/molecules/FormSelect'
import FormTextarea from '~/components/molecules/FormTextarea'
import Modal from '~/components/molecules/Modal'
import Tab from '~/components/molecules/Tab'

storiesOf('Molecules', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .addDecorator(StoryRouter({}))
  .add('FormInputText', () => {
    const type = select('Type', {
      'text': 'text',
      'number': 'number',
      'email': 'email',
      'tel': 'tel',
      'url': 'url'
    }, 'text')
    const required = select('Required', {
      'false': '',
      'true': 'required'
    }, '')

    return {
      components: { FormInputText },
      template: `
        <FormInputText v-model="value"
                       type="${type}"
                       name="test"
                       ${required}
                       @error="errorHandler" />
      `,
      data() {
        return {
          value: '',
          error: false,
        }
      },
      methods: {
        errorHandler({ error }) {
          this.error = error
          this.errorAction(error)
        },
        errorAction: action('error')
      }
    }
  }, {
    notes: `
      typeに合わせてバリデーションが実行されます。requiredが設定されている場合は入力チェックを行います。
      errorの発生や消去のタイミングでそれぞれ error イベントが発火します。
    `
  })
  .add('FormInputRadio', () => {
    return {
      components: { FormInputRadio },
      template: `
        <FormInputRadio v-model="value"
                        name="test"
                        :items="items"
                        @change="changeHandler"
                        @error="errorHandler" />
      `,
      data() {
        return {
          items: [
            { id: 1, display: 'テスト1', value: 'test1' },
            { id: 2, display: 'テスト2', value: 'test2' },
            { id: 3, display: 'テスト3', value: 'test3' }
          ],
          value: ''
        }
      },
      methods: {
        changeHandler: action('change'),
        errorHandler: action('error')
      },
      propsDescription: {
        items: '型はNOTES参照'
      }
    }
  }, {
    notes: `
      errorの発生や消去のタイミングでそれぞれ error イベントが発火します。

      items配列のインタフェース
      ==
      {
      --id: number（一意のID）
      --display: string（表示用テキスト）
      --value: string（実際の値）
      }
    `
  })
  .add('FormInputCheckbox', () => {
    const required = select('Required', {
      'false': '',
      'true': 'required'
    }, '')
    return {
      components: { FormInputCheckbox },
      template: `
        <FormInputCheckbox v-model="value"
                           :items="items"
                           name="test"
                           ${ required }
                           @change="changeHandler"
                           @error="errorHandler" />
      `,
      data() {
        return {
          value: [],
          items: [
            { id: 1, display: '項目1', value: 'test1' },
            { id: 2, display: '項目2', value: 'test2' },
            { id: 3, display: '項目3', value: 'test3' }
          ]
        }
      },
      methods: {
        changeHandler: action('change'),
        errorHandler: action('error')
      },
      propsDescription: {
        items: '型はNOTES参照'
      }
    }
  }, {
    notes: `
      required設定していて全てのチェックを外すとエラーを発生させます。
      errorの発生や消去のタイミングでそれぞれ error イベントが発火します。

      items配列のインタフェース
      ==
      {
      --id: number（一意のID）
      --display: string（表示用テキスト）
      --value: string（実際の値）
      }
    `
  })
  .add('FormSelect', () => {
    const required = select('Required', {
      'false': '',
      'true': 'required'
    }, '')
    return {
      components: { FormSelect },
      template: `
        <FormSelect v-model="value"
                    :options="options"
                    name="test"
                    ${required}
                    @error="errorHandler"
                    @change="changeHandler" />
      `,
      data() {
        return {
          value: '',
          options: [
            { id: 1, display: '項目1', value: 'test1' },
            { id: 2, display: '項目2', value: 'test2' },
            { id: 3, display: '項目3', value: 'test3' }
          ]
        }
      },
      methods: {
        errorHandler: action('error'),
        changeHandler: action('change')
      },
      propsDescription: {
        options: '型はNOTES参照'
      }
    }
  }, {
    notes: `
      required設定していて一度開き、選択せずに閉じるとエラーを発生させます。
      errorの発生や消去のタイミングでそれぞれ error イベントが発火します。

      options配列のインタフェース
      ==
      {
      --id: number（一意のID）
      --display: string（表示用テキスト）
      --value: string（実際の値）
      }
    `
  })
  .add('FormTextarea', () => {
    const required = select('Required', {
      'false': '',
      'true': 'required'
    }, '')

    return {
      components: { FormTextarea },
      template: `
        <FormTextarea v-model="value"
                      name="name"
                      ${required}
                      @error="errorHandler" />
      `,
      data() {
        return {
          value: '',
          error: false
        }
      },
      methods: {
        errorHandler({ error }) {
          this.error = error
          this.errorAction(error)
        },
        errorAction: action('error')
      }
    }
  }, {
    notes: `
      requiredが設定されている場合は入力チェックを行います。
      errorの発生や消去のタイミングでそれぞれ error イベントが発火します。
    `
  })
  .add('Modal', () => {
    return {
      components: { Modal },
      template: `
        <div>
          <button type="button" @click="open = true">Open</button>
          <Modal :is-open="open" @close="open = false">
            テスト
          </Modal>
        </div>
      `,
      data() {
        return {
          open: false
        }
      }
    }
  }, {
    notes: `
      モーダルです。
      モーダル自体の開閉のステータスは親で持つ必要があります。
    `
  })
  .add('Tab', () => {
    return {
      components: { Tab },
      template: `
        <Tab :tabs="tabs">
          <div>Item1</div>
          <div>Item2</div>
          <div>Item3</div>
        </Tab>
      `,
      data() {
        return {
          tabs: [
            { id: '1', display: 'Item1' },
            { id: '2', display: 'Item2' },
            { id: '3', display: 'Item3' }
          ]
        }
      }
    }
  }, {
    notes: `
      タブUIです。
      slotに並べる要素は必ずdivなどで囲んでください。

      tabs配列のインタフェース
      ==
      {
      --id: string（一意のID。ただし文字列）
      --display: string（表示するテキスト）
      }
    `
  })
