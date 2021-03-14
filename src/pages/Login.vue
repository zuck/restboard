<template>
  <q-card class="q-pa-xs-sm q-pa-md-lg shadow-1">
    <q-card-section class="flex flex-center">
      <q-avatar size="128px">
        <img src="~assets/logo.svg">
      </q-avatar>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">{{ $t('sign_in') }}</div>
    </q-card-section>
    <q-card-section class="column q-gutter-md">
      <q-input
        filled
        required
        v-model="email"
        :label="$t('email')"
      />
      <q-input
        filled
        required
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        :label="$t('password')"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="row justify-between">
        <q-checkbox
          dense
          v-model="rememberMe"
          :label="$t('remember_me')"
        />
        <q-btn
          flat
          dense
          no-caps
          to="/auth/recovery"
          :label="$t('forgot_password')"
        />
      </div>
    </q-card-section>

    <q-card-actions vertical class="q-pa-md">
      <q-btn
        class="q-mb-sm"
        color="primary"
        :label="$t('sign_in')"
        @click="onLoginClicked"
      />
    </q-card-actions>
  </q-card>
</template>

<script >
export default {
  name: 'Login',

  data () {
    return {
      isPwd: true,
      rememberMe: false,
      email: null,
      password: null
    }
  },

  methods: {
    onLoginClicked () {
      this.$store.dispatch('core/login', {
        email: this.email,
        password: this.password,
        keepLogged: this.rememberMe
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => console.error(err))
    }
  }
}
</script>

<style scoped lang="stylus">
.q-card
  min-width: 320px

  @media (min-width: $breakpoint-md-min)
    min-width: 400px
</style>
