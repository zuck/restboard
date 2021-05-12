<template>
  <q-menu>
    <q-list class="items-center" separator>
      <q-item class="column items-center q-py-md q-px-xl">
        <q-avatar size="80px">
          <img src="~assets/logo.svg">
        </q-avatar>
        <div class="text-subtitle1 q-mt-sm q-mb-xs">
          {{ identity }}
        </div>
      </q-item>

      <q-item clickable @click="$emit('profile')">
        <q-item-section avatar>
          <q-icon name="info" class="faded" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('Profile') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="$emit('logout')">
        <q-item-section avatar>
          <q-icon name="exit_to_app" class="faded" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('Logout') }}</q-item-label>
        </q-item-section>
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
