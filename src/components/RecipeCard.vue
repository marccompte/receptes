<template>
  <q-card
    class="my-card text-indigo"
    :data-id="recipe.key"
    :class="{ filtered: recipe.isFiltered }"
    >
    <q-card-section class="title">
      <div class="text-subtitle2">
        <q-icon :name="getIcon(recipe)" size="2em" /> {{ recipe.cat }}
        <em v-if="recipe.sub">{{ recipe.sub }}</em>
      </div>
      <div class="text-h6">{{ recipe.tit }}</div>
    </q-card-section>

    <q-card-section class="abstract">
      <h6>Pas 1/{{ recipe.stp.length }}</h6>
      {{ recipe.stp[0][0].toUpperCase() }}{{ recipe.stp[0].substring(1) }}
    </q-card-section>

    <q-card-actions class="absolute-bottom">
      <q-btn @click="showRecipe">Veure tota la recepta</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import { Category, Recipe } from '../stores/models'

export default defineComponent({
  name: 'RecipeCard',
  props: ['recipe'],
  setup () {
    const $store = useRecipeStore()
    const $router = useRouter()
    const getIcon = (recipe: Recipe) => {
      const category = $store.categories.find((category: Category) => {
        return category.name === recipe.cat
      })
      if (category) {
        const copy = JSON.parse(JSON.stringify(category))
        return copy.icon
      }
      return ''
    }
    const showRecipe = (event: Event) => {
      let target = event.target as HTMLElement
      while (!target.classList.contains('q-card')) {
        target = target.parentNode as HTMLElement
      }
      const id = target.dataset.id
      if (id) {
        const url = '/recipe/' + id.toString()
        $router.push(url)
      }
      // document.location target.dataset.id)
    }
    return {
      getIcon,
      showRecipe
    }
  }
})
</script>

<style scoped lang="scss">
.q-btn {
  background: $seco;
  color: $primary;
}
h6 {
  padding: 0px;
  margin: 5px;
}
.title {
  background: $primary;
  color: $seco;
}
.text-subtitle2 {
  color: $brown-3;
}
.text-subtitle2 .q-icon {
  padding-right: 10px;
}
.abstract {
  height: 205px;
  overflow: hidden;
  color: $primary;
}
.q-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 200px;
  height: 400px;
  background: white;
  margin: 10px;
  overflow: hidden;
  transition: all .1s ease-in;
}
.filtered {
  width: 0px;
  margin: 0px;
  overflow: hidden;
  transition: all .1s ease-in;
}
</style>
