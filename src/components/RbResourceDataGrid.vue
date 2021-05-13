<template>
  <q-carousel
    class="bg-transparent"
    v-model="currentSlide"
    :animated="noWrap"
    :infinite="noWrap"
    :autoplay="noWrap"
    :padding="noWrap"
    :arrows="noWrap"
    transition-prev="jump-right"
    transition-next="jump-left"
    control-color="primary"
    height="auto"
  >
    <q-carousel-slide
      v-for="(itemRow, index) in itemRows"
      class="bg-transparent column no-wrap"
      :key="index"
      :name="`slide-${index}`"
    >
      <div class="row q-col-gutter-md">
        <div
          v-for="item in itemRow"
          :key="item[key]"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
          <slot
            name="card"
            :item="item"
            :resource="resource"
            :actions="actions"
          >
            <rb-data-card
              :title="item[resource.displayAttr]"
              :actions="actions"
            />
          </slot>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import RbDataCard from 'components/RbDataCard'

export default {
  name: 'RbResourceDataGrid',
  components: {
    RbDataCard
  },
  props: {
    resource: {
      type: Object,
      required: true
    },
    noWrap: {
      type: Boolean
    }
  },
  computed: {
    actions () {
      return this.resource.actions || []
    },
    key () {
      return this.resource.key || 'id'
    },
    itemsPerRow () {
      if (this.noWrap) {
        if (this.$q.screen.lt.sm) {
          return 1
        }
        if (this.$q.screen.lt.md) {
          return 2
        }
        if (this.$q.screen.lt.lg) {
          return 3
        }
        return 4
      }
      return this.items.length
    },
    itemRows () {
      let start = 0
      const length = this.items.length
      const size = this.itemsPerRow
      const res = []
      while (start < length) {
        const end = start + size
        res.push(this.items.slice(start, end))
        start = end
      }
      return res
    }
  },
  data () {
    return {
      items: [],
      loading: true,
      currentSlide: ''
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    restartCarousel () {
      this.currentSlide = 'slide-0'
    },
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
      this.restartCarousel()
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    },
    noWrap: function () {
      this.restartCarousel()
    }
  }
}
</script>
