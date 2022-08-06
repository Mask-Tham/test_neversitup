<template>
  <v-card>
    <v-card-title>
      <p class="text-h4">{{ item.title }}</p>
      <v-spacer></v-spacer>
      <v-btn fab text @click="removeTodo">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div @click="openEdit" style="cursor: pointer">
      <v-card-text>
        <p class="text-subtitle-1">{{ item.description }}</p>
      </v-card-text>
      <v-card-actions class="justify-end">
        <p class="text-caption">
          {{ $moment(item.updateAt).format("DD-MM-YYYY HH:mm::ss") }}
        </p>
      </v-card-actions>
      <v-dialog v-model="dialogUpdate" max-width="290">
        <create-todo
          v-on:cancel="canceldialogUpdate"
          v-on:updateList="updateList"
          :create="false"
          :item="item"
        ></create-todo>
      </v-dialog>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-alert dense outlined :value="alert" type="error">
            <v-row align="center">
              <v-col>
                {{ error }}
              </v-col>
            </v-row>
          </v-alert>

          <v-card-title class="text-h5">
            Want Delete {{ item.title }} ?
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn color="gray darken-1" @click="dialog = false">
              cancel
            </v-btn>

            <v-btn color="primary" @click="deleteTodo"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import CreateTodo from "./CreateTodo.vue";
export default {
  components: { CreateTodo },
  props: {
    item: { type: Object, default: Object },
  },
  data() {
    return {
      dialog: false,
      dialogUpdate: false,

      error: "",
      alert: false,
    };
  },
  methods: {
    openEdit(e) {
      console.log(e);
      this.dialogUpdate = true;
    },
    removeTodo() {
      this.dialog = true;
    },
    async deleteTodo() {
      try {
        let res = await this.$http.delete(`/todos/${this.item._id}`);
        console.log(res);
        this.dialog = false;
        this.updateList();
      } catch (error) {
        console.error(error);
        this.error = error.data.message;
        this.alert = true;
      }
    },
    updateList() {
      this.$emit("updateList");
      this.canceldialogUpdate();
    },
    canceldialogUpdate() {
      this.dialogUpdate = false;
    },
  },
};
</script>

<style>
</style>