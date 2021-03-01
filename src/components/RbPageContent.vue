<template>
  <q-page padding :class="$q.screen.lt.md ? 'q-gutter-xs' : 'q-gutter-lg'">
    <q-breadcrumbs v-if="breadcrumbs">
      <q-breadcrumbs-el to="/" icon="home" />
      <q-breadcrumbs-el
        v-for="bc in breadcrumbs"
        :key="bc.path"
        :label="bc.label"
        :to="bc.path || null"
      />
    </q-breadcrumbs>
    <slot></slot>
  </q-page>
</template>

<script>
export default {
  name: 'RbPageContent',
  props: {
    breadcrumbs: Array
  }
}
</script>
