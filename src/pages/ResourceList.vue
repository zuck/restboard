<template>
  <q-page padding class="flex">
    <div class="col">
      <q-table
        :title="resource.label"
        :data="rows"
        :columns="columns"
        :row-key="key"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageResourceList',
  props: {
    resource: Object
  },
  computed: {
    title () {
      return this.resource.label
    },
    columns () {
      return this.resource.columns || []
    },
    key () {
      return this.resource.key || 'id'
    }
  },
  data () {
    return {
      rows: []
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    reloadData () {
      const provider = this.resource.provider
      provider.getMany(this.resource.name)
        .then(res => { this.rows = res.data })
        .catch(err => console.error(err))
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    }
  }
}
</script>
