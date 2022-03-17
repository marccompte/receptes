import { defineStore } from 'pinia'
const worker = new Worker('worker.js')

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    counter: 0,
    worker: worker,
    recipes: [],
    categories: [],
    dbConfig: {
      DETA_ID: 'b0gdqr47',
      // DETA_KEY: 'b0gdqr47_37u5Vg37r7mFqRKdiopDJ1kS16hxhSvk',
      DETA_KEY: 'b0gdqr47_ZTCENLjTeoj5Rw8moUwKwo6Wrwp5i1at',
      DETA_NAME: 'recipes'
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})
