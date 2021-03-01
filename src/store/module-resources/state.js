import jsonServerProvider from 'rb-data-json-server'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

export default function () {
  return {
    all: [
      {
        name: 'users',
        label: 'Users',
        provider: dataProvider,
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
            sortable: true
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
      },
      {
        name: 'posts',
        label: 'Posts',
        provider: dataProvider,
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
      },
      {
        name: 'todos',
        label: 'ToDo',
        provider: dataProvider,
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
          },
          {
            name: 'completed',
            required: true,
            label: 'Completed?',
            align: 'left',
            field: 'completed',
            sortable: true
          }
        ]
      }
    ]
  }
}
