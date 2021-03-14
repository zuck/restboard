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

    <q-btn flat round dense icon="brightness_6" @click="onDarkModeToggle"/>
    <div class="q-ml-sm" v-if="$q.screen.gt.xs">{{ username }}</div>
    <q-btn class="q-ml-sm" flat round dense icon="account_circle">
      <rb-user-menu :username="username" @logout="onLogout"/>
    </q-btn>
  </q-toolbar>
</template>

<script>
import RbUserMenu from 'components/RbUserMenu'
import * as info from '../../package.json'

export default {
  name: 'RbToolbar',

  components: {
    RbUserMenu
  },

  props: {
    value: Boolean
  },

  computed: {
    username () {
      const user = this.$store.state.loggedAccount || {}
      return (user.firstname && user.lastname)
        ? `${user.firstname} ${user.lastname}`
        : user.email
    }
  },

  created () {
    this.productName = info.productName
  },

  methods: {
    onDarkModeToggle () {
      this.$store.dispatch('core/toggleDarkMode')
    },

    onLogout () {
      this.$store
        .dispatch('core/logout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
