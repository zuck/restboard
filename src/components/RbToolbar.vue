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

    <slot name="left"></slot>

    <q-space/>

    <slot name="buttons">
      <q-btn
        flat
        round
        dense
        icon="brightness_6"
        @click="onDarkModeToggle"
      />
    </slot>

    <slot name="userarea">
      <div class="q-ml-sm" v-if="showIdentity && $q.screen.gt.sm">{{ userIdentity }}</div>
      <q-btn class="q-ml-sm" flat round dense icon="account_circle">
        <slot name="usermenu">
          <rb-user-menu
            :identity="userIdentity"
            @profile="onShowProfile"
            @logout="onLogout"
          />
        </slot>
      </q-btn>
    </slot>
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
    value: Boolean,
    showIdentity: Boolean
  },

  computed: {
    userIdentity () {
      return this.$store.state.core.userIdentity || ''
    }
  },

  created () {
    this.productName = info.productName
  },

  methods: {
    onDarkModeToggle () {
      this.$store.dispatch('core/toggleDarkMode')
    },

    onShowProfile () {
      this.$router.push('/profile')
    },

    onLogout () {
      this.$store
        .dispatch('core/logout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
