<template>
  <div class="vTooltip">
    <button
      ref="btn"
      :aria-contols="`balloon-${componentId}`"
      :aria-expanded="String(isVisible)"
      type="button"
      class="vTooltip__btn"
      @click="isVisible = true"
    >
      {{ label }}
    </button>
    <FadeTransition>
      <div v-show="isVisible">
        <VBalloon
          :id="`balloon-${componentId}`"
          ref="content"
          :aria-hidden="String(!isVisible)"
          :tabindex="isVisible ? '0' : '-1'"
          :style="contentStyled"
          class="vTooltip__content"
        >
          <slot />
        </VBalloon>
        <VMask class="vTooltip__mask" transparent @click="isVisible = false" />
      </div>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import uuid from 'uuid'
import { VBalloon, VMask } from '~/components/atoms'
import { FadeTransition } from '~/components/presenter'

type Data = {
  componentId: string
  isVisible: boolean
  contentSize: {
    width: number
    height: number
  }
  btnRect: {
    x: number
    y: number
    width: number
    height: number
  }
}

export default Vue.extend({
  components: { VBalloon, VMask, FadeTransition },
  props: {
    label: { type: String, required: true }
  },
  data(): Data {
    return {
      componentId: uuid.v4(),
      isVisible: false,
      contentSize: {
        width: 0,
        height: 0
      },
      btnRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    contentStyled(): { [key: string]: string } {
      let styles = {}

      styles = Object.assign({}, styles, this.leftPositionStyled)
      styles = Object.assign({}, styles, this.verticalPositionStyled)

      return styles
    },
    basePosition(): { [key: string]: number } {
      return {
        x: this.btnRect.x + this.btnRect.width / 2,
        y: this.btnRect.y
      }
    },
    leftPositionStyled(): { [key: string]: string } {
      const styles: { [key: string]: string } = {}

      if (this.basePosition.x - this.contentSize.width / 2 > 0) {
        if (
          this.basePosition.x + this.contentSize.width / 2 >
          this.windowWidth
        ) {
          const position =
            this.windowWidth - this.contentSize.width - this.btnRect.x
          styles.left = `${position}px`
        } else {
          styles.left = '50%'
          styles.transform = 'translateX(-50%)'
        }
      } else {
        styles.left = `-${this.btnRect.x}px`
      }

      return styles
    },
    verticalPositionStyled(): { [key: string]: string } {
      const styles: { [key: string]: string } = {}

      if (this.basePosition.y - this.contentSize.height - 14 > 0) {
        styles.top = `-${this.contentSize.height + 14}px`
      } else {
        styles.top = 'calc(100% + 14px)'
      }

      return styles
    }
  },
  watch: {
    isVisible(newValue) {
      this.$nextTick(() => {
        this.updateFocus(newValue)
      })
    }
  },
  methods: {
    handleEscKey(e) {
      if (e.keyCode !== 27) return
      e.preventDefault()
      this.isVisible = false
    },
    isElement(el: any): el is Element {
      return el instanceof Element
    },
    updateFocus(visible: boolean) {
      if (visible) {
        this.updatePositionData()
        ;((this.$refs.content as Vue).$el as HTMLElement).focus()
      } else if (this.isElement(this.$refs.btn)) {
        ;(this.$refs.btn as HTMLElement).focus()
      }
    },
    updatePositionData() {
      if (!this.$refs.btn || !this.$refs.content) return false
      if (
        !this.isElement(this.$refs.btn) ||
        !(this.$refs.content instanceof Vue)
      ) {
        return false
      }

      const btnRect: ClientRect = this.$refs.btn.getBoundingClientRect()
      this.contentSize.width = (this.$refs.content as Vue).$el.clientWidth
      this.contentSize.height = (this.$refs.content as Vue).$el.clientHeight
      this.btnRect.x = (btnRect as DOMRect).x
      this.btnRect.y = (btnRect as DOMRect).y
      this.btnRect.width = btnRect.width
      this.btnRect.height = btnRect.height
    }
  }
})
</script>

<style lang="scss" scoped>
.vTooltip {
  position: relative;
  display: inline-block;
}

.vTooltip__content {
  position: absolute;
  z-index: 11;
  transition: left 0.3s $easing;
  white-space: pre;
}

.vTooltip__btn {
  display: inline-block;
  border-radius: 2px;
  background: $color-base;
  font-weight: bold;
  line-height: 1;
  color: #fff;

  @include media-min {
    padding: 5px;
    font-size: 1.4rem;
  }

  @include media-max {
    padding: 3px;
    font-size: 1.5rem;
  }
}

.vTooltip__text {
  white-space: nowrap;
}

.vTooltip__mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>
