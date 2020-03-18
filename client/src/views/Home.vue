<template>
  <div id="Home" class="div1">
    <div class="div2 col-4">
      <div
        style="width: 100%"
        v-for="todo in todos"
        v-bind:key="todo._id"
        class="alert"
        v-bind:class="{'alert-warning':todo.completed, 'alert-primary': !todo.completed}"
      >
        <a
          style="float: left"
          href="#"
          @click.prevent="Done(todo)"
          class="badge"
          v-bind:class="{'badge-warning':todo.completed, 'badge-success': !todo.completed}"
        >{{ !todo.completed ? 'Done' : 'Pending' }}</a>
        {{todo.title}}
        <button @click.prevent="Delete(todo._id)" type="button" class="close">
          <span>&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      todos: []
    };
  },
  created() {
    this.FetchAllTodos();
  },
  methods: {
    FetchAllTodos() {
      axios.get("/todos").then(res => {
        this.todos = res.data;
      });
    },
    Done(todo) {
      if (todo.completed) {
        axios.get(`/todou/${todo._id}`).then(res => {
          this.FetchAllTodos();
        });
      } else {
        axios.get(`/todoc/${todo._id}`).then(res => {
          this.FetchAllTodos();
        });
      }
    },
    Delete(id) {
      axios.delete(`/todo/${id}`).then(res => {
        this.FetchAllTodos();
      });
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
