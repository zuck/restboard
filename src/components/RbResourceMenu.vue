<template>
  <q-expansion-item
    expand-separator
    :icon="resource.icon"
    :label="resource.label || resource.name"
    :caption="resource.caption"
    :key="resource.name"
  >
    <q-list>
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
