<template>
  <q-expansion-item
    expand-separator
    :icon="resource.icon"
    :label="resource.label || resource.name"
    :caption="resource.caption"
    :key="resource.name"
  >
    <q-list>
      <q-item clickable v-ripple :to="resource.name">
        <q-item-section>{{ $t('Show all') }}</q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="`${resource.name}/create`">
        <q-item-section>{{ $t('Create') }}</q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'RbResourceMenu',
  props: {
    resource: Object
  }
}
</script>
