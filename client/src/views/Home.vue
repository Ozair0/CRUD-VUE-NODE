<template>
  <div id="Home" class="container">
    <ul style="list-style-type: none;">
      <li v-for="todo in todos" v-bind:key="todo._id">{{todo.title}}</li>
    </ul>
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
    axios.get("/todos").then(res => {
      this.todos = res.data;
    });
  }
};
</script>