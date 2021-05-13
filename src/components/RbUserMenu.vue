<template>
  <q-menu>
    <div class="user-details column items-center q-pa-md">
      <q-avatar size="80px">
        <img src="~assets/logo.svg">
      </q-avatar>
      <div class="text-subtitle1 q-mt-sm q-mb-xs">
        {{ identity }}
      </div>
    </div>
    <q-separator />
    <q-list separator>
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

<style scoped lang="sass">
.user-details
  min-width: 200px !important
</style>
