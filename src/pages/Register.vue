<template>
  <div padding class="loginPage flex flex-center">
    <q-card class="q-pa-lg login-card">
      <div class="text-h3 text-dark text-center q-pb-md">Register</div>
      <q-form @submit="register" class="q-gutter-md">
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

        <q-input
          filled
          v-model="passwordTwo"
          label="Verify Password"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') ||
              'Please verify enter your password'
          ]"
        />

        <div class="row">
          <q-btn
            size="lg"
            flat
            label="login"
            :to="{ name: 'login' }"
            color="secondary"
          />
          <q-space />
          <q-btn
            size="lg"
            unelevated
            label="Register"
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
      password: null,
      passwordTwo: null
    };
  },
  methods: {
    async register() {
      if (this.password == this.passwordTwo) {
        let didLogin = await this.$store.dispatch("auth/register", {
          email: this.email,
          password: this.password
        });
        if (didLogin.response) {
          this.$router.push("/dashboard");
        } else {
          this.$q.notify(didLogin.error);
        }
      } else {
        this.$q.notify("Your passwords do not match.");
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
