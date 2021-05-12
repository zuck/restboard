<template>
  <div class="column">
    <div class="row q-col-gutter-md">
      <div v-for="item in items" :key="item[key]" class="col-xs-12 col-sm-4 col-md-3">
        <q-card class="full-width">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ item[resource.displayAttr] }}</div>
              </div>
              <div class="col-auto">
                <rb-action-menu :actions="actions" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import RbActionMenu from '../components/RbActionMenu'

export default {
  name: 'RbResourceDataGrid',
  components: {
    RbActionMenu
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  computed: {
    actions () {
      return this.resource.actions || []
    },
    key () {
      return this.resource.key || 'id'
    }
  },
  data () {
    return {
      items: [],
      loading: true
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    async reloadData () {
      this.loading = true
      try {
        const res = await this.resource.getMany()
        this.items = res.data
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: this.$t('Impossible to fetch data'),
          color: 'negative',
          icon: 'warning'
        })
      }
      this.loading = false
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    }
  }
}
</script>
