<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label
        header
      >
        Categories i subcategories
      </q-item-label>

      <category-menu
        v-for="category in categories"
        :key="category.key"
        v-bind="category"
        :class="{ selected: category.isSelected }"
      />
    </q-list>
    <q-item class="flex justify-center">
      <q-btn
        label="Veure-les totes"
        color="orange-8"
        @click="removeFilter"
        v-show="thereIsAFilter">
      </q-btn>
    </q-item>
  </q-drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import CategoryMenu from 'components/CategoryMenu.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CategoryMenu
  },

  setup () {
    const $store = useRecipeStore()

    const categories = computed(() => {
      return $store.categories
    })

    const leftDrawerOpen = computed(() => {
      return $store.leftDrawerOpen
    })

    const removeFilter = () => {
      $store.removeCategoryFilter()
    }

    const thereIsAFilter = computed(() => {
      return $store.selected.category !== ''
    })

    return {
      leftDrawerOpen,
      categories,
      removeFilter,
      thereIsAFilter
    }
  }
})
</script>

<style scoped lang="scss">
  :deep(.q-item) .q-item__section--avatar {
    color: $orange-8;
    transition: all .3s ease-out;
  }
  .q-item {
    transition: all .3s ease-out;
  }
  .q-item.selected {
    background: $orange-8;
    color: white;
    transition: all .3s ease-in;
  }
  :deep(.q-item.selected) .q-item__section--avatar {
    color: white;
    transition: all .3s ease-in;
  }
  :deep(.q-item.selected) .q-item__label--caption {
    color: #ffd7c1;
    transition: all .3s ease-in;
  }
  :deep(.q-drawer) {
    background: $seco;
  }
</style>
