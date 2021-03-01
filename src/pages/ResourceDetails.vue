<template>
  <rb-page-content :breadcrumbs="breadcrumbs">
  </rb-page-content>
</template>

<script>
import RbPageContent from 'components/RbPageContent'

export default {
  name: 'PageResourceDetails',
  components: {
    RbPageContent
  },
  props: {
    resource: Object
  },
  computed: {
    label () {
      const labelAttr = this.resource.labelAttr || 'name'
      return this.instance[labelAttr]
    },

    breadcrumbs () {
      return [
        {
          path: `/${this.resource.name}`,
          label: this.$t(this.resource.label)
        },
        {
          path: `/${this.resource.name}/${this.$route.params.id}`,
          label: this.$t(this.label)
        }
      ]
    }
  },
  data () {
    return {
      instance: {}
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    async reloadData () {
      if (this.$route.params.id) {
        const res = await this.resource.provider.getOne(
          this.resource.name,
          this.$route.params
        )
        this.instance = res.data
      }
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    },

    '$route.params.id': function () {
      this.reloadData()
    }
  }
}
</script>
