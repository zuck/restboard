<template>
  <rb-page-content :breadcrumbs="breadcrumbs">
    <rb-resource-form
      :resource="resource"
      v-model="instance"
      @submit="onSubmit"
    />
  </rb-page-content>
</template>

<script>
import RbPageContent from 'components/RbPageContent'
import RbResourceForm from 'components/RbResourceForm'

export default {
  name: 'PageResourceDetails',
  components: {
    RbPageContent,
    RbResourceForm
  },
  props: {
    resource: Object
  },
  computed: {
    id () {
      return this.$route.params.id
    },

    label () {
      if (this.id) {
        const labelAttr = this.resource.labelAttr || 'name'
        return this.instance[labelAttr]
      }
      return ''
    },

    breadcrumbs () {
      const entries = [
        {
          path: `/${this.resource.name}`,
          label: this.$t(this.resource.label)
        }
      ]
      if (this.id) {
        entries.push({
          path: `/${this.resource.name}/${this.id}`,
          label: this.$t(this.label)
        })
      } else {
        entries.push({
          path: `/${this.resource.name}/create`,
          label: this.$t('Create')
        })
      }
      return entries
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
      if (this.id) {
        const res = await this.resource.provider.getOne(
          this.resource.name,
          this.$route.params
        )
        this.instance = res.data
      }
    },

    async onSubmit () {
      let res = {
        data: this.instance
      }
      if (this.instance.id) {
        res = await this.resource.provider.updateOne(
          this.resource.name,
          this.instance
        )
      } else {
        res = await this.resource.provider.createOne(
          this.resource.name,
          this.instance
        )
      }
      this.instance = res.data
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
