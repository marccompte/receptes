<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span class="category-title" v-show="title" v-for="part in title" :key="part">{{ part }}</span>
        </q-toolbar-title>

        <div @click="showModal('login')">v2</div>
      </q-toolbar>
    </q-header>

    <left-drawer ref="leftDrawer"/>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <base-modal :open="loginFormVisible" @close="hideModal('login')">
      <template v-slot:default>
        <h4>Identifica't</h4>
        <login-form/>
      </template>
    </base-modal>

    <base-modal :open="recipeFormVisible" @close="hideModal('recipe')">
      <template v-slot:default>
        <h4>Recepta</h4>
        <recipe-form/>
      </template>
    </base-modal>

  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import { ModalTypes } from '../stores/models'
import LeftDrawer from 'components/LeftDrawer.vue'
import BaseModal from 'components/BaseModal.vue'
import LoginForm from 'components/LoginForm.vue'
import RecipeForm from 'components/RecipeForm.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    BaseModal,
    LeftDrawer,
    LoginForm,
    RecipeForm
  },

  setup () {
    const $store = useRecipeStore()
    const $route = useRoute()
    const leftDrawer = ref()
    const loginFormVisible = computed(() => $store.modals.login)
    const recipeFormVisible = computed(() => $store.modals.recipe)

    const showModal = (name: string) => {
      const modals:ModalTypes = $store.modals
      modals[name] = true
    }
    const hideModal = (name: string) => {
      const modals:ModalTypes = $store.modals
      modals[name] = false
    }

    return {
      hideModal,
      leftDrawer,
      loginFormVisible,
      recipeFormVisible,
      showModal,
      toggleLeftDrawer () {
        leftDrawer.value.toggleLeftDrawer()
      },
      title: computed(() => {
        if ($route.path === '/') {
          if ($store.selected.category) {
            return ['Receptes', $store.selected.category]
          } else {
            return ['Receptes']
          }
        } else {
          if ($store.currentRecipe) {
            return [
              $store.currentRecipe.cat,
              $store.currentRecipe.tit.substring(0, 1).toUpperCase() + $store.currentRecipe.tit.substring(1)
            ]
          } else {
            return [$store.selected.category, 'Loading']
          }
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: .6s;
    transition-property: all;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: scale(1.2);
  }
  .category-title::before {
    content: ' - '
  }
  .category-title:first-child::before {
    content: none;
  }
  :deep(dialog) {
    padding: 0px;
    width: 50vh;
  }
  :deep(dialog) h4 {
    margin: 0px;
    padding: 25px;
    background: $seco;
    color: $primary;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>
