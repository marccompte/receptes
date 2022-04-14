<template>
  <form @submit.prevent="save" method="post" v-if="userIsAdmin">
    <base-spinner class="spinner" v-if="isSaving"/>
    <div class="errors" v-if="errors">{{ errors }}</div>

      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
      >
        <q-tab class="text-primary" name="desc" icon="menu" label="Descripció" />
        <q-tab class="text-primary" name="alarms" icon="kitchen" label="Ingredients" />
        <q-tab class="text-primary" name="movies" icon="blender" label="Elaboració" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="desc">
          <div class="field">
            <q-select
              filled
              required
              :rules="[required]"
              :fill-input="true"
              v-model="category"
              for="category"
              use-input
              use-chips
              input-debounce="0"
              label="Categoria"
              :options="categories"
              @filter="filterCategories"
              new-value-mode="add-unique"
              hint="Per afegir una nova categoria, escriu-la i prem <Enter>."
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No s'ha trobat aquesta categoria
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="field">
            <q-select
              filled
              :fill-input="true"
              for="subcategory"
              use-input
              use-chips
              input-debounce="0"
              new-value-mode="add-unique"
              v-model="subcategory"
              label="Sub-categoria"
              :options="subcategories"
              @filter="filterSubCategories"
              hint="Per afegir una nova sub-categoria, escriu-la i prem <Enter>."
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No s'ha trobat aquesta sub-categoria
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="field">
            <q-input required filled v-model="name" label="Nom" name="name" id="name" />
          </div>
          <div class="field">
            <q-input filled v-model="quantity" label="Quantitats" name="quantity" id="quantity" hint="Exemple: 4 persones, 12 unitats, 2 kg,..." />
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="title">
            Afegeix
          </div>

          <div class="title">
            Llista
          </div>
          <div class="field">
            <ul class="ingredient-list">
              <li v-for="ingredient, index in ingredients" :key="index">{{ ingredient }}</li>
            </ul>
          </div>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="field">
            <q-input filled v-model="steps" label="Elaboració" name="steps" id="steps" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    <button>Desa</button>
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
    const errors = computed(() => $store.errors.recipe)
    const isSaving = ref(false)
    const category = ref()
    const categories = ref($store.categories.map(category => category.name))
    const subcategory = ref()
    const name = ref()
    // const subcategories = ref(['asd', 'dsa'])
    const subcategories = computed(() => {
      if (category.value) {
        const cat = $store.categories.find(cat => cat.name === category.value)
        if (cat) {
          return cat.subs
        }
        return []
      }
      return []
    })
    const userIsAdmin = computed(() => $store.userIsAdmin)
    const required = (val) => {
      console.log(val)
      if (typeof val === 'undefined' || val === null) {
        return 'Aquest camp és obligatori'
      }
    }
    console.log($store.categories)

    const filterCategories = (val, update) => {
      const initialValues = $store.categories.map(category => category.name)
      if (val === '') {
        update(() => {
          categories.value = initialValues
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        categories.value = initialValues.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    const showLoginForm = () => {
      $store.modals.login = true
    }

    const hideLoginForm = () => {
      $store.modals.login = false
    }

    const save = () => {
      console.log('save')
    }

    return {
      categories,
      category,
      filterCategories,
      hideLoginForm,
      isSaving,
      errors,
      name,
      required,
      save,
      showLoginForm,
      subcategories,
      subcategory,
      tab: ref('desc'),
      userIsAdmin
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
  .title {
    text-align: left;
    text-transform: uppercase;
    font-size: 1.4em;
    border-bottom: 2px solid $primary;
    margin-bottom: 20px;
  }
  :deep(.q-chip) {
    padding: 15px;
    display: none;
  }
  :deep(.q-panel) {
    min-height: 60vh;
  }
</style>
