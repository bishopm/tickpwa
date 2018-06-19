<template>
  <div>
    <q-tabs position="top" color="secondary">
      <q-tab default slot="title" name="tab-1" icon="lock_open" label="Login"/>
      <q-tab-pane class="no-border" name="tab-1">
        <div class="alert alert-danger" v-if="error">
          <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
          <div class="q-pa-sm">
            <q-input float-label="Username" v-model="email" required />
          </div>
          <div class="q-pa-sm">
            <q-input float-label="Password" type="password" v-model="password" required />
          </div>
          <div class="q-pa-sm text-center">
            <q-btn @click="login">Sign in</q-btn>
          </div>
        </form>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: 0
    }
  },
  methods: {
    login () {
      this.$axios.post(this.$store.state.hostname + '/login',
        {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.data !== 'Error') {
            localStorage.setItem('Tick_User', JSON.stringify(response.data))
            this.$store.commit('setUser', response.data)
            this.$router.push({ name: 'tasks' })
          } else {
            this.error = 1
          }
        })
        .catch(function (error) {
          this.error = error
        })
    }
  }
}
</script>

<style>
</style>
