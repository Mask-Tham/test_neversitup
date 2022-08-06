<template>
  <div>
    <v-row
      v-if="todoItem < 1"
      align="center"
      justify="center"
      style="height: 100vh"
    >
      <v-col cols="auto">
        <p class="text-center">Empty press 'Create'</p>
        <p class="text-center">for add new todo</p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" v-for="(item, i) in todoItem" :key="i">
        <card-item-todo :item="item" v-on:updateList="updateList"></card-item-todo>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="290">
      <create-todo v-on:cancel="cancel" v-on:updateList="updateList"></create-todo>
    </v-dialog>

    <slot name="footer">
      <v-footer fixed>
        <v-col class="text-center" cols="12">
          <v-btn tile color="primary" @click="dialog = true">
            <v-icon left> mdi-plus </v-icon>
            Create
          </v-btn>
        </v-col>
      </v-footer>
    </slot>
  </div>
</template>

<script>
import CardItemTodo from "../components/CardItemTodo.vue";
import CreateTodo from "../components/CreateTodo.vue";

export default {
  components: { CreateTodo, CardItemTodo },
  data() {
    return {
      todoItem: [],
      dialog: false,
    };
  },
 async mounted() {
    await this.getAllTodo();
 },
  methods: {
    async getAllTodo() {
      try {
        let res = await this.$http.get("/todos/");
        console.log(res.data);
        this.todoItem = res.data
      } catch (error) {
        console.error(error);
      }
    },
    updateList(){
        this.getAllTodo()
        this.cancel()
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>