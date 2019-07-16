<template>
  <div class="classX">
             
    <div class="tab">
      <div class="tab-left" @click="three" :class="{tabl:active==1}">自营</div>
      <div class="tab-right" @click="two" :class="{tabl:active==2}">贝式严选</div>
    </div>

    <div class="zy-list" v-show="active==1">
      <div class="zy-tab">
        <div
          class="zy-tab-a"
          @click="optionData(item.mark,index)"
          v-for="(item,index) in one"
          :key="index"
          :class="{actived:tabActive==index}"
        >{{item.name}}</div>
        <!-- <div class="zy-tab-b" @click="optionData(one.mark)">女神</div>
        <div class="zy-tab-c" @click="optionData(one.mark)">伴手礼</div>
        :class="{actived:tabActive==index}"-->
      </div>
      <div class="zy-content">
        <div class="zy-content-list" v-for="(item,index) in activeList" :key="index">
         
          <a>
            <div class="content-a">
              <img :src="item.ImgUrl" @click="toShow(item)">
            </div>
          </a>
          <div class="content-b">
            <span>{{item.Name}}</span>
             <!-- <mt-popup v-model="bln">{{item.Name}}已加入购物车</mt-popup> -->
          </div>
          <div class="content-c">
            <span>{{item.Means}}</span>
          </div>
          <div class="content-d">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>.00</span>
            <span>/ 1.2磅</span>
          </div>
          <div class="content-e">
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click="add(item)">
          </div>
        </div>
      </div>
    </div>
    <div class="bs-list" v-show="active==2">
      <div class="zy-tab">
        <div class="aa actived">乳品</div>
      </div>
      <div class="zy-content">
        <div class="zy-content-list" v-for="(item,index) in activeList" :key="index">
          <a>
            <div class="content-a">
              <img :src="item.ImgUrl" @click="toShow(item)">
            </div>
          </a>
          <div class="content-b">
            <span>{{item.Name}}</span>
          </div>
          <div class="content-c">
            <span>{{item.Means}}</span>
          </div>
          <div class="content-d">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>.00</span>
            <span>/{{item.Size}}</span>
          </div>
          <div class="content-e" @click="add(item)">
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1">
        
          </div>
        </div>
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
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      active: 1,
      goodsList: [],
      activeList: [],
      jzList: [],
      tabActive: 0,
      bln:false,
      num:1,
      one: [
        { name: "经典", mark: "KSK" },
        { name: "女神", mark: "NS" },
        { name: "伴手礼", mark: "JZ" }
      ],
    };
  },
  mounted() {
    
    this.pageInit();
     
  },
  methods: {
    two(index) {
      this.active = 2;
      this.optionData("RP");
    },
    add(item) {
      var data = {
        num:this.num,
        id: item.ID, //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
        SupplyNo: item.SupplyNo //产品货号类型
      };
      this.$store.commit("add", data);
      this.bln=true
      MessageBox('操作成功', '成功加入购物车')
    },
    three(index) {
      this.active = 1;
      this.optionData("KSK",0);
      
     
    },
    pageInit() {
      Indicator.open();
      this.GetJdListNew(res => {
        var goodsList = res.data.Tag.cakelist;
        var url = `https://res.bestcake.com/m-images/ww/`;
        goodsList.forEach(item => {
          if (item.SupplyNo.indexOf("KSK") != -1) {
            item.ImgUrl = `${url}jd/${item.Name}.png`;
        
          } else if (item.SupplyNo.indexOf("NS") != -1) {
            item.ImgUrl = `${url}ns/${item.Name}.jpg`;
          } else if (item.SupplyNo.indexOf("JZ") != -1) {
            item.ImgUrl = `${url}jz/${item.Name}.png`;
          } else {
            item.ImgUrl = `${url}rp/${item.Name}.jpg`;
          }
          
        });
        // https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=14
        // https://res.bestcake.com/m-images/ww/ns/一见倾心.jpg?v=14
        // https://res.bestcake.com/m-images/ww/jz/草莓先生.png?v=14
        //  res.data.Tag.cakelist
        this.goodsList = goodsList;
          // this.tabActive=1
           this.optionData("KSK",0)
            Indicator.close();
        //this.optionData(this.one[0].mark);
      });
    },
    toShow(item) {
      //图片焦点图跳转详情页
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },
    optionData(mark,index) {
      var activeList = [];
      this.goodsList.forEach(item => {
        if (item.SupplyNo.indexOf(mark) != -1) {
          activeList.push(item);
        }
      });
      this.activeList = activeList;
      this.tabActive=index
    },
    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
      Indicator.close();
    }
  }
};
</script>
<style lang="scss" scoped>
.classX {
  .tab {
    position: relative;
    border-bottom: 1px solid #d9d9d9;
    height: 12%;
    overflow: hidden;
    
    .tab-left {
      width: 50%;
      float: left;
      font-size: 4.266vw;
      text-align: center;
      height: r(97.5);
      line-height: r(97.5);
      
    }
    .tabl{
         border-bottom:2px solid  #1db0b8
    }
    .tab-right {
      width: 50%;
      float: left;
      font-size: 4.266vw;
      text-align: center;
      height: r(97.5);
      line-height: r(97.5);
    
    }
    // .tab_l {
    //   width: 50%;
    //   height: r(4);
    //   background: #1db0b8;
    //   position: absolute;
    //   bottom: 0;
    //   transition: left 0.35s;
    // }
  }
  .zy-list {
    .zy-tab {
      margin-top: 7.466%;
      height: r(50);
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      .zy-tab-a {
        font-size: r(28);
        text-align: center;
        z-index: 2;
        bottom: 0;
        // margin-right:66px;
      }
      .actived {
        font-size: 4.266vw;
        font-weight: bold;
        border-bottom: 2px solid #1db0b8
      }
    }
    .zy-content {
      padding: 0 1.6%;
      overflow: hidden;
      .zy-content-list:nth-child(2n + 1) {
        margin-right: 8.8%;
      }
      .zy-content-list {
        width: 44%;
        float: left;
        position: relative;
        margin-bottom: 5.334%;
        text-align: left;
        a {
          .content-a {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: r(319.5);
            }
          }
        }
        .content-b {
          margin-top: 1.867%;
          line-height: r(30);
          span {
            font-size: r(30);
            color: #333;
            padding-left: 2vw;
          }
        }
        .content-c {
          line-height: r(32);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #999;
            font-size: r(20);
            padding-left: r(15);
          }
        }
        .content-d {
          span:nth-child(1) {
            color: rgb(255, 51, 0);
            font-size: r(28);
            padding-left: r(15);
          }
          span:nth-child(2) {
            color: rgb(255, 51, 0);
            font-size: r(38);
          }
          span:nth-child(3) {
            color: rgb(255, 51, 0);
            font-size: r(24);
          }
          span:nth-child(4) {
            color: rgb(188, 188, 188);
            font-size: r(24);
            margin-left: 1.067%;
          }
        }
        .content-e {
          width: 12.6%;
          height: 9.1%;
          position: absolute;
          right: 0;
          bottom: 1%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .bs-list {
    .zy-tab {
      margin-top: 7.466%;
      height: r(50);
      position: relative;
      overflow: hidden;
      .aa {
        float: left;
        left: 45.6%;
        font-size: r(28);
        text-align: center;
        position: absolute;
        z-index: 2;
        bottom: 0;
      }
      .actived {
        font-size: 4.266vw;
        font-weight: bold;
        border-bottom: 2px solid #1db0b8
      }
    }
    .zy-content {
      padding: 0 1.6%;
      overflow: hidden;
      .zy-content-list:nth-child(2n + 1) {
        margin-right: 8.8%;
      }
      .zy-content-list {
        width: 44%;
        float: left;
        position: relative;
        margin-bottom: 5.334%;
        text-align: left;
        a {
          .content-a {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: r(319.5);
            }
          }
        }
        .content-b {
          margin-top: 1.867%;
          line-height: r(30);
          span {
            font-size: r(30);
            color: #333;
            padding-left: 2vw;
          }
        }
        .content-c {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: r(32);
          width: 92%;
          text-align: left;

          span {
            color: #999;
            font-size: r(20);
            padding-left: r(15);
          }
        }
        .content-d {
          span:nth-child(2) {
            color: rgb(255, 51, 0);
            font-size: r(28);
          }
          span:nth-child(4) {
            color: rgb(188, 188, 188);
            font-size: r(20);
          }
          span:nth-child(3) {
            color: rgb(255, 51, 0);
            font-size: r(24);
          }
          span:nth-child(1) {
            color: rgb(255, 51, 0);
            font-size: r(24);
            padding-left: r(15);
          }
        }
        .content-e {
          width: 12.6%;
          height: 9.1%;
          position: absolute;
          right: 0;
          bottom: 1%;
          img {
            width: 100%;
            height: 100%;
          }
        }
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
    height: r(95);
  }
}
</style>

