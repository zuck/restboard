<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <rb-toolbar v-model="leftDrawerOpen" />
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
import RbToolbar from '../components/RbToolbar'
import RbSidebar from 'components/RbSidebar.vue'

export default {
  name: 'MainLayout',
  components: {
    RbToolbar,
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
