<template>
  <v-container>
    <v-row rows="auto" align="center" justify="center" style="height: 100vh">
      <v-col cols="6">
        <v-card class="pa-5">
          <v-alert dense outlined :value="alert" type="error">
            <v-row align="center">
              <v-col>
                {{ error }}
              </v-col>
            </v-row>
          </v-alert>
          <v-form ref="form_login" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.username"
              label="Username"
              placeholder="Enter Username"
              :rules="[(v) => !!v || 'Username is required']"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              placeholder="Enter Password"
              :rules="[(v) => !!v || 'Password is required']"
              type="password"
              outlined
              required
            ></v-text-field>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn depressed color="primary" type="submit" @click="login">
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      form: {
        username: "john.doe",
        password: "123456789",
      },
      titleRules: [(v) => !!v || "Title is required"],
      error: "",
      alert :false,
    };
  },
  methods: {
    async login(e) {
      console.log("login");
      e.preventDefault();
      this.$refs.form_login.validate();
      let body = JSON.stringify(this.form);
      try {
        let res = await this.$http.post("/users/auth", body);
        console.log(res);
        this.$cookies.set("accessToken", res.data.token);
        this.$router.push({ path: "/" });
      } catch (error) {
        console.error(error);
        this.error = error.data.message;
        this.alert = true
      }
    },
  },
};
</script>

<style>
</style>