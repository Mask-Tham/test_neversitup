<template>
  <v-card>
    <v-alert dense outlined :value="alert" type="error">
      <v-row align="center">
        <v-col>
          {{ error }}
        </v-col>
      </v-row>
    </v-alert>
    <v-form ref="form_todo" v-model="valid" lazy-validation>
      <v-card-title class="text-h5">
        <v-text-field
          v-model="form.title"
          label="Title"
          placeholder="Enter Title"
          :rules="titleRules"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="form.description"
          label="Description"
          placeholder="Enter Description"
          outlined
        ></v-text-field>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn depressed color="primary" @click="cancel"> Cancel </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              v-if="create"
              depressed
              color="primary"
              type="submit"
              @click="createTodo"
            >
              Create
            </v-btn>
            <v-btn
              v-else
              depressed
              color="primary"
              type="submit"
              @click="updateTodo"
            >
              Edit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    create: { type: Boolean, default: true },
    item:Object,
  },
  data() {
    return {
      valid: false,
      dialog: false,
      form: { title: "", description: "" },
      titleRules: [(v) => !!v || "Title is required"],
      error: "",
      alert: false,
    };
  },
  mounted() {
    if(!this.create){
        this.form ={ ...this.item}
        delete this.form.createdAt
        delete this.form.updatedAt
        delete this.form.user_id
        delete this.form._id

        console.log(this.form)
    }
  },
  methods: {
    async createTodo(e) {
      e.preventDefault();
      this.$refs.form_todo.validate();
      console.log(this.form);
      try {
        let res = await this.$http.post("/todos/", this.form);
        console.log(res);
        this.updateList();
      } catch (error) {
        console.error(error);
        this.error = error.data.message;
        this.alert = true;
      }
    },
   async updateTodo(e) {
      e.preventDefault();
      this.$refs.form_todo.validate();
      console.log(this.form);
      try {
        let res = await this.$http.put(`/todos/${this.item._id}`, this.form);
        console.log(res);
        this.updateList();
      } catch (error) {
        console.error(error);
        this.error = error.data.message;
        this.alert = true;
      }
    },
    updateList() {
      this.$emit("updateList");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>