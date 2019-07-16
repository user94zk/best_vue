<template>
  <div id="lr">
    <div class="table">
      <div class="tables_l" @click="logins" :class="{actived:active==0}">登录</div>
      <div class="tables_r" @click="registers" :class="{actived:active==1}">注册</div>
    </div>
    <!-- 注册 -->
    <div class="register" v-show="active==1">
      <form>
        <p>
          账号：
          <input v-model="uname">
        </p>
        <p>
          密码：
          <input type="password" v-model="upwd">
        </p>
        <p>
          昵称：
          <input type="password" v-model="name">
        </p>
        <p>
          <button v-fileUpload="{multiple:false,fn:'fileUpload'}">头像上传</button>
        </p>
        <p>
          <button @click.prevent="register">注册</button>
        </p>
      </form>
      <img :src="imgUrl"  style="display:none">
    </div>

    <!-- 登录 -->
    <div class="login" v-show="active==0">
      <form>
        <p>
          账号：
          <input type="text" v-model="uname">
        </p>
        <p>
          密码：
          <input type="password" v-model="upwd">
        </p>
        <p>
          <button @click.prevent="login">登录</button>
        </p>
      </form>
      <div class="back" @click="back">
          返回
      </div>
    </div>
  </div>
</template>
<script>
import Store from "storejs";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      infoList: [{ name: "登录" }, { name: "注册" }],
      active: 0,
      uname: "",
      upwd: "",
      userInof: {},
      name: "",
      imgUrl: ""
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    // 注册
    register() {
        if(this.uname==""||this.upwd==""){
            MessageBox('操作失败', '用户名不能为空')
            return
        }
      var objdata = {
        id: 1,
        username: this.uname,
        password: this.upwd,
        avatar: this.imgUrl,
        name: this.name
      };

      this.$apis.edit(objdata).then(res => {
           console.log(res);
          if(res.data.code==0){
              MessageBox('操作成功', '账号已存在')
          }

        if (res.data.code == 1) {
          this.$store.commit("saveUserInfo", res.data.reqdata);
          MessageBox('操作成功', '注册成功')
          this.active = 0;
        }
       
      });
    },

    // 登录
    login() {
      var data = {
        uname: this.uname,
        upwd: this.upwd
      };
      this.$apis.login(data).then(res => {
        console.log(data);
        //0 账号不存在
        // 1 success
        // 2 密码错误
        if (res.data.code == 0) {
          MessageBox('操作失败', '账号不存在')
        } else if (res.data.code == 1) {
          this.$store.commit("saveUserInfo", res.data.data);
          Store.set("userInfo", res.data);
          MessageBox('操作成功', '登录成功')
          this.$router.push({
            path: "/userInfo"
          });
        } else {
        MessageBox('操作失败', '密码错误')
        }
      });
    },
    // table栏
    logins() {
      this.active = 0;
    },
    registers() {
      this.active = 1;
    },
    pageInit() {
      if (Store.get("userInfo")) {
        this.$router.push({
          path: "/userInfo"
        });
      }
    },
    //头像上传
    fileUpload(str) {
      console.log(str);
      this.imgUrl = str;
    },
    //
    back(){
         this.$router.go(-1);
    }

    
  }
};
</script>
<style lang="scss" scoped>
@keyframes ident {
  0% {
    left: 100vw;
  }
  100% {
    left: 0;
  }
}
@keyframes identx {
  0% {
    left: 0vw;
  }
  100% {
    left: 100;
  }
}
#lr {
    position: relative;
  height: 100vh;
  animation: ident 1s;
  // animation: identx 1s;
  background: linear-gradient(rgba(54, 209, 220, 1), rgba(9, 152, 154, 1));
  position: relative;
  .table {
    height: r(100);
    display: flex;
    .tables_l {
      flex: 1;
      font-size: r(40);
      line-height: r(100);
      color: #fff;
    }
    .tables_r {
      flex: 1;
      font-size: r(40);
      line-height: r(100);
      color: #fff;
    }
  }
  .actived {
    border-bottom: 2px solid #fff;
  }
  .login {
    overflow: hidden;
    color: #fff;
    form {
      margin-top: r(52);
      overflow: hidden;
      p {
        overflow: hidden;
        margin-top: r(50);
        font-size: r(32);
        float: left;
        width: 100%;
        input {
          height: r(40);
          border-bottom-color: #fff;
          border-style: none none solid none;
          outline: none;
          width: 80%;
          background-color: transparent;
        }
        button {
          font-size: r(40);
          width: r(600);
          height: r(80);
          float: left;
          margin-left: r(100);
          outline: none;
          border: 1px solid #fff;
          border-radius: 20px;
          color: #fff;
          background-color: transparent;
        }
      }
    }
  }
  .register {
    color: #fff;
    overflow: hidden;
    form {
      overflow: hidden;
      margin-top: r(52);
      p {
        overflow: hidden;
        margin-top: r(50);
        font-size: r(32);
        float: left;
        width: 100%;
        input {
          height: r(40);
          border-bottom-color: #fff;
          border-style: none none solid none;
          outline: none;
          width: 80%;
          background-color: transparent;
        }
        button {
          font-size: r(40);
          width: r(600);
          height: r(80);
          float: left;
          margin-left: r(100);
          background-color: transparent;
          border: 1px solid #fff;
          outline: none;
          border-radius: 20px;
          color: #fff;
        }
      }
    }
  }
  .back{
      width:r(200);
      height:r(200);
      font-size:r(40);
      position: absolute;
      bottom:200px;
      right:0;
  }
}
</style>

