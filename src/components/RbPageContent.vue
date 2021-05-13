<template>
  <q-page :padding="padding">
    <q-card
      square
      :flat="flat"
      :bordered="bordered"
      :class="headerCss"
    >
      <q-card-section horizontal class="q-pt-xs">
        <q-card-section class="col">
          <slot name="breadcrumbs" :breadcrumbs="breadcrumbs">
            <q-breadcrumbs v-if="breadcrumbs" class="q-mb-sm">
              <q-breadcrumbs-el to="/" icon="home" />
              <q-breadcrumbs-el
                v-for="bc in breadcrumbs"
                :key="bc.path"
                :label="bc.label"
                :to="bc.path || null"
              />
            </q-breadcrumbs>
          </slot>
          <slot name="title" :title="title">
            <h1 class="q-mt-none q-mb-xs text-h1">{{ title }}</h1>
          </slot>
        </q-card-section>
        <q-card-actions class="col-auto">
          <slot name="actions"></slot>
        </q-card-actions>
      </q-card-section>
    </q-card>
    <div class="column q-px-md no-wrap">
      <slot></slot>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RbPageContent',
  props: {
    breadcrumbs: Array,
    title: String,
    transparent: Boolean,
    flat: Boolean,
    bordered: Boolean,
    padding: Boolean
  },
  computed: {
    headerCss () {
      return {
        'bg-transparent': this.transparent
      }
    }
  }
}
</script>
