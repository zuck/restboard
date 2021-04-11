<template>
  <div class="col">
    <q-card class="rb-form-container">
      <q-card-section>
        <JsonSchema
          class="column q-gutter-y-md"
          :schema="schema"
          :components="componentsConfig"
          :wrapper="wrapperConfig"
          :use-default-styles="false"
          v-model="model"
        />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="flex row reverse justify-between">
          <q-btn label="Submit" type="submit" color="primary" @click="onSubmit" />
          <q-btn label="Reset" type="reset" color="primary" flat @click="onReset" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  QInput
} from 'quasar'
import JsonSchema from '@roma219/vue-jsonschema-form'
import toJsonSchema from 'to-json-schema'
import capitalize from 'capitalize'

export default {
  name: 'RbResourceForm',
  components: {
    JsonSchema
  },
  props: {
    resource: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    id () {
      const keyAttr = this.resource.key || 'id'
      return this.value[keyAttr]
    },
    schema () {
      let resourceSchema = toJsonSchema(this.value)
      if (
        this.id &&
        Object.keys(this.resource.updateSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.updateSchema
      } else if (
        Object.keys(this.resource.createSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.createSchema
      }
      return {
        type: 'object',
        properties: {
          ...resourceSchema.properties
        }
      }
    }
  },
  data () {
    return {
      model: {},
      loading: true
    }
  },
  created () {
    this.componentsConfig = [{
      componentName: QInput,
      matcher: { type: 'number' },
      props: (propName, schema) => ({
        label: capitalize(this.$t(schema.title || propName)),
        outlined: true,
        clearable: true,
        type: 'number',
        hint: schema.description
      })
    }, {
      componentName: QInput,
      matcher: { type: 'integer' },
      props: (propName, schema) => ({
        label: capitalize(this.$t(schema.title || propName)),
        outlined: true,
        clearable: true,
        type: 'number',
        hint: schema.description
      })
    }, {
      componentName: QInput,
      matcher: { type: 'string' },
      props: (propName, schema) => ({
        label: capitalize(this.$t(schema.title || propName)),
        outlined: true,
        clearable: true,
        hint: schema.description
      })
    }, {
      componentName: 'JsonSchemaForm',
      matcher: { type: 'object' },
      props: (propName, schema, uiSchema) => ({
        useDefaultStyles: false,
        class: 'q-ma-none q-gutter-y-md'
      })
    }]
    this.wrapperConfig = {
      componentName: 'div',
      props: () => ({
        class: 'col'
      })
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    async reloadData () {
      this.loading = true
      this.model = { ...this.value }
      this.loading = false
    },

    async onSubmit () {
      this.$emit('input', this.model)
      this.$emit('submit')
    },

    async onReset () {
      this.reloadData()
    }
  },
  watch: {
    resource: function () {
      this.reloadData()
    },

    value: function () {
      this.reloadData()
    }
  }
}
</script>
