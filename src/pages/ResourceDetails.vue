<template>
  <rb-page-content :breadcrumbs="breadcrumbs" :title="pageTitle">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <rb-resource-form
          :resource="resource"
          v-model="instance"
          @submit="onSubmit"
        />
      </div>
    </div>
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
        return this.resource.stringify(this.instance)
      }
      return ''
    },

    pageTitle () {
      return (this.id) ? this.$t('Details') : this.$t('New')
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
      } else {
        this.instance = {}
      }
    },

    async onSubmit () {
      const data = { ...this.instance }
      let res = { data }
      const resourceName = this.resource.name
      const keyAttr = this.resource.key || 'id'
      const keyVal = this.instance[keyAttr]
      if (keyVal) {
        data[keyAttr] = keyVal
        res = await this.resource.provider.updateOne(resourceName, data)
      } else {
        res = await this.resource.provider.createOne(resourceName, data)
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
