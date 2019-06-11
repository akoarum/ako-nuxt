<template>
  <transition name="modal" @after-leave="resetContentSize">
    <div v-show="isVisible" class="vModal">
      <div ref="modalBody" :style="innerStyle" class="vModal__inner">
        <button
          ref="close"
          type="button"
          class="vModal__close"
          @click="handleClose"
        >
          <VClose title="閉じる" />
        </button>
        <div :style="contentStyle" class="vModal__content">
          <div ref="start" tabindex="0" @keyup.9.16="$refs.end.focus()" />
          <VContainer class="vModal__contentInner">
            <slot />
          </VContainer>
          <div ref="end" tabindex="0" @keyup.9="$refs.start.focus()" />
        </div>
      </div>
      <VMask class="vModal__mask" @click="handleClose" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { VClose } from '~/components/icons'
import { VContainer, VMask } from '~/components/atoms'

type Data = {
  contentWidth: number
  contentHeight: number
  btnPositionY: number
}

export default Vue.extend({
  components: { VClose, VContainer, VMask },
  props: {
    isVisible: { type: Boolean, required: true },
    margin: { type: Number, default: 20 }
  },
  data(): Data {
    return {
      contentWidth: 0,
      contentHeight: 0,
      btnPositionY: 0
    }
  },
  computed: {
    innerStyle(): { [key: string]: string } {
      const styles: { [key: string]: string } = {}

      if (this.contentHeight > this.windowHeight) {
        styles.top = `${-this.btnPositionY + this.margin}px`
        styles.transform = 'translate(-50%, 0)'
      }

      return styles
    },
    contentStyle(): { [key: string]: string } {
      const styles: { [key: string]: string } = {}

      if (this.contentHeight > this.windowHeight) {
        styles.overflowY = 'scroll'
        styles.height = `${this.windowHeight -
          this.margin * 2 +
          this.btnPositionY}px`
        styles.top = '0'
      }

      return styles
    }
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.updateContentSize()
        })
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    updateContentSize() {
      if (!this.$refs.modalBody || !this.$refs.close) return
      if (
        !(this.$refs.modalBody instanceof Element) ||
        !(this.$refs.close instanceof Element)
      ) {
        return
      }
      this.contentWidth = this.$refs.modalBody.clientWidth
      this.contentHeight = this.$refs.modalBody.clientHeight
      this.btnPositionY = parseFloat(
        window.getComputedStyle(this.$refs.close).top || '0'
      )
    },
    resetContentSize() {
      this.contentWidth = 0
      this.contentHeight = 0
      this.btnPositionY = 0
    }
  }
})
</script>

<style lang="scss" scoped>
.vModal__inner {
  position: fixed;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 100%;
  max-width: 768px;
  z-index: 101;
  transform: translate(-50%, -50%);

  @include media-max {
    padding: 0 12px;
  }
}

.vModal__content {
  --height: auto;
  width: 100%;
  max-width: 768px;
  height: var(--height);
  -webkit-overflow-scrolling: touch;
  z-index: 101;
}

.vModal__close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 32px;
  height: 32px;
  color: #fff;
  z-index: 101;

  @include media-max {
    right: 12px;
  }
}

.vModal__closeIcon {
  width: 24px;
  height: 24px;
}

.vModal__content {
  width: 100%;
}

.vModal__mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.6s $easing;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
