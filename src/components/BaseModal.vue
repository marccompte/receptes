<template>
  <transition name="backdrop">
    <div class="backdrop" v-if="open" @click="close"></div>
  </transition>
  <transition name="modal">
    <div class="dialog" v-if="open" @click="close">
      <dialog open>
        <slot></slot>
        <div class="buttons">
          <slot name="buttons"></slot>
          <button @click="close" v-if="hasCloseButton" class="close">Tanca</button>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default {
  props: ['open', 'buttons'],
  emits: ['close'],
  setup (props) {
    const $store = useRecipeStore()
    const close = function () {
      $store.bonProfit = false
    }
    const hasCloseButton = computed(() => {
      return props.buttons && props.buttons.split(',').includes('close')
    })
    // const _ = function (text) {
    //   return $store.getters['app/getText'](text)
    // }
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
  text-shadow: 2px 2px  5px $primary;
  padding: 3rem 5rem 3rem 5rem;
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
button {
  background: $primary;
  border: none;
  color: white;
  text-transform: uppercase;
  padding: 15px 50px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: $primary;
  color: $accent;
}
button.close {
  // float: right;
}
</style>
