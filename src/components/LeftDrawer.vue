<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :breakpoint="800"
    show-if-above
    elevated
  >
    <q-list>
      <q-item-label
        header
      >
        Llistat de categories i subcategories
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
import { computed, defineComponent, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import { useRoute, useRouter } from 'vue-router'
import CategoryMenu from 'components/CategoryMenu.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CategoryMenu
  },

  setup () {
    const $store = useRecipeStore()
    const $route = useRoute()
    const $router = useRouter()
    const leftDrawerOpen = ref($store.leftDrawerOpen)

    const categories = computed(() => {
      return $store.categories
    })

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const removeFilter = async () => {
      if ($route.path !== '/') {
        await $router.push('/')
      }
      $store.removeCategoryFilter()
    }

    const thereIsAFilter = computed(() => {
      return $store.selected.category !== ''
    })

    return {
      leftDrawerOpen,
      categories,
      removeFilter,
      thereIsAFilter,
      toggleLeftDrawer
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
