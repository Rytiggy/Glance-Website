<template>
  <div padding class="loginPage flex flex-center">
    <q-card class="q-pa-lg login-card">
      <div class="text-h3 text-dark text-center q-pb-md">Login</div>
      <q-form @submit="login" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please enter your password'
          ]"
        />

        <div class="row">
          <q-btn
            size="lg"
            flat
            label="Register"
            :to="{ name: 'register' }"
            color="secondary"
          />
          <q-space />
          <q-btn
            size="lg"
            unelevated
            label="Login"
            type="submit"
            color="secondary"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  mounted() {
    if (this.$q.localStorage.has("emailForSignIn")) {
      this.email = this.$q.localStorage.getItem("emailForSignIn");
    }
  },
  methods: {
    async login() {
      let didLogin = await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password
      });
      if (didLogin.response) {
        this.$router.push("/dashboard");
      } else {
        this.$q.notify(didLogin.error);
      }
    }
  }
};
</script>
<style scoped>
.loginPage {
  height: 100vh;
  background: radial-gradient(#7e7e7e, #232323);
}
.login-card {
  min-width: 320px;
  width: 500px;
}
</style>
