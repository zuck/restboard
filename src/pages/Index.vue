<template>
  <q-page class="flex flex-center">
    <img
      src="~assets/splash.svg"
      width="300"
      :alt="productName"
      class="splash"
    >
  </q-page>
</template>

<script>
import * as info from '../../package.json'

export default {
  name: 'PageIndex',

  created () {
    this.productName = info.productName
  }
}
</script>

<style scoped lang="sass">
.splash
  opacity: 0.35
</style>
