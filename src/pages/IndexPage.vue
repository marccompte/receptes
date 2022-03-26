<template>
  <q-item class="flex justify-center row">
    <q-input
      placeholder="Cerca recepta, ingredient,..."
      v-model="searchString"
      @keyup="search"
      style="width: 350px;">
    </q-input>
  </q-item>
  <q-page class="row">
    <q-card
      class="my-card text-indigo"
      v-for="recipe in recipes"
      :key="recipe.key"
      :class="{ filtered: recipe.isFiltered }"
      >
      <q-card-section class="title">
        <div class="text-subtitle2"><q-icon :name="getIcon(recipe)" /> {{ recipe.cat }} <em v-if="recipe.sub">{{ recipe.sub }}</em></div>
        <div class="text-h6">{{ recipe.tit }}</div>
      </q-card-section>

      <q-card-section class="abstract">
        <h6>Pas 1/{{ recipe.stp.length }}</h6>
        {{ recipe.stp[0] }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions class="absolute-bottom">
        <q-btn color="brown-5">Veure tota la recepta</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Meta } from '../components/models'
import { computed, defineComponent, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $store = useRecipeStore()
    const searchString = ref()
    const meta = ref<Meta>({
      totalCount: 1200
    })
    const recipes = computed(() => {
      return $store.recipes
    })
    const allOptions = $store.recipes.map((recipe: any) => {
      return recipe.tit
    })
    const allRecipes = $store.recipes
    const hasIngredient = (recipe: any, value: string) => {
      return recipe.ing.find((ing: any) => {
        return ing.find((label: string) => {
          return label && label.toLowerCase().indexOf(value) !== -1
        })
      })
    }
    const search = (event: any) => {
      const value = event.target.value.toLowerCase()
      if (value === '') {
        $store.recipes.forEach((recipe: any) => {
          recipe.isFiltered = false
        })
      } else {
        $store.recipes.forEach((recipe: any) => {
          if (recipe.tit.toLowerCase().indexOf(value) !== -1 || recipe.cat.toLowerCase().indexOf(value) !== -1 || (recipe.sub && recipe.sub.toLowerCase().indexOf(value) !== -1) ||
                hasIngredient(recipe, value)) {
            recipe.isFiltered = false
          } else {
            recipe.isFiltered = true
          }
        })
      }
    }
    const getIcon = (recipe: any) => {
      const category = $store.categories.find((category: any) => {
        return category.name === recipe.cat
      })
      if (category) {
        const copy = JSON.parse(JSON.stringify(category))
        return copy.icon
      }
      return ''
    }
    return {
      getIcon,
      meta,
      recipes,
      search,
      searchString
    }
  }
})
</script>

<style scoped lang="scss">
h6 {
  padding: 0px;
  margin: 5px;
}
.title {
  max-height: 150px;
  background: $primary;
  color: $seco;
}
.text-subtitle2 {
  color: $orange-8;
}
.abstract {
  height: 205px;
  overflow: hidden;
  color: $primary;
}
.q-page {
  display: flex;
  justify-content: center;
  /* align-items: center; */
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
