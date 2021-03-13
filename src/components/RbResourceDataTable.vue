<template>
  <q-table
    :row-key="rowKey"
    :data="rows"
    :columns="columns"
    :loading="loading"
    :grid="$q.screen.xs"
    :filter="searchQuery"
    :selection="selection"
    :selected.sync="selected"
    @request="reloadData"
    @row-click="onRowClicked"
    @update:selected="onSelectionChanged"
  >
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template v-slot:top>
      <div class="row full-width justify-end">
        <div class="col-xs col-md-4 col-lg-2">
          <q-input
            dense
            clearable
            clear-icon="close"
            :debounce="searchDebounce"
            v-model="searchQuery"
            :placeholder="$t('search')"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-btn
          round
          dense
          flat
          icon="save_alt"
          class="q-ml-sm"
          @click="exportAsCSV"
        />
      </div>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td v-if="actions" auto-width :props="props">
        <rb-action-menu :actions="actions" :data="props.row"/>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { exportFile } from 'quasar'
import csvStringify from 'csv-stringify'
import RbActionMenu from '../components/RbActionMenu'

export default {
  name: 'RbResourceDataTable',
  components: {
    RbActionMenu
  },
  props: {
    resource: {
      type: Object,
      required: true
    },
    selected: {
      type: String,
      required: false
    },
    searchDebounce: {
      type: Number,
      required: false,
      default: 250
    }
  },
  computed: {
    columns () {
      const cols = this.resource.columns || []
      if (this.selection) {
        cols.unshift({})
      }
      if (this.actions && this.actions.length > 0) {
        cols.push({
          name: 'actions',
          label: this.$t('actions')
        })
      }
      return cols
    },
    selection () {
      return this.resource.selectionMode
    },
    actions () {
      return this.resource.actions || []
    },
    rowKey () {
      return this.resource.key || 'id'
    }
  },
  data () {
    return {
      searchQuery: '',
      rows: [],
      loading: true
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    async reloadData (props, url) {
      this.loading = true
      try {
        const res = await this.resource.getMany()
        this.rows = res.data
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: this.$t('Impossible to fetch data'),
          color: 'negative',
          icon: 'warning'
        })
      }
      this.loading = false
    },

    onRowClicked (evt, row) {
      this.$emit('row-click', evt, row)
    },

    onSelectionChanged (evt) {
      this.$emit('update:selected', evt)
    },

    exportAsCSV () {
      csvStringify(this.rows, {
        header: true
      }, (err, output) => {
        if (err) {
          return this.$q.notify({
            message: this.$t('CSV generation failed...'),
            color: 'negative',
            icon: 'warning'
          })
        }
        const status = exportFile(
          `${this.resource.label}.csv`,
          output,
          'text/csv'
        )
        if (status !== true) {
          this.$q.notify({
            message: this.$t('Browser denied file download...'),
            color: 'negative',
            icon: 'warning'
          })
        }
      })
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    }
  }
}
</script>
