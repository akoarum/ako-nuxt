import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import FormInputText from '~/components/molecules/FormInputText'
import FormInputRadio from '~/components/molecules/FormInputRadio'
import FormTextarea from '~/components/molecules/FormTextarea'

storiesOf('Molecules', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
  })
  .add('FormInputRadio', () => {
    return {
      components: { FormInputRadio },
      template: `
        <FormInputRadio v-model="value"
                        name="test"
                        :items="items"
                        @change="changeHandler" />
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
        changeHandler: action('change')
      }
    }
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
  })
