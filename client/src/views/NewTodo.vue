<template>
  <div id="Home" class="div1">
    <form class="col-4">
      <label for="todo">
        <strong>Todo Title</strong>
      </label>
      <input
        v-model="todoTitle"
        placeholder="Title..."
        id="todo"
        type="text"
        class="form-control text-center"
      />
      <button @click.prevent="AddTodo" class="btn btn-success mt-3">Add Todo</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      todoTitle: ""
    };
  },
  methods: {
    AddTodo() {
      if (this.todoTitle.trim() !== "") {
        axios
          .post("/todo", {
            todo: this.todoTitle.trim()
          })
          .then(res => {
            this.$router.push("/");
          });
      }
    }
  }
};
</script>
<style>
.div1 {
  display: flex;
  justify-content: center;
}

.div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
