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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ $q.productName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <rb-sidebar
        separator
        :resources="resources"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import RbSidebar from 'components/RbSidebar.vue'

export default {
  name: 'MainLayout',
  components: {
    RbSidebar
  },
  computed: {
    resources () {
      return this.$store.state.resources.all
    }
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
