<template>
  <div>
    <q-item class="flex justify-center row">
      <q-input
        placeholder="Cerca recepta, ingredient,..."
        v-model="searchString"
        @keyup="search"
        style="width: 350px;">
      </q-input>
    </q-item>
    <q-page class="row">
      <recipe-card
        :recipe="recipe"
        v-for="recipe in recipes"
        :key="recipe.key"
        />
    </q-page>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import { Ingredient, Recipe } from '../stores/models'
import RecipeCard from '../components/RecipeCard.vue'

export default defineComponent({
  name: 'RecipeList',
  components: { RecipeCard },
  setup () {
    const $store = useRecipeStore()
    const searchString = ref()
    const recipes = computed(() => {
      return $store.recipes
    })
    const hasIngredient = (recipe: Recipe, value: string) => {
      return recipe.ing.find((ing: Ingredient) => {
        return ing.name.toLowerCase() === value.toLowerCase()
      })
    }
    const search = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value.toLowerCase()
      $store.recipes.forEach((recipe: Recipe) => {
        if (value === '' ||
            recipe.tit.toLowerCase().indexOf(value) !== -1 ||
            recipe.cat.toLowerCase().indexOf(value) !== -1 ||
            (recipe.sub && recipe.sub.toLowerCase().indexOf(value) !== -1) ||
            hasIngredient(recipe, value)) {
          recipe.isFiltered = false
        } else {
          recipe.isFiltered = true
        }
      })
    }
    return {
      recipes,
      search,
      searchString
    }
  }
})
</script>

<style scoped lang="scss">
  .q-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 100px;
  }
</style>
