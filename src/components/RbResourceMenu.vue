<template>
  <q-expansion-item
    :icon="resource.icon"
    :label="resource.label || resource.name"
    :caption="resource.caption"
    :key="resource.name"
  >
    <q-list separator>
      <q-item clickable v-ripple :to="`/${resource.name}`">
        <q-item-section>{{ $t('Show all') }}</q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="`/${resource.name}/create`">
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
