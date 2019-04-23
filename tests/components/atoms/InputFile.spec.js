import { shallowMount } from '@vue/test-utils'
import InputFile from '~/components/atoms/InputFile'

describe('InputFile', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(InputFile, {
      propsData: {
        name: 'test'
      }
    })
  })

  describe('initialized', () => {
    it('mountable', () => {
      expect(wrapper.isVueInstance()).toBe(true)
    })
    it('snapshot', () => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    describe('handleInput', () => {
      it('fileに値があればfileNameに値を追加してemitする', () => {
        const event = {
          target: {
            files: {
              0: { name: 'test' }
            }
          }
        }
        wrapper.vm.handleInput(event)
        expect(wrapper.vm.fileName).toBe('test')
        expect(wrapper.emitted().input).toBeTruthy()
      })

      it('fileに値がなければfileNameを空にする', () => {
        const event = {
          target: {
            files: {}
          }
        }
        wrapper.vm.handleInput(event)
        expect(wrapper.vm.fileName).toBe('')
        expect(wrapper.emitted().input).toBeTruthy()
      })
    })
  })
})
