import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'
import FormTextarea from '~/components/molecules/FormTextarea'
import FormInput from '~/components/molecules/FormInput'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('FormInput', () => {
    const type = select('type', {
      text: 'text',
      number: 'number',
      tel: 'tel',
      email: 'email',
      password: 'password'
    }, 'text')

    return {
      components: { FormInput },
      props: {
        type: { default: type }
      },
      template: `
        <FormInput
          v-model="value"
          name="name"
          :type="type"
          @focus="focus"
          @input="input"
          @blur="blur"
          @dirty="dirty"
          @error="error"
        />
      `,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focus: action('focus'),
        input: action('input'),
        blur: action('blur'),
        dirty: action('dirty'),
        error: action('error')
      }
    }
  }, { info: {} })
  .add('FormTextarea', () => ({
    components: { FormTextarea },
    template: `
      <FormTextarea
        v-model="value"
        name="test"
        required
        @focus="focus"
        @input="input"
        @blur="blur"
        @dirty="dirty"
        @error="error"
      />
    `,
    data() {
      return {
        value: ''
      }
    },
    methods: {
      focus: action('focus'),
      input: action('input'),
      blur: action('blur'),
      dirty: action('dirty'),
      error: action('error')
    }
  }), { info: {} })
