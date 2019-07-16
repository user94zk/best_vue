<template>
  <div id="my">
    <div class="top_box">
      <div>
        <img :src="userInfo.avatar" alt="" @click="loginOut">
      </div>
    </div>
    <div class="id">{{userInfo.name}}</div>
    <div class="center_box">
            <div class="font">
                <div class="">会员等级</div>
                <div class="">V0</div>                
            </div>
            <div class="font">
                <div class="">吉致币</div>
                <div class="">0</div>
            </div>
            <div class="font">
                <div class="">优惠券</div>
                <div class="">0</div>
            </div>
            <div class="font">
                <div class="">兑换券</div>
                <div class="">0</div>
            </div>
    </div>
    <div class="bot_box">
            <div class="b_box b_box1">
                <div class="">
                  <img src="https://res.bestcake.com\m-images\order\mw-person-dd.png">
                </div>
                <div class="">我的订单</div>
                <div class="" style="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg">
                </div>
            </div>
            <div class="b_box">
                <div class="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg">
                </div>
                <div class="">收货地址</div>
                <div class="" style="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg">
                </div>
            </div>
      </div>
      <div class="kf">
        <span>客服热线：400-627-5757</span>
      </div>
  </div> 
</template>
<script>

export default {
  name: '',
  data () {
    return {
      msg: 'wode',
      userInfo:""
    }
  },
  mounted(){
     this.pageInfo()
                
  },
  methods: {
    pageInfo(){
      this.userInfo=this.$store.state.userInfo;
      console.log(this.userInfo)
    },
    loginOut(){
         this.$router.push({
            path: "/back"
          });
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body{
  font-weight: 400;
    line-height: 1.6;
    color: #333;
    font-size: 1.6rem;
}
.top_box{
  width: 100%;
  padding-top: 6.66vw;
  text-align: center;
  img{
    width: 21.06vw;
    border-radius: 50%;
  }
}
.id{
    width: 100%;
    text-align: center;
    padding-top: 1.33vw;
    line-height: 5.33vw;
    font-size: 3.73vw;
    color: #333;
}
.center_box{
    overflow: hidden;
    padding-top: 8.66vw;
    background: #fff;
    padding-bottom: 4vw;
    text-align: center;
    border-bottom: 4vh solid #f4f4f4;
    .font{
      float: left;
      width: 25%;
      line-height: 6vh;
      color: #333;
      font-size: r(32);
    }
}
.bot_box{
    padding-left: 5vw;
    .b_box1{
      border-bottom: 1px solid #ccc;
    }
    .b_box{
      margin-top: 4vw;
      padding-bottom: 2vh;
      float: left;
      width: 100%;
      height: 8vh;
      div:nth-child(1){
        padding-top: 3vw;
        float: left;
        img{
          width : 4vw;
        }

      }
      div:nth-child(2){
        float: left;
        padding-left: 2.66vw;
        padding-top: 3.86vw;
        padding-bottom: 3.86vw;
        font-size: r(24);
      }
      div:nth-child(3){
        padding-top: 2.8vw;
        float: right;
        width: 2.4vw;
        margin-right: 6vw ;
      }
    }
  }
  .kf{
    position: absolute;
    bottom: -46vh;
    left: 35%;
    color: #999;
    font-size: 3vw;
  }
</style>
