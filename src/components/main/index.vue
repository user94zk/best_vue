<template>
  <div id="wrap">
    <!-- 城市定位 -->
    <div class="city" @click="city1">{{this.$store.state.cityList||'上海'}}</div>
    <div class="c_city" v-show="cityFlag">
      <div class="chooseCity">
        <div class="chooseTitle">
          <span>选择城市</span>
        </div>
        <ul @click="selectCity($event)">
          <li>
            <span>上海</span>
          </li>
          <li>
            <span>北京</span>
          </li>
          <li>
            <span>天津</span>
          </li>
          <li>
            <span>重庆</span>
          </li>
        </ul>
        <ul @click="selectCity($event)">
          <li>
            <span>苏州</span>
          </li>
          <li>
            <span>无锡</span>
          </li>
          <li>
            <span>南京</span>
          </li>
          <li>
            <span>杭州</span>
          </li>
          <li>
            <span>宁波</span>
          </li>
          <li>
            <span>绍兴</span>
          </li>
          <li>
            <span>成都</span>
          </li>
          <li>
            <span>常州</span>
          </li>
          <li>
            <span>台州</span>
          </li>
          <li>
            <span>嘉兴</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in BannerList" :key="index">
          <a>
            <img :src="'https://res.bestcake.com'+item" alt>
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <div v-for="(item,index) in navCakeList" :key="index">
        <a>
          <img :src="item.ImgUrl" class="icon">
        </a>
        <p>{{item.ActName}}</p>
      </div>
    </div>
    <!-- 焦点图 -->
    <div class="guanggao">
      <div v-for="(item,index) in icoImgList" :key="index" class="guanggao_child">
        <img :src="item.ImgUrl" class="guanggao-img" @click="toShow(item)">
      </div>
    </div>
    <!-- 魔法猜星 -->
    <div class="magic">
      <div>
        <img src="https://res.bestcake.com/m-images-2/mofa.png" class="caixing">
      </div>
      <div class="title">任选一款，走进你的心</div>
      <div class="tab_btn">
        <div
          v-for="(item,index) in tabClass"
          :key="index"
          @click="setTab(index)"
          :class="{selcted:tabActive==index}"
        >{{item}}</div>
      </div>
      <div class="m-list">
        <div v-for="(item,index) in activeList" :key="index" class="mList">
          <img :src="item.ImgUrl" class="m-img" @click="toShow(item)">
          <div class="m-name">{{item.Name}}</div>
          <div class="m-price">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>/{{item.Size}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 品质甄选 -->
    <div class="goodsList">
      <div>
        <img src="https://res.bestcake.com/m-images-2/pinzhi.png" class="zhenxuan">
      </div>
      <div class="z-title">没尝过这些美味的人生，是不完美的</div>
      <div class="pzList" v-for="(item,index) in goodList" :key="index">
        <div class="pz_img">
          <img v-lazy="item.ImgUrl" @click="toShow(item)">
        </div>
        <div class="pz-title">
          <div class="pz-name">{{item.Name}}</div>
          <div class="pz-info">{{item.MoreUrl}}</div>
          <div class="pz-tip" v-for="(item,index) in pzImgList" :key="index">
            <img :src="item.ImgUrl">
          </div>
          <div class="pz-price">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>.00</span>
            <span>/{{item.Size}}</span>
          </div>
        </div>
        <a class="shopCart">
          <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" @click="add($event,item)">
        </a>
      </div>
    </div>
    <div class="jg-gonggao">
      <div class="jg-gonggao1">
        <div class="jg-text-z">划线价格</div>
        <div class="jg-text-y">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>
      <div class="jg-gonggao1">
        <div class="jg-text-z">未划线价格</div>
        <div class="jg-text-y">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>
    <div class="kong"></div>
    <div class="gwc_zb"></div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import "@/common/js/fly";
export default {
  name: "HelloWorld",
  data() {
    return {
      //tab魔法猜心数据
      tabClass: ["送长者", "送恋人", "送挚友", "送亲子"],
      cityFlag: false,
      activeList: [],
      tabActive: 0,
      BannerList: [],
      navCakeList: [],
      num: 1,
      pzImgList: [
        { ImgUrl: "https://res.bestcake.com/m-images-2/icon_zy.png" },
        { name: "https://res.bestcake.com/m-images-2/pinzhi-cart.png" }
      ],
      icoImgList: [
        {
          name: "宠爱少女",
          key: "宠爱少女",
          ImgUrl: "https://res.bestcake.com/m-images-2/guanggao1.png?v=0419"
        },
        {
          name: "小猪蛋糕-贝利",
          key: "贝丽",
          ImgUrl: "https://res.bestcake.com/m-images-2/guangao22.png?v=0419"
        },
        {
          name: "星光游乐园",
          key: "星光游乐园",
          ImgUrl: "https://res.bestcake.com/m-images-2/guanggao3.png"
        }
      ],
      // 魔法猜心所有数据
      tabList: [],
      // 品质甄选所有数据
      goodList: [],
      city:"",
    };
  },
  mounted() {
    
    Indicator.open();
    this.GetBannerList()
     
      // // 3张焦点图数据
      // res.forEach(item => {
      //   item.ImgUrl = "https://res.bestcake.com/" + item.ImgUrl;
      // 
      // });
      // this.bannerList = res;
      // Indicator.close();
    
   
        
    Indicator.open();
    this.GetIndexCakeList();
      Indicator.close();
    this.GetNewCakeList()
    
  },
  methods: {
    // 城市
    selectCity(e) {
      this.cityFlag = false;
      this.$store.state.cityList = e.path[0].innerText;
     this.GetNewCakeList()
     this.setBanner()
    },
    // city
    city1() {
      this.cityFlag = true;
    },
    add(e, item) {
      flay(e, item.ImgUrl);
      var data = {
        num: this.num,
        id: item.Pid, //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
        SupplyNo: item.SupplyNo //产品货号类型
      };
      this.$store.commit("add", data);
    },

    toShow(item) {
      //图片焦点图跳转详情页
      var data = {
        key: item.Name || item.key,
        c: item.SupplyNo || "NS"
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },
    setTab(index) {
      var activeList = [];
      this.tabList.forEach(item => {
        if (this.tabClass[index] == item.ActiveName) {
          activeList.push(item);
        }
      });
      this.activeList = activeList.slice(0, 3);
      this.tabActive = index;
    },
    //轮播图
    setBanner(){
      let banner=[];
      this.GetBannerList(res=>{
        res.forEach(item=>{
            banner.push(item.ImgUrl)
        });
      });
      this.BannerList=banner
    },
    //接口部分
    GetBannerList(callback) {
      var data = {
        v: 1560136745430,
        c: "Index",
        m: "GetBannerList",
        Type: 2,
        City: this.$store.state.cityList
      };
      this.$apis.GetBannerList(data).then(res => {
         res.data.Tag.List.forEach(element => {
          this.BannerList.push(element.ImgUrl);
        });
      });
      
    },
     GetIndexCakeList() {
      var data = {
        v: 1560150030822,
        c: "Index",
        m: "GetIndexCakeList"
      };
      this.$apis.GetIndexCakeList(data).then(res => {
        res.data.Tag.list.forEach(element => {
          if (element.TabType == 4) {
            //type=4魔法菜心 all
            // tab 魔法猜心数据制作完毕
            this.tabList.push(element);
          } else {
            this.goodList.push(element);
          }
        });
        this.setTab(0);
          Indicator.close();
      });
    },
    GetNewCakeList(){
      this.city = this.$store.state.cityList;
      this.navCakeList=[];
      this.path=[];
       var data = {
      v: '1561449732333',
      c: 'NewIndexController',
      m: 'index'
    }
      this.$apis.GetIndexCakeList(data).then(res => {
        res.data.Tag.mainresult.TopIconList.forEach(item=>{
        
          if(item.City.indexOf(this.$store.state.cityList)!=-1){
            this.navCakeList.unshift(item)
      
          }
        })
        Indicator.close();
      });
  
    }
  }
};

// 飞购物车
function flay(e, ImgUrl) {
  var flyer = $(
    `<img class="flyer-img" src=${ImgUrl} style="width:70px;height:70px">`
  );
  var top = $(window).scrollTop();
  var dh = event.pageY;
  var newh = dh - top;
  //  购物车节点位置,决定图片飘的位置
  var oBtn = $(".gwc_zb").offset();
  var newdh = oBtn.top - top;
  //  console.dir(flyer);

  flyer.fly({
    start: {
      left: event.pageX, //抛物体起点横坐标
      top: newh //抛物体起点纵坐标
    },
    end: {
      left: oBtn.left + 10, //抛物体终点横坐标
      top: newdh //抛物体终点纵坐标
    },
    onEnd: function() {
      this.destory(); //销毁抛物体
    }
  });
}
</script>

<style scoped lang="scss">
#wrap {
  .city {
    position: absolute;
    left: 0;
    top: 4vw;
    background-color: rgba(255, 255, 255, 0.5);
    background-image: url(https://res.bestcake.com/m-images-2/location.png);
    background-repeat: no-repeat;
    width: 16vw;
    height: 8vw;
    border-radius: 0vw 1.2vw 1.2vw 0vw;
    line-height: 8vw;
    background-size: 6.4vw 6.4vw;
    background-position: 0.8vw 0.8vw;
    padding-left: 5.2vw;
    text-align: center;
    z-index: 1;
    font-size: r(28);
  }
  .banner {
    height: r(380);
    margin: 0;
    padding: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .nav {
    padding: 0 r(23) r(30);
    border-bottom: r(20) solid #fafafa;
    position: relative;
    overflow: hidden;
    > div {
      float: left;
      width: 25%;
      height: r(152);
      margin-top: r(24);
      text-align: center;
      .icon {
        width: r(100);
        height: auto;
        display: inline-block;
      }
    }
  }
  .guanggao {
    padding: 1%;
    overflow: hidden;
    .guanggao_child {
      float: left;
      width: 48%;
      padding-left: 1.3%;
      .guanggao-img {
        width: 100%;
      }
    }
  }

  .magic {
    width: 100%;
    .caixing {
      width: 100%;
      margin-bottom: r(20);
      margin-top: r(50);
    }
    .title {
      width: 100%;
      color: #999;
      text-align: center;
      margin-bottom: r(32);
      font-size: r(20);
    }
    .tab_btn {
      display: flex;
      justify-content: space-between;
      padding: 0 r(30);
      div {
        width: r(120);
        height: r(66);
        text-align: center;
        line-height: r(62);
        font-size: r(24);
        color: #333;
        background: url(https://res.bestcake.com/m-images-2/mofa-1.png)
          no-repeat center center;
        background-size: 16vw 8.8vw;
      }
      .selcted {
        background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
        color: #fff;
      }
    }
    .m-list {
      padding-left: 4%;
      padding-right: 5%;
      display: flex;
      justify-content: space-between;
      border-bottom: 2.6vw solid #fafafa;
      padding-bottom: 5.3%;
      .mList {
        float: left;
        width: 28%;
        height: 100%;
        text-align: center;
        .m-img {
          width: 100%;
          height: r(200);
        }
        .m-name {
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 10%;
        }
        .m-price {
          span:nth-child(1) {
            font-size: r(20);
            color: rgb(255, 51, 0);
          }
          span:nth-child(2) {
            font-size: r(32);
            color: rgb(255, 51, 0);
          }
          span:nth-child(3) {
            font-size: r(12);
            color: #d4d4d4;
          }
        }
      }
    }
  }
  .goodsList {
    .zhenxuan {
      margin: 6.67% 0 2.667% 0;
    }
    .z-title {
      margin-bottom: 8%;
      text-align: center;
      color: #999;
      font-size: r(20);
      line-height: r(20);
    }
  }
  .pzList {
    overflow: hidden;
    margin-bottom: 3.2%;
    padding-left: 4%;
    padding-right: 4%;
    position: relative;
    .pz_img {
      width: 31.8%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pz-title {
      float: left;
      margin-left: 4%;
      height: 20%;
      div {
        max-width: 50vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .pz-name {
        color: #333;
        margin-top: 1%;
        font-size: r(38);
      }
      .pz-info {
        font-size: r(28);
        color: #999;
        margin-bottom: 3%;
      }
      .pz-tip {
        height: 4.8%;
        font-size: 0;
        img {
          width: r(64);
          height: 100%;
          margin-right: 0.4%;
          vertical-align: middle;
          border: 0;
        }
      }
      .pz-price {
        height: r(60);
        line-height: r(60);

        span:nth-child(1) {
          font-size: r(30);
          color: rgb(255, 51, 0);
        }
        span:nth-child(2) {
          font-size: r(38);
          color: rgb(255, 51, 0);
        }
        span:nth-child(3) {
          font-size: r(12);
          color: rgb(255, 51, 0);
        }
        span:nth-child(4) {
          font-size: r(12);
          color: #d4d4d4;
        }
      }
    }
    .shopCart {
      width: 10%;
      position: absolute;
      right: r(20);
      bottom: 0;
      img {
        width: 100%;
      }
    }
  }
  /* // 底部 */
  .jg-gonggao {
    padding: 2% 0;
    .jg-gonggao1 {
      margin-left: 4%;
      margin-bottom: 4%;
      margin-right: 4%;
      font-size: r(26);
      overflow: hidden;
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
    height: r(95);
  }
  .gwc_zb {
    position: fixed;
    bottom: 0;
    right: 25%;
    height: r(50);
    width: 25%;
    background-color: blueviolet;
  }
  .flyer-img {
    width: r(50);
    height: r(50);
  }
  .chooseCity {
    background: rgb(255, 255, 255);
    position:absolute;
    width: 77.33vw;
    left: 11.47vw;
    top: 8.84vh;
    margin-left: auto;
    margin-right: auto;
    opacity: 1;
}
.c_city {
  z-index: 999999;
    width: 100%;
    height: 100%;
    /* opacity: .9; */
    background:rgba(3,3,3,0.5);
    position: absolute;
    top: 0px;
    left: 0px;
    right:0px;
}
.chooseTitle {
    text-align: center;
    border-bottom: 0.15vw solid rgb(51, 51, 51);
    display: block;
    width: 20vw;
    font-size: 4.26vw;
    padding-top: 2.39vh;
    padding-bottom: 1.79vh;
    margin: auto;
    line-height: 3.37vh;
    margin-bottom: 5.24vh;
}
.chooseCity ul {
    margin-bottom: 2.24vh;
    font-size: 4.6vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    li {
        margin-bottom: 2.24vh;
        text-align: center;
        padding: 1vh 3vw;
        list-style: none;
        span {
            width: 18.66vw;
            color: #333;
            font-size: 3.73vw;
            line-height: 4.94vh;
            display: block;
        }
    }
}
}
</style>