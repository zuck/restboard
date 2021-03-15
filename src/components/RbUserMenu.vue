<template>
  <q-menu>
    <q-list class="items-center q-pa-md" separator>
      <q-item class="column items-center">
        <q-avatar size="80px">
          <img src="~assets/logo.svg">
        </q-avatar>
        <div class="text-subtitle1 q-mt-sm q-mb-xs">
          {{ identity }}
        </div>
      </q-item>

      <q-item>
        <q-btn
          flat
          icon="exit_to_app"
          :label="$t('Logout')"
          @click="$emit('logout')"
        />
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'RbUserMenu',

  props: {
    identity: String
  }
}
</script>

<style scoped lang="stylus">
.userarea
  width: 180px
</style>
