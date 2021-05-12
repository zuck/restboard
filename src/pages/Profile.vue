<template>
  <rb-page-content :breadcrumbs="breadcrumbs" :title="$t('Profile')">
  </rb-page-content>
</template>

<script>
import RbPageContent from 'components/RbPageContent'

export default {
  name: 'PageProfile',
  components: {
    RbPageContent
  },
  computed: {
    breadcrumbs () {
      return [
        {
          path: '/profile',
          label: this.$t('Profile')
        }
      ]
    }
  }
}
</script>
