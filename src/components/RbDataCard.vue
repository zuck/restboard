<template>
  <q-card class="fit">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <slot name="title" :title="title">
            <div class="text-h6">{{ title }}</div>
          </slot>
        </div>
        <div class="col-auto">
          <slot name="actions" :actions="actions">
            <rb-action-menu :actions="actions" />
          </slot>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <slot :content="content">{{ content }}</slot>
    </q-card-section>
  </q-card>
</template>

<script>
import RbActionMenu from '../components/RbActionMenu'

export default {
  name: 'RbDataCard',
  components: {
    RbActionMenu
  },
  props: {
    actions: Array,
    title: String,
    content: String
  }
}
</script>
