<template>
  <q-list :separator="separator">
    <rb-resource-menu
      v-for="resource in resources"
      :resource="resource"
      :key="resource.name"
    />
  </q-list>
</template>

<script>
import RbResourceMenu from 'components/RbResourceMenu'

export default {
  name: 'RbSidebar',
  components: {
    RbResourceMenu
  },
  props: {
    resources: Array,
    separator: Boolean
  }
}
</script>
