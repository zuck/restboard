<template>
  <q-page class="flex flex-center">
    <img
      src="~assets/logo.svg"
      height="128"
      :alt="productName"
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
