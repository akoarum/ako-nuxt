<template>
  <transition name="modal">
    <div v-show="isOpen" class="modal">
      <div class="modal__content">
        <div ref="start" tabindex="0" @keyup.9.16="$refs.end.focus()" />
        <button
          ref="close"
          type="button"
          class="modal__close"
          @click="closeModal"
        >
          <VIconClose />
        </button>
        <VContent class="modal__inner"><slot /></VContent>
        <div ref="end" tabindex="0" @keyup.9="$refs.start.focus()" />
      </div>
      <div class="modal__mask" @click="closeModal" />
    </div>
  </transition>
</template>

<script>
import VIconClose from '~/components/atoms/VIcon/VIconClose'
import VContent from '~/components/atoms/VContent'

export default {
  components: { VIconClose, VContent },
  props: {
    isOpen: { type: [Boolean], required: true }
  },
  watch: {
    isOpen() {
      setTimeout(() => {
        if (this.isOpen) {
          this.$refs.close.focus()
          window.addEventListener('keyup', this.keyupHandler)
        } else {
          window.removeEventListener('keyup', this.keyupHandler)
        }
      }, 0)
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    keyupHandler(event) {
      if (event.keyCode !== 27) return
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: relative;

  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }
  &__content {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 11;
    transform: translate(-50%, -50%);
  }

  @media screen and (min-width: 768px) {
    &__inner {
      padding: 16px 14px 17px;
    }
  }

  @media screen and (max-width: 767px) {
    &__inner {
      padding: 14px 12px 15px;
    }
  }
}

.modal {
  &-enter-active,
  &-leave-active {
    transition: opacity $transition-duration $transition-easing;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
</style>
