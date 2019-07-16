111 16:59:08
<template>
    <div id="box" >
        <div class="top">
            <div><span >头像</span><img :src="userInfo.data.avatar" v-fileUpload="{multiple:false,fn:'fileUpload'}"></div>
            <div><span>昵称</span><span>{{userInfo.data.username}}<img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt=""></span></div>
            <div><span>真实姓名</span><span>{{userInfo.data.name}}<img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt=""></span></div>
            <div><span>性别</span><span>男<img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt=""></span></div>
            <div><span>手机号</span><span>166****0323<img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt=""></span></div>
            <div><span>修改密码</span><span><img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt=""></span></div>
        </div>

        <div class="bot"><span @click="outlog">退出登录</span></div>
    </div>
</template>

<script>
var vm="";
import Store from "storejs";
import { MessageBox } from "mint-ui";
export default {
   
  data () {
    return {
      userInfo : '',
    }
  },
  mounted () {
 
        this.pageInit()
   
  },
  methods:{
        //头像上传
    fileUpload(str) {
      console.log(str);
      this.imgUrl = str;
    },
      pageInit(){
          this.userInfo=Store.get("userInfo");
          console.log(this.userInfo)
      },
      outlog(){
          MessageBox.confirm('确定退出登录吗').then(action => {
                 this.userInfo='';
        Store.set("userInfo",this.userInfo);
        this.$router.push({
          path: "/index",
          });
}).catch(()=>{});
       
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top{
    text-align: left;
    div{
        font-size: 3.7334vw;
        border-bottom: 1px solid #ccc;
        margin-left: 4vw;
        span:nth-child(1){
            display: inline-block;
            color: #333;
            margin-top: 6vw;
            margin-bottom: 6vw;   
        }
        span:nth-child(2){
            float: right;
            margin-right: 6vw; 
            margin-top: 6vw;     
            img{
                padding-left: 5vw;
                width : 2vw;
            }
        }
     }
     div:nth-child(1){
         img{
             float: right;
             width: 12vw;
             padding-top:1vh; 
             margin-right: 6vw;
         }
     }
}
.bot{
    text-align: center;
    color: #f2495e;
    font-size: 3.7334vw;
    line-height: 3.7334vw;
    margin-top: 5vh;
}
</style>
