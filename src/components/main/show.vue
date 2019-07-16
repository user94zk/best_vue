<template>
  <!-- 轮播 -->
  <div id="show">
    <div class="s-top">
      <div class="swipe">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
            <img class="imgs" :src="item">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="s-name">
        {{goodsList.Name}}
        <div class="kong"></div>
      </div>
    </div>
    <!-- 商品简介 -->
    <div class="goods">
      <div class="cake-l cake-a">
        <div class="cake-info-left">甜度</div>
        <div class="cake-info-right">
          <img :src="url">
        </div>
      </div>
      <div class="cake-l cake-b">
        <div class="cake-info-left">口味</div>
        <div class="cake-info-right">{{goodsList.CategoryName}}</div>
      </div>
      <div class="cake-l cake-c">
        <div class="cake-info-left">原材料</div>
        <div class="cake-info-right">{{goodsList.Resourse}}{{goodsList.Resource}}</div>
      </div>
      <div class="cake-l cake-d">
        <div class="cake-info-left">适合人群</div>
        <div class="cake-info-right">所有人群</div>
      </div>
      <div class="cake-l cake-e">
        <div class="cake-info-left">保鲜条件</div>
        <div
          class="cake-info-right"
        >最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。</div>
      </div>
    </div>

    <!-- 评价 -->
    <div class="pj">
      <div class="pj-left">
        <div class="pj1-left">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png">
        </div>
        <div class="pj1-right">商品评价</div>
      </div>
      <div class="pj-right">
        <div class="pj2-right">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png">
        </div>
        <div class="pj2-left">(1324)条</div>
      </div>
    </div>
