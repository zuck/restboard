<template>
  <q-list :separator="separator">
    <q-item clickable v-ripple to="/" exact>
      <q-item-section>{{ $t('Dashboard') }}</q-item-section>
    </q-item>
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
