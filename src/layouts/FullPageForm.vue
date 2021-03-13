<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container>
      <div class="page-content fixed-center">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'FullPageForm',

  data () {
    return {
    }
  }
}
</script>
