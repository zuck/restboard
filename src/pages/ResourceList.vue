<template>
  <rb-page-content :breadcrumbs="breadcrumbs" :title="$t('List')">
    <rb-resource-data-table
      :resource="resource"
      @row-click="onRowClicked"
    />
  </rb-page-content>
</template>

<script>
import RbPageContent from 'components/RbPageContent'
import RbResourceDataTable from 'components/RbResourceDataTable'

export default {
  name: 'PageResourceList',
  components: {
    RbPageContent,
    RbResourceDataTable
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  computed: {
    breadcrumbs () {
      return [
        {
          path: `/${this.resource.name}`,
          label: this.$t(this.resource.label)
        }
      ]
    }
  },
  methods: {
    onRowClicked (evt, row) {
      const key = this.resource.key || 'id'
      const id = row[key]
      this.$router.push(`/${this.resource.name}/${id}`)
    }
  }
}
</script>
