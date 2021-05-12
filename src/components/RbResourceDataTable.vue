<template>
  <q-table
    :row-key="rowKey"
    :data="filteredRows"
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

    <template v-slot:header-cell="props">
      <q-th :props="props">
        <q-btn
          flat
          round
          dense
          icon="filter_list"
          v-if="'filters' in props.col && colFilters[props.col.field]"
          @click.stop
        >
          <rb-column-auto-filter
            :value="colFilters[props.col.field]"
            @input="evt => onFilterChange(props.col.field, evt)"
          />
        </q-btn>
        {{ props.col.label }}
      </q-th>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td v-if="actions" auto-width :props="props">
        <rb-action-menu :actions="actions" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { exportFile } from 'quasar'
import csvStringify from 'csv-stringify'
import RbActionMenu from '../components/RbActionMenu'
import RbColumnAutoFilter from '../components/RbColumnAutoFilter'

export default {
  name: 'RbResourceDataTable',
  components: {
    RbActionMenu,
    RbColumnAutoFilter
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
      const cols = [...this.resource.columns]
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
    columnsWithFilters () {
      return this.columns.filter(col => col.filters)
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
      colFilters: {},
      filteredRows: [],
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
        this.rows = res.data
        this.reloadColFilters()
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

    reloadColFilters () {
      this.columnsWithFilters.forEach(col => {
        this.colFilters[col.field] = {}
        this.rows.forEach(row => {
          const key = row[col.field]
          this.colFilters[col.field][key] = true
        })
      })
      this.filterRows()
    },

    filterRows () {
      this.filteredRows = [...this.rows]
      this.columnsWithFilters.forEach(col => {
        const filters = this.colFilters[col.field] || {}
        this.filteredRows = this.filteredRows.filter(row => {
          const key = row[col.field]
          return !!filters[key]
        })
      })
    },

    exportAsCSV () {
      csvStringify(
        this.rows,
        {
          header: true
        },
        (err, output) => {
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
        }
      )
    },

    onRowClicked (evt, row) {
      this.$emit('row-click', evt, row)
    },

    onSelectionChanged (evt) {
      this.$emit('update:selected', evt)
    },

    onFilterChange (columnName, evt) {
      const val = evt
      const old = this.colFilters[columnName]
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.colFilters[columnName] = val
        this.filterRows()
      }
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    }
  }
}
</script>
