import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import VButton from '~/components/atoms/VButton/VButton'
import VButtonLink from '~/components/atoms/VButton/VButtonLink'
import VHeadings from '~/components/atoms/VHeadings'
import VTexts from '~/components/atoms/VTexts'
import VList from '~/components/atoms/VList'
import VInputText from '~/components/atoms/VInputText'
import VInputRadio from '~/components/atoms/VInputRadio'
import VInputCheckbox from '~/components/atoms/VInputCheckbox'
import VTextarea from '~/components/atoms/VTextarea'
import VSelect from '~/components/atoms/VSelect'
import VIconClose from '~/components/atoms/VIcon/VIconClose'

storiesOf('Atoms', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
      }
    }
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
      `
    }
  })
  .add('VTexts', () => {
    const texts = text('テキスト', 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、\nうつくしい森で飾られたモリーオ市。')
    const appearance = select('見た目', {
      '通常': '',
      'エラー': 'error'
    }, '')

    return {
      components: { VTexts },
      template: `<VTexts text="${texts}" ${appearance} />`
    }
  })
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
      }
    }
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
        <VInputText :value="value"
                    type="${type}"
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
                     :checked-value="value"
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
      }
    }
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
      }
    }
  })
  .add('VTextarea', () => {
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VTextarea },
      template: `
        <VTextarea :value="value"
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
                 :value="value"
                 :options="options"
                 ${error === 'true' ? 'error' : ''}
                 @change="updateValue" />
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
        }
      }
    }
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
  })
