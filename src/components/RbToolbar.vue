<template>
  <q-toolbar class="q-py-sm">
    <q-btn
      flat
      dense
      round
      aria-label="Menu"
      :icon="value ? 'chevron_left' : 'menu'"
      @click="$emit('input', !value)"
    />

    <div class="row q-ml-md">
      <img
        src="~assets/logo.svg"
        height="40"
        :alt="productName"
      >
    </div>

    <q-space/>

    <div v-if="$q.screen.gt.xs">{{ username }}</div>
    <q-btn class="q-ml-sm" flat round dense icon="account_circle">
      <rb-user-menu :username="username"/>
    </q-btn>
  </q-toolbar>
</template>

<script>
import RbUserMenu from 'components/RbUserMenu'

export default {
  name: 'RbToolbar',

  components: {
    RbUserMenu
  },

  computed: {
    username () {
      const user = this.$store.state.loggedAccount || {}
      return (user.firstname && user.lastname)
        ? `${user.firstname} ${user.lastname}`
        : user.email
    }
  },

  props: {
    value: Boolean
  }
}
</script>
