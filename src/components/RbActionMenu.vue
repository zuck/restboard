<template>
  <div v-if="actions">
    <div
      v-if="actions.length < 3"
      class="row no-wrap"
    >
      <q-btn
        v-for="action in actions"
        :key="action.name"
        dense
        flat
        round
        :disable="action.disable"
        :icon="action.icon"
        @click="action.onClick"
      />
    </div>
    <q-btn
      v-else
      round
      dense
      flat
      icon="more_vert"
    >
      <q-menu
        auto-close
        transition-show="scale"
        transition-hide="scale"
      >
        <q-list separator>
          <q-item
            v-for="action in actions"
            :key="action.name"
            clickable
            :disable="action.disable"
            @click="action.onClick"
          >
            <q-item-section>{{ $t(action.name) }}</q-item-section>
            <q-item-section avatar>
              <q-icon :name="action.icon" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'RbActionMenu',

  props: {
    actions: Array
  }
}
</script>
