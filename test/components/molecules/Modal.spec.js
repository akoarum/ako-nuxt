import { shallowMount } from '@vue/test-utils'
import Modal from '~/components/molecules/Modal'

const wrapperFactory = (propsData = {}) => shallowMount(Modal, {
  propsData: {
    isOpen: false,
    ...propsData
  }
})

describe('Modal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it('[methods] closeModal: close を emit する', () => {
    wrapper.vm.closeModal()
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('[methods] keyupHandler: keyCode が 27 なら closeModal メソッドを実行する', () => {
    const mock = jest.fn()
    wrapper.setMethods({ closeModal: mock })

    wrapper.vm.keyupHandler({ keyCode: 13 })
    expect(mock).not.toHaveBeenCalled()

    wrapper.vm.keyupHandler({ keyCode: 27 })
    expect(mock).toHaveBeenCalled()
  })
})
