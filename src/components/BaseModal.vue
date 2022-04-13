<template>
  <transition name="backdrop">
    <div class="backdrop" v-if="open" @click="close"></div>
  </transition>
  <transition name="modal">
    <div class="dialog" v-if="open" @click="close">
      <dialog open>
        <slot></slot>
        <div class="buttons" v-if="buttons">
          <slot name="buttons"></slot>
          <button @click="close" v-if="hasCloseButton" class="close">Tanca</button>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['open', 'buttons'],
  emits: ['close'],
  setup (props, context) {
    const close = function (event) {
      if (event.target.classList.contains('close') || event.target.classList.contains('dialog')) {
        context.emit('close')
      }
    }
    const hasCloseButton = computed(() => {
      return props.buttons && props.buttons.split(',').includes('close')
    })
    return {
      close,
      hasCloseButton
    }
  }
}
</script>

<style scoped lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2001;
  }
  dialog {
    max-width: 80vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0px;
    background-color: white;
    z-index: 2001;
    border: none;
    text-align: center;
    font-weight: bold;
    color: $primary;
  }
  .backdrop-enter-from,
  .backdrop-leave-to {
    opacity: 0;
  }
  .backdrop-enter-active,
  .backdrop-leave-active {
    transition: all .25s ease-in;
  }
  .modal-enter-from {
    opacity: 0;
    top: -5vh;
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: all .25s ease-in;
  }
  .modal-leave-to {
    opacity: 0;
    top: 5vh;
  }
  :deep(button) {
    background: $seco;
    border: none;
    color: $primary;
    border: 1px solid $primary;
    text-transform: uppercase;
    padding: 15px 50px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1.5em;
  }
  :deep(button):hover {
    background: $primary;
    color: $seco;
  }
</style>
