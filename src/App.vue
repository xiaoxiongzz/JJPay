<template>
  <div class="app">
    <Header />
    <router-view></router-view>
    <!-- 在home,search是显示的，在登录、注册是隐藏的 -->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'" /> -->
    <Footer v-show="controlShow" />
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: { Header, Footer },
  methods: {
    controlShow() {
      $route.meta.show;
    },
  },
};
</script>

<style>
</style>