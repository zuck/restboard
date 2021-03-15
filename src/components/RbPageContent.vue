<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-breadcrumbs v-if="breadcrumbs">
          <q-breadcrumbs-el to="/" icon="home" />
          <q-breadcrumbs-el
            v-for="bc in breadcrumbs"
            :key="bc.path"
            :label="bc.label"
            :to="bc.path || null"
          />
        </q-breadcrumbs>
        <h1 class="q-my-none q-mt-md text-h4">{{ title }}</h1>
      </q-card-section>
    </q-card>
    <div class="column q-gutter-md q-pa-md">
      <slot></slot>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RbPageContent',
  props: {
    breadcrumbs: Array,
    title: String
  }
}
</script>
