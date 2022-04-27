<template>
  <q-page class="row">
    <q-toolbar class="bg-white text-primary">
      <q-toolbar-title>
        Ingredients
        <span class="float-right size" v-if="currentRecipe.size">Per {{ currentRecipe.size.toLowerCase() }}</span>
      </q-toolbar-title>
      <p class="caption">Prem un ingredient per marcar-lo com a fet.</p>
    </q-toolbar>
    <div class="flex justify-center q-col-gutter-xs">
      <ingredient-card
        v-for="ing in currentRecipe.ing"
        :ing="ing"
        :key="ing.key"
        :class="{ done: ing.done }"
        @click="toggleIngredient(ing)"
        />
    </div>

    <q-toolbar class="bg-white text-primary">
      <q-toolbar-title>Elaboració</q-toolbar-title>
      <p class="caption">Prem un pas per marcar-lo com a fet.</p>
    </q-toolbar>
    <q-list separator>
      <q-item
        clickable
        v-ripple
        v-for="(stp, index) in currentRecipe.stp"
        :key="stp.key"
        :class="{ done: stp.done }"
        @click="toggleStep(stp)"
        >
        <q-item-section>
          <q-item-label overline>Pas {{ index + 1 }}</q-item-label>
          <q-item-label>{{ stp.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <base-modal :open="bonProfit" buttons="close" @close="closeModal">
      <template v-slot:default>
        <h1>Bon profit!</h1>
        <p>Has trigat {{ duration }} <span v-if="duration !== 1">minuts</span><span v-if="duration === 1">minut</span></p>
      </template>
    </base-modal>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import { Ingredient, Step } from '../stores/models'
import BaseModal from '../components/BaseModal.vue'
import IngredientCard from '../components/IngredientCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    BaseModal,
    IngredientCard
  },
  setup () {
    const $store = useRecipeStore()
    let start: number
    const currentRecipe = computed(() => {
      if ($store.currentRecipe) {
        return $store.currentRecipe
      } else {
        return ''
      }
    })
    const closeModal = function () {
      $store.bonProfit = false
    }
    const toggleIngredient = async (ing: Ingredient) => {
      if ($store.currentRecipe) {
        $store.currentRecipe.ing[ing.key].done = !$store.currentRecipe.ing[ing.key].done
      }
    }
    const toggleStep = async (stp: Step) => {
      if ($store.currentRecipe) {
        $store.currentRecipe.stp[stp.key].done = !$store.currentRecipe.stp[stp.key].done
      }
      const missing = $store.currentRecipe.stp.find((stp: Step) => !stp.done)
      if (!missing) {
        const seconds = ((new Date()).getTime() - start) / (1000)
        $store.duration = seconds / 60
        $store.bonProfit = true
      }
    }
    const bonProfit = computed(() => $store.bonProfit)
    onMounted(() => {
      start = (new Date()).getTime()
    })
    const duration = computed(() => {
      return $store.duration
    })
    return {
      bonProfit,
      closeModal,
      currentRecipe,
      duration,
      toggleStep,
      toggleIngredient
    }
  }
})
</script>

<style scoped lang="scss">
  .q-page {
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .q-item {
    padding: 15px;
    min-width: 100%;
    max-height: 200px;
    overflow: auto;
    background: $seco;
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  }
  .q-card.done {
    height: 39px;
    transition: all .3s ease-in;
  }
  .q-item.done {
    max-height: 39px;
    overflow: hidden;
  }
  .q-card.done,
  .q-item.done {
    background: white;
    color: #cacaca;
    text-decoration: line-through;
    transition: all .3s ease-in;
  }
  .q-item.done::after {
    height: 48px;
    line-height: 48px;
    font-size: 2em;
  }
  .done::after {
    content: 'fet';
    color: white;
    background: $accent;
    padding: 2px 10px;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 40px;
    line-height: 40px;
    font-size: .8em;
    transition: all .3s ease-in;
  }
  .q-toolbar .caption {
    color: rgba(0, 0, 0, 0.54);
  }
  .q-item.done .text-overline,
  .q-card.done .text-caption {
    color: #cacaca;
    text-decoration: line-through;
    transition: all .3s ease-in;
  }
  .q-toolbar {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  .q-toolbar__title {
    border-bottom: 2px solid $primary;
    margin: 40px 0px 0px;
  }
  .end {
    width: 100%;
  }
  .end .h6 {
    margin-bottom: 100px;
  }
  .q-card {
    padding: 10px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 200px;
    background: $seco;
    margin: 10px;
    overflow: hidden;
    float: left;
    text-align: center;
    font-size: 1.3rem;
    color: $primary;
    cursor: pointer;
    transition: all .3s ease-out;
  }
  .q-card .text-caption {
    font-size: .8rem;
    color: $primary;
    transition: all .3s ease-out;
  }
  .q-list {
    margin: 20px;
    width: calc(100% - 40px);
    transition: all .3s ease-in;
  }
  .text-overline {
    text-transform: uppercase;
    font-size: 1.2em;
    margin-bottom: 10px;
    transition: all .3s ease-in;
  }
</style>
