<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Receptes <span class="category-title" v-show="category">{{ category }}</span>
        </q-toolbar-title>

        <div>v2</div>
      </q-toolbar>
    </q-header>

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

        <EssentialLink
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import EssentialLink from 'components/EssentialLink.vue'
// import worker from '../worker'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $store = useRecipeStore()

    $store.worker.onmessage = message => {
      const type = message.data.type.toLowerCase()
      if (type === 'init') {
        $store.recipes = message.data.data.items
        $store.categories = message.data.data.categories
      }
    }

    onBeforeMount(() => {
      $store.worker.postMessage({ type: 'init', data: JSON.parse(JSON.stringify($store.dbConfig)) })
    })

    const categories = computed(() => {
      return $store.categories
    })

    const removeFilter = () => {
      $store.removeCategoryFilter()
    }

    const thereIsAFilter = computed(() => {
      return $store.selected.category !== ''
    })

    const category = computed(() => {
      return $store.selected.category
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      categories,
      removeFilter,
      thereIsAFilter,
      category
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
.category-title::before {
  content: '- '
}
:deep(.q-drawer) {
  background: $seco;
}
</style>
