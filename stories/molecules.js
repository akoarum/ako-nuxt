import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import FormInputText from '~/components/molecules/FormInputText'

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