<!-- 规格 -->
    <div class="zhongliang">
      <div class="z-top">
        <div class="li-select" v-for="(item,index) in sizeList" :key="index" @click="selSize(index)" :class="{liselected:selNum==index}">{{item.Size}}</div>
      </div>
      <div class="z-bottom">
        <div class="zzz xx">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png">
          </div>
          <div class="right">13.5*13.5cm</div>
        </div>
        <div class="zzz xx">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png">
          </div>
          <div class="right">适合4-5人分享</div>
        </div>
        <div class="zzz yy">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png">
          </div>
          <div class="right">含五人份餐具</div>
        </div>
        <div class="zzz yy">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png">
          </div>
          <div class="right">至少需提前一天预约</div>
        </div>
      </div>
    </div>

    <!-- 购买数量 -->
    <div class="buy">
      <div class="buy-left">购买数量</div>
      <div class="buy-right">
        <button class="del" @click="del">-</button>
        <span v-if="isLoad">{{num}}</span>
        <button class="add" @click="addx">+</button>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="jg-gonggao">
      <div class="jg-gonggao1">
        <div class="jg-text-z">划线价格</div>
        <div class="jg-text-y">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。{{showList}}</div>
      </div>
      <div class="jg-gonggao1">
        <div class="jg-text-z">未划线价格</div>
        <div class="jg-text-y">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>
    <div class="kong"></div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="bottom-letf1" v-if="isLoad">{{activeList.CurrentPrice*num|setPrice}}</div>
        <div class="bottom-left2">
          <div class="b-l">已优惠 :</div>
          <div class="b-l2">0.00</div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="br">立即购买</div>
      </div>
      <div class="bottom-center">
        <div class="bc" @click="add">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from "mint-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      bannerList: [],
      goodsList: [],
      infoList: [],
      goods:{},
      sizeList:[],
      showData:{},
      selNum:0,
      activeList: {},
      nums:1, 
      sweetList:"",
      url:'',
      showList:[],
      isLoad:false,
      allPrice:0,
      num:0

    };
  },
  mounted() {
     Indicator.open();
    this.pageInit();
    // this.activeList = this.sizeList[0];
    // console.log(this.goods);
    
    // this.activeList = this.sizeList[0];
  },
  methods: {
    pageInit() {
      // 初始化执行

      // ns  KSK-0110-1   RP-0005-58
      //  console.log(this.$route.query.c.indexOf("ns")!=-1);
      //  console.log(this.$route.query.c.indexOf("KSK")!=-1);
      //  console.log(this.$route.query.c.indexOf("RP")!=-1);

      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          this.goodsList = res.data.Tag[7];
          this.infoList = res.data.Tag[7];
          this.goods=res;
          
        });
        this.setBannerList("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          this.goodsList = res.data.Tag.infos;
          this.infoList = res.data.Tag.infos.CakeType[0];
          this.goods=res;
        });
        this.setBannerList("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          this.goodsList = res.data.Tag[2];
          this.infoList = res.data.Tag[2];
          this.goods=res;
          
        });
        this.setBannerList("rp-detail");
      } else {
        this.GetjzCakeInfo(res => {
          this.goodsList = res.data.Tag[0];
          this.infoList=res.data.Tag[0].CurrentPro
          this.goods=res;
        });
        this.setBannerList("jz-detail");
      }
    
    },
    selSize(index){
      this.selNum=index;
      this.activeList = this.sizeList[index];
      console.log(this.activeList)
     
//  console.log(this.nums)
    },
    del(){
        // var sizeList=[...this.sizeList]
        // sizeList[this.selNum].num--;
        // if(sizeList[this.selNum].num<=1){
        //   console.log(sizeList[this.selNum]);
        //   sizeList[this.selNum].num=1;
        // }
        // this.sizeList=sizeList;
        this.num--;
        if(this.num<=1){
          this.num=1;
        }
        console.log(this.sizeList)
      
    },
    addx(){
      this.num++;
      // var sizeList=[...this.sizeList]
      // sizeList[this.selNum].num++;
      // this.sizeList=sizeList;

    },
    add(){
     MessageBox.confirm('成功添加到购物车').then(action => {       
           var data = {
          num : this.num ,
          id: this.sizeList[this.selNum].ID||this.sizeList[this.selNum].Id,  //产品ID
          Name: this.showData.Name, //产品详情图片拼接,//贝利
          CurrentPrice:this.sizeList[this.selNum].CurrentPrice*this.num, //产品价格
          Size: this.sizeList[this.selNum].Size, //产品规格
          url: this.bannerList[0], //产品购物车显示图片
          SupplyNo:this.sizeList[this.selNum].SupplyNo  //产品货号类型
      }
        this.$store.commit("add",data);
     
      
}).catch(()=>{});
    
    },
    setBannerList(path) {
      //  星光游乐园/星光游乐园-1.jpg
      for (var i = 0; i < 4; i++) {
        // https://res.bestcake.com/m-images/ns-detail/星光游乐园/星光游乐园-1.jpg
        // https://res.bestcake.com/m-images/jd-detail/奥利奥雪域牛乳芝士/奥利奥雪域牛乳芝士-1.jpg
        // https://res.bestcake.com/m-images/rp-detail/奥利奥雪域牛乳芝士/奥利奥雪域牛乳芝士-1.jpg

        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      }
      //   console.log(this.bannerList);
    },

    GetNSCakeByName(callback) {
      // 焦点图详情接口
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      // 商品详情接口
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetjzCakeInfo(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      // 商品详情接口
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    },
    GetRuPCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    }
  },
  watch: {
    goods:{
        handler(){
            var city="上海";
            if(this.goods.data.Tag.length){   
              console.log(this.goods.data.Tag)
            this.goods.data.Tag.forEach(item => {
                if(city==item.City){
                  item.id=item.ID||item.Id;
                  this.sizeList.push(item)
                  this.sweetList=this.sizeList[0].Sweet   
                  console.log(this.sweetList)
                  this.url=`https://res.bestcake.com/m-images/ww/jz/tiandu_${this.sweetList}.png`  
                }
            });             
              if(this.sizeList.length==0){
                this.sizeList=this.goods.data.Tag;
                this.sweetList=this.sizeList[0].CakeType[0].Sweet
                console.log(this.sweetList)
                this.url=`https://res.bestcake.com/m-images/ww/jz/tiandu_${this.sweetList}.png`  
              }  
            this.showData=this.sizeList[0];
            this.activeList=this.sizeList[0]     
            }else{
              this.sizeList=this.goods.data.Tag.infos.CakeType;
             this.showData=this.goods.data.Tag.infos;
             this.sweetList=this.sizeList[0].Sweet
             console.log(this.sweetList)
             this.url=`https://res.bestcake.com/m-images/ww/jz/tiandu_${this.sweetList}.png`  
            //  console.log(this.sweetList)
            this.activeList=this.sizeList[0]
            }

            // this.sizeList.map((item)=>{
            //   item.id=item.ID||item.Id;
            //   item.num=1;
            // })
              this.selSize(0)
              this.isLoad=true;
             Indicator.close();
             this.num=1
        },
        deep:true
    }
  },  
};
</script>

