<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="(items, index) in data" v-bind:key="{index}">{{items.title}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      data: []
    };
  },
  components: {
    HelloWorld
  },
  created() {
    axios.get("/hay").then(res => {
      this.data = res.data;
    });
  }
};
</script>
