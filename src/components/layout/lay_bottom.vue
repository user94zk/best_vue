<template>
  <div id="bottom-table">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item
        v-for="(item,index) in routePath"
        :id="item.key"
        :key="index"
        @click.native="tab(index)"
      >
      <i :class="item.ico"></i>
      <p> {{item.name}}</p>
       <div class="num" v-if="$store.state.count!=0">{{$store.state.count}}</div>
      </mt-tab-item>
    </mt-tabbar>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
  routePath: [
        { name: "首页", path: "/index",key:"index",ico:['fa','fa-home','fa-lg']},
        { name: "分类", path: "/class",key:"class",ico:['fa','fa-align-justify','fa-lg']},
        { name: "购物车", path: "/cart",key:"cart",ico:['fa','fa-shopping-cart','fa-lg','fly']},
        { name: "我的", path: "/user",key:"user",ico:['fa','fa-user','fa-lg']}
      ]    
  }
  },
  methods: {
    tab(index) {
      this.$router.push({
        path: this.routePath[index].path, 
      });
    }
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
img{
  width: r(35*2);
  height: r(40*2);
}
mt-tab-item{
  background: #fff;
}
#bottom-table{
  .num{
position: absolute;
    right: 32.3vw;
    bottom: 8vw;
    background: #f2495e;
    border-radius: 50px;
    width: 3.73vw;
    height: 3.73vw;
    text-align: center;
    line-height: 3.73vw;
    font-size: 3vw;
    color: #fff;
}
  
  i{
    font-size:r(40);
    display:block;
  }
  p{
    margin-bottom: r(10);
    margin-top:r(15);
  }
  .mint-tab-item{
    padding-bottom: 0;
  }
}

</style>


