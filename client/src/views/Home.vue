<template>
  <div class="home">
    <ol>
      <li v-for="(items, index) in data" v-bind:key="{index}">{{items.title}}</li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      data: []
    };
  },
  created() {
    axios.get("/todos").then(res => {
      this.data = res.data;
    });
  }
};
</script>
