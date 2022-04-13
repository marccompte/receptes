<template>
  <form @submit.prevent="login" method="post" v-if="!userIsAdmin">
    <base-spinner class="spinner" v-if="isLoggingIn"/>
    <div class="errors" v-if="loginErrors">{{ loginErrors }}</div>
    <div class="field">
      <q-input filled v-model="username" label="Usuari" name="username" id="username" />
    </div>
    <div class="field">
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Contrassenya">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <button>Valida</button>
  </form>
  <form @submit.prevent="logout" method="post" v-if="userIsAdmin">
    <base-spinner class="spinner" v-if="isLoggingIn"/>
    <div class="errors" v-if="loginErrors">{{ loginErrors }}</div>
    <div class="field">
      Ja estàs identificat com a administrador.
    </div>
    <button>Tanca la sessió</button>
  </form>
</template>

<script>
import { computed, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import BaseSpinner from './BaseSpinner.vue'

export default {
  name: 'LoginForm',
  components: { BaseSpinner },
  setup () {
    const $store = useRecipeStore()
    const loginErrors = computed(() => $store.errors.login)
    const username = ref()
    const password = ref()
    const isLoggingIn = computed(() => $store.isLoggingIn)
    const userIsAdmin = computed(() => $store.userIsAdmin)

    const login = () => {
      $store.isLoggingIn = true
      $store.errors.login = ''
      $store.worker.postMessage({
        type: 'login',
        data: {
          username: username.value,
          password: password.value
        }
      })
    }

    const logout = () => {
      $store.userIsAdmin = false
    }

    const showLoginForm = () => {
      $store.modals.login = true
    }

    const hideLoginForm = () => {
      $store.modals.login = false
    }

    return {
      hideLoginForm,
      isLoggingIn,
      isPwd: ref(true),
      login,
      logout,
      loginErrors,
      showLoginForm,
      password,
      userIsAdmin,
      username
    }
  }
}
</script>

<style scoped lang="scss">
  .errors {
    color: red
  }
  form .errors {
    padding-bottom: 20px;
  }
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

  form {
    padding: 40px;
    position: relative;
  }
  form .spinner {
    position: absolute;
    background: $seco;
    opacity: .7;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1;
  }
  .field {
    margin-bottom: 20px;
  }
  .field:last-child {
    margin: 0px;
  }
</style>
