import { createResource } from 'rb-core-module'
import createJsonServerProvider from 'rb-data-provider-json-server'

const dataProvider = createJsonServerProvider('http://jsonplaceholder.typicode.com')
const userResource = createResource({
  name: 'users',
  icon: 'people',
  displayAttr: 'name',
  provider: dataProvider,
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: {
        type: 'string',
        title: 'Email address'
      }
    }
  },
  columns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: 'id',
      sortable: true
    },
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true,
      filters: true
    },
    {
      name: 'email',
      required: true,
      label: 'Email address',
      align: 'left',
      field: 'email',
      sortable: true
    }
  ]
})
const postResource = createResource({
  name: 'posts',
  icon: 'forum',
  displayAttr: 'title',
  provider: dataProvider,
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      body: { type: 'string' }
    }
  },
  columns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: 'id',
      sortable: true
    },
    {
      name: 'title',
      required: true,
      label: 'Title',
      align: 'left',
      field: 'title',
      sortable: true
    }
  ]
})

export default function () {
  return {
    all: [
      userResource,
      postResource
    ]
  }
}
