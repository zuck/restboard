<template>
  <q-menu>
    <q-list dense style="min-width: 100px">
      <q-item v-for="item in filterKeys" :key="item" v-close-popup clickable>
        <q-item-section side top>
          <q-checkbox :value="filters[item]" @input="toggleFilter(item)" />
        </q-item-section>
        <q-item-section>{{ item }}</q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <div class="row no-gutter">
      <div class="col">
        <q-btn flat dense class="full-width" @click="resetFilters(true)">
          {{ $t("Select all") }}
        </q-btn>
        <q-separator />
        <q-btn flat dense class="full-width" @click="resetFilters(false)">
          {{ $t("Deselect all") }}
        </q-btn>
      </div>
    </div>
  </q-menu>
</template>

<script>
export default {
  name: 'RbColumnAutoFilter',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filters: {}
    }
  },
  computed: {
    filterKeys () {
      return Object.keys(this.filters || {})
    }
  },
  watch: {
    value: function () {
      this.reloadFilters()
    }
  },
  mounted () {
    this.reloadFilters()
  },
  methods: {
    reloadFilters () {
      this.filters = { ...this.value }
      this.$emit('input', this.filters)
    },

    resetFilters (value) {
      Object.keys(this.filters || {}).forEach(key => {
        this.filters[key] = value
      })
      this.$emit('input', this.filters)
    },

    toggleFilter (key) {
      this.filters[key] = !this.filters[key]
      this.$emit('input', this.filters)
    }
  }
}
</script>
