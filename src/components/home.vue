<template>
  <div>
    <lay_bottom v-if="!($route.path=='/show'||$route.path=='/user')"></lay_bottom>  
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"/> 
  </div>
</template>

<script>
import lay_bottom from "@/components/layout/lay_bottom";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {},
  components: {
    lay_bottom
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>


