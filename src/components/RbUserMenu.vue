<template>
  <q-menu>
    <div class="userarea column items-center q-pa-md">
      <q-avatar size="80px">
        <img src="~assets/logo.svg">
      </q-avatar>

      <div class="text-subtitle1 q-mt-sm q-mb-xs">
        {{ username }}
      </div>

      <div class="column q-gutter-sm">
        <q-btn
          flat
          icon="exit_to_app"
          :label="$t('Logout')"
          @click="onLogout"
        />
      </div>
    </div>
  </q-menu>
</template>

<script>
export default {
  name: 'RbUserMenu',

  props: {
    username: String
  },

  methods: {
    onLogout () {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style scoped lang="stylus">
.userarea
  width: 180px
</style>