<style scoped lang="scss">
#show {
  .swipe {
    width: 100%;
    height: r(445 * 2);
    .imgs {
      width: 100%;
    }
  }
  .s-name {
    margin-bottom: 4%;
    margin-top: 2%;
    font-size: r(38);
    font-weight: bold;
    line-height: 4.53vw;
    .kong {
      margin-bottom: 8vw;
      height: 8vw;
    }
  }
  .goods {
    margin-top: 4%;
    border-top: r(30) solid #fafafa;
    .cake-l {
      width: 100%;
      overflow: hidden;
      .cake-info-left {
        font-size: r(28);
        line-height: r(46);
        float: left;
        width: 15.93%;
        margin-left: 4%;
        color: #9a9a9a;
        vertical-align: top;
      }
      .cake-info-right {
        font-size: r(28);
        float: left;
        line-height: r(46);
        width: 72%;
        margin-left: 4%;
        margin-right: 4%;
        text-align: left;
        img {
          width: 31%;
          margin-top: 0.6%;
          vertical-align: top;
        }
      }
    }
    .cake-a {
      margin-bottom: 2.93%;
      margin-top: 9.066%;
    }
    .cake-b {
      margin-bottom: 4%;
    }
    .cake-c {
      margin-bottom: 4%;
    }
    .cake-d {
      margin-bottom: 4%;
    }
    .cake-e {
      margin-bottom: 9.066%;
    }
  }

  .zhongliang {
    margin-top: 4%;
    border-bottom: r(30) solid #fafafa;
    box-sizing: border-box;
    .z-top {
      margin-top: 8%;
      overflow: hidden;
      .li-select {
        float: left;
        font-size: 3.73vw;
        text-align: center;
        line-height: r(60);
        padding: 0 3.5875%;
        height: r(60);
        margin-left: 4%;
        background: #fff;
        border-radius: 2px;
        color: #333;
        border: 1px solid #ddd;
      }
      .liselected {
        background: #02d3d6;
        border-radius: 2px;
        color: #fff;
        border: 1px solid #02d3d6;
      }
    }
    .z-bottom {
      margin-top: 11.33%;
      overflow: hidden;
      .zzz {
        overflow: hidden;
        width: 50%;
        float: left;
        .left {
          float: left;
          width: 12%;
          margin-right: 2.66%;
          margin-left: 4%;
          img {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
        .right {
          float: left;
          line-height: 6.5vw;
          font-size: 3.73vw;
        }
      }
      .yy {
        margin-bottom: 8%;
      }
      .xx {
        margin-bottom: 4%;
      }
    }
  }

  .pj {
    border-top: r(30) solid #fafafa;
    border-bottom: r(30) solid #fafafa;
    overflow: hidden;
    margin-top: 4%;
    padding: 4%;
    .pj-left {
      width: 46%;
      overflow: hidden;
      float: left;
      margin-top: 1%;
      .pj1-left {
        float: left;

        margin-top: 1.2%;
        margin-right: 2.93%;
        width: 12%;
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
      }
      .pj1-right {
        float: left;
        font-size: r(30);
      }
    }
    .pj-right {
      float: right;
      overflow: hidden;
      width: 45%;
      .pj2-left {
        float: right;
        font-size: 3.73vw;
        margin-top: 1.3%;
        margin-left: 1.6%;
        width: 45%;
        color: #9a9a9a;
        font-size: r(30);
      }
      .pj2-right {
        float: right;
        width: 10%;
        margin-top: 3%;
        img {
          width: 65%;
        }
      }
    }
  }
  .buy {
    padding: 4%;
    overflow: hidden;
    .buy-left {
      float: left;
      font-size: r(26);
    }
    .buy-right {
      float: right;
      span {
        display: inline-block;
        width: r(30);
        font-size: r(30);
        font-style: normal;
      }
      .del {
        border: none;
        outline: none;
        text-align: center;
        width: r(40);
        background: #fff;
        font-size: r(34);
      }
      .add {
        border: none;
        outline: none;
        text-align: center;
        width: r(40);
        background: #fff;
        font-size: r(34);
      }
    }
  }

  /* // 底部 */
  .jg-gonggao {
    padding: 2% 0;

    background: #fafafa;
    .jg-gonggao1 {
      margin-top: 4%;
      margin-left: 4%;
      margin-bottom: 4%;
      margin-right: 4%;
      font-size: r(26);
      overflow: hidden;
      text-align: left;
      .jg-text-z {
        float: left;
        width: 27%;
        color: #181818;
      }
      .jg-text-y {
        float: left;
        width: 65%;
        color: #a2a2a2;
        line-height: r(46);
      }
    }
  }
  .kong {
    height: r(105);
  }
  .bottom {
    margin-top: 4%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    overflow: hidden;
    background: #fff;
    .bottom-left {
      float: left;
      margin-left: 4%;
      margin-top: 1.4492%;
      width: 36%;
      overflow: hidden;
      text-align: left;
      .bottom-letf1 {
        color: #f2495e;
        font-weight: bolder;
        font-size: r(48);
      }

      .bottom-left2 {
        overflow: hidden;
        .b-l {
          float: left;
          font-size: r(26);
        }
        .b-l2 {
          float: left;
          font-size: r(18);
          color: #333;
          font-weight: bolder;
          margin-top: 3%;
        }
      }
    }
    .bottom-center {
      float: right;
      width: 29.335vw;
      text-align: center;
      padding: 4.3478% 0;
      font-size: r(38);
    }
    .bottom-right {
      float: right;
      width: 30.667vw;
      text-align: center;
      padding: 4.3478% 0;
      background: #02d4d7;
      color: white;
      font-weight: bolder;
      font-size: r(38);
    }
  }
}
</style>


