<template>
  <q-list :separator="separator">
    <q-item
      v-if="!hideRootLink"
      clickable
      v-ripple
      to="/" exact
    >
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>{{ rootLinkLabel || $t('Dashboard') }}</q-item-section>
    </q-item>
    <rb-resource-menu
      v-for="resource in visibileResources"
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
    separator: Boolean,
    hideRootLink: Boolean,
    rootLinkLabel: String
  },
  computed: {
    visibileResources () {
      return this.resources.filter(resource => !resource.excludeSidebar)
    }
  }
}
</script>
