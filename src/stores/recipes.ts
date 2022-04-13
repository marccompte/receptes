import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { Category, Recipe } from './models'

const worker = new Worker('worker.js')

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    bonProfit: false,
    duration: 0,
    worker: worker,
    recipes: [],
    categories: [],
    selected: {
      category: ''
    },
    leftDrawerOpen: true,
    dbConfig: {
      DETA_ID: 'b0gdqr47',
      // DETA_KEY: 'b0gdqr47_37u5Vg37r7mFqRKdiopDJ1kS16hxhSvk',
      DETA_KEY: 'b0gdqr47_ZTCENLjTeoj5Rw8moUwKwo6Wrwp5i1at',
      DETA_NAME: 'recipes'
    }
  }),
  getters: {
    currentRecipe: (state) => {
      const $route = useRoute()
      return state.recipes.find((recipe: Recipe) => {
        const currentRecipe = JSON.parse(JSON.stringify($route.params))
        return recipe.key === parseInt(currentRecipe.key)
      }) as any
    }
  },
  actions: {
    getCurrentRecipe () {
      const $route = useRoute()
      return this.recipes.find((recipe: Recipe) => {
        const currentRecipe = JSON.parse(JSON.stringify($route.params))
        return recipe.key === parseInt(currentRecipe.key)
      })
    },
    removeCategoryFilter () {
      this.selected.category = ''
      Object.values(this.categories).forEach((category: Category) => {
        category.isSelected = false
      })
      Object.values(this.recipes).forEach((recipe: Recipe) => {
        recipe.isFiltered = false
      })
    },
    selectRecipe (target: HTMLElement) {
      Object.values(this.recipes).forEach((recipe: Recipe) => {
        if (recipe.cat === target.id) {
          recipe.isFiltered = false
        } else {
          recipe.isFiltered = true
        }
      })
    },
    async selectCategory (target: HTMLElement) {
      this.selected.category = target.id
      Object.values(this.categories).forEach((category: Category) => {
        if (category.name === target.id) {
          category.isSelected = true
        } else {
          category.isSelected = false
        }
      })
    }
  }
})
