<template>
  <div id="shopCart">
    <div class="shopMain">
      <div class="shop_top" v-if="$store.state.cartList.length==0">购物车是空的哦~</div>
      <div
        class="shopx"
        v-if="$store.state.cartList.length!=0"
        v-for="(item,index) in $store.state.cartList"
        :key="index"
      >
        <!-- v-if="$store.state.cartList.length=0" -->
        <div class="shopx_top">
          <div class="shopx-l">
            <img
              v-if="item.bool"
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              @click="sel(item.id)"
            >
            <img
              v-else
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
              @click="sel(item.id)"
            >
          </div>
          <div class="shopx-r">
            <div class="shopx-r1">
              <img :src="item.url" @click="toshow(item)">
            </div>
            <div class="shopx-r2">
              <div class="shopx-r2a">Nougat</div>
              <div class="shopx-r2b">{{item.Name}}</div>
              <div class="shopx-r2c">
                <div class="aa">{{item.Size}}</div>
                <div class="bb">
                  <div class="del" @click="del(item,item.num)">
                    <img src="https://res.bestcake.com\m-images\order\reduce-1.png">
                  </div>
                  <div class="xxa">{{item.num}}</div>
                  <div class="addx" @click="add(item,item.num)">
                    <img src="https://res.bestcake.com\m-images\order\add.png">
                  </div>
                </div>
              </div>
              <div class="shopx-r2d">{{item.CurrentPrice*item.num}}</div>
            </div>
          </div>
        </div>
        <div class="shopx_bottom">
          <div class="btm-l">优惠方式</div>
          <div class="btm-r">不参与活动</div>
        </div>
      </div>

      <div class="shop_bottom">
        <div class="kong"></div>
        <div class="shop_b1">
          <div class="shop_b1_1">
            <div class="shop1">Hot&nbsp; Recommend</div>
            <div class="shop2">
              <div class="sp"></div>
            </div>
            <div class="shop3">热销新品推荐</div>
          </div>
        </div>

        <div class="shop_b2">
          <div class="sb1">
            <div class="sb1_a">
              <a>
                <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg">
              </a>
            </div>
            <div class="sb1_b">伴手礼系列-吉致生巧</div>
            <div class="sb1_c">
              <div class="sb1_a1">
                <a>168.00</a>/1盒
              </div>
              <div class="sb1_a2">
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg">
              </div>
            </div>
          </div>
          <div class="sb1">
            <div class="sb1_a">
              <a>
                <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg">
              </a>
            </div>
            <div class="sb1_b">伴手礼系列-吉致牛轧糖</div>
            <div class="sb1_c">
              <div class="sb1_a1">
                <a>68.00</a>/16粒装
              </div>
              <div class="sb1_a2">
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg">
              </div>
            </div>
          </div>
          <div class="sb1">
            <div class="sb1_a">
              <a>
                <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg">
              </a>
            </div>
            <div class="sb1_b">伴手礼系列-吉致泡芙</div>
            <div class="sb1_c">
              <div class="sb1_a1">
                <a>88.00</a>/0.8磅
              </div>
              <div class="sb1_a2">
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="js">
        <div class="js1">
          <div class="js1_1">
            <img
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              @click="allSel"
              v-if="bools"
            >
            <img
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
              @click="allSel"
              v-else
            >
          </div>
          <div>全选</div>
        </div>
        <div class="js2" @click="clear">
          <a>清空</a>
        </div>
        <div class="js3">
          <div class="js3_1">
            <div class="js3_1b">{{allPrice}}</div>
            <div class="js3_1a">合计:</div>
          </div>
          <div class="js3_2">
            <div class="js3_2b">0.00</div>
            <div class="js3_2a">已优惠:</div>
          </div>
        </div>
        <div class="js4" @click="buy">
          <a>结算</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      num: 1,
      allPrice: 0,
      cartList: [],
      clearList: [],
      bools: true
    };
  },
  methods: {
    // 单选及多选
    allSel() {
      this.bools = !this.bools;
      this.$store.state.cartList.forEach(item => {
        if (item.bool != this.bools) {
          item.bool = this.bools;
        }
        
      });
      this.allPrices(this.$store.state.cartList);
   console.log()
    },
    allSels() {
           this.bools = true;
      this.$store.state.cartList.forEach(item => {
        if (!item.bool) {
          this.bools = false;
          return;
        }

      });
    },
        sel(id) {
      this.$store.commit("changeBool", id);
      
      this.allPrices();
      this.allSels();
    },
    buy(){

      this.$router.push({path:"/user"})

    },
    toshow(item) {
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },
    //清空购物车
    clear() {
      if(this.$store.state.cartList.length!=0){       
      MessageBox.confirm("确定要清空购物车吗？").then(action => {
        var clearList = [];
        this.cartList.forEach(item => { 
          if (!item.bool) {
            clearList.push(item);
          }
          this.$store.state.cartList = clearList;
          this.cartList = clearList;
          this.allPrices()
        })
      }).catch(()=>{});
    }
      },


    // 增加
    add(item, num) {
      this.$store.state.cartList.forEach(ele => {
        if (item.id == ele.id) {
          ele.num++;
        }
      });
      this.$store.state.count++;
      this.allPrices();
    },
    // 减少
    del(item, num) {
      if (item.num <= 1) {
        return;
      }
      this.$store.state.cartList.forEach(ele => {
        if (item.id == ele.id) {
          ele.num--;
          this.$store.state.count--;
        }  
      });

      this.allPrices();
    },
    pageInit() {
      var num = 0;
      var cartList = this.$store.state.cartList;
      cartList.forEach(item => {
        item.bool = true;
        num += item.CurrentPrice * item.num;
      });
      this.cartList = cartList;
      this.allPrice = num;
      console.log(cartList)
    },

    // 总价
    allPrices() {
      this.allPrice = 0;
      this.$store.state.cartList.forEach(item => {
        if (item.bool) {
          this.allPrice += item.num * item.CurrentPrice;
        }
      });
    }
  },
  mounted() {
    this.pageInit();
    // this.allPrices()
  
  }
};
</script>
<style lang="scss" scoped>
#shopCart {
  width: 100%;
  overflow: hidden;
  .shopMain {
    position: relative;
    .shop_top {
      line-height: 16vw;
      color: #141414;
      font-size: 3.2vw;
      background: #fff;
      text-align: center;
    }
    .shopx {
      background: #fff;
      border-bottom: 4vw solid #f7f7f7;
      .shopx_top {
        padding-bottom: 4.26%;
        overflow: hidden;
        .shopx-l {
          float: left;
          margin-left: r(30);
          margin-right: r(22.5);
          img {
            width: 5.33vw;
            margin-top: 17vw;
          }
        }
        .shopx-r {
          float: left;
          overflow: hidden;
          .shopx-r1 {
            float: left;
            // margin-right: 4%;
            padding-top: 4.26%;
            img {
              width: r(228);
            }
          }
          .shopx-r2 {
            float: left;
            padding-top: 5.06vw;
            .shopx-r2a {
              font-size: 4.26vw;
              color: #000;
              line-height: 5.06vw;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 49vw;
              text-align: left;
              margin-left: r(30);
            }
            .shopx-r2b {
              font-size: 4.26vw;
              color: #000;
              line-height: 5.06vw;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: r(367);
              text-align: left;
              margin-left: r(30);
            }
            .shopx-r2c {
              margin: r(9) 0;
              overflow: hidden;
              .aa {
                float: left;
                font-size: 2.93vw;
                color: #ccc;
                margin-top: r(9);
                margin-left: r(28);
              }
              .bb {
                float: right;
                overflow: hidden;
                width: 50%;
                margin-top: r(14);
                line-height: r(36);
                .del {
                  float: left;
                  width: 33.33333333%;
                  img {
                    width: 2.67vw;
                  }
                }
                .addx {
                  width: 33.33333333%;
                  float: left;
                  img {
                    width: 2.67vw;
                  }
                }
                .xxa {
                  width: 33.33333333%;
                  float: left;
                  font-size: r(32);
                }
              }
            }
            .shopx-r2d {
              font-size: 3.46vw;
              color: #030303;
              font-weight: bold;
              line-height: 4vw;
              margin-top: 2.66vw;
              text-align: left;
              margin-left: r(30);
            }
          }
        }
      }
      .shopx_bottom {
        padding-left: 12.33%;
        overflow: hidden;
        .btm-l {
          float: left;
          line-height: 5.33vw;
          margin-top: 3.86vw;
          margin-bottom: 3.86vw;
          font-size: 3.73vw;
          color: #f2495e;
          margin-right: 1.333vw;
          font-weight: bold;
        }
        .btm-r {
          float: left;
          line-height: 5.33vw;
          margin-top: 3.86vw;
          margin-bottom: 3.86vw;
          font-size: 3.73vw;
          color: #333;
        }
      }
    }
    .shop_bottom {
      padding-top: 17.2%;
      padding-left: 3.6%;
      background: #f7f7f7;
      .kong {
        margin-bottom: 14vw;
        background: #fff;
        padding-left: 3.6vw;
      }
      .shop_b1 {
        margin-bottom: 12.26%;
        .shop1 {
          line-height: 7.46vw;
          color: #333;
          font-weight: bold;
          font-size: 6.4vw;
        }
        .shop2 {
          padding-left: 22.3%;
          padding-bottom: 2%;
          padding-top: 2%;
          .sp {
            width: 52.3vw;
            height: 2px;
            background: #333;
          }
        }
        .shop3 {
          line-height: 4vw;
          color: #333;
          font-weight: bold;
          font-size: 4vw;
        }
      }
      .shop_b2 {
        overflow: hidden;
        padding-bottom: 22.66%;
        text-align: left;
        .sb1 {
          float: left;
          padding-right: 3.73%;
          padding-bottom: 8.26%;
          height: r(450);
          .sb1_a {
            img {
              width: 44vw;
            }
          }
          .sb1_b {
            line-height: 5.33vw;
            font-size: 3.73vw;
            color: #333;
            margin-bottom: 5.4%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 2.7%;
            font-weight: bold;
          }
          .sb1_c {
            .sb1_a1 {
              font-size: 3.46vw;
              color: #333;
              line-height: 3.46vw;
              width: 83.33333333%;
              float: left;
              a {
                font-size: 3.46vw;
                color: #333;
                line-height: 3.46vw;
                font-weight: bold;
              }
            }
            .sb1_a2 {
              width: 16.66666667%;
              float: right;
              img {
                width: 5.6vw;
                margin-top: -18px;
              }
            }
          }
        }
      }
    }
    .js {
      position: fixed;
      height: r(112);
      width: 100%;
      background: #fff;
      bottom: 6%;
      overflow: hidden;
      .js1 {
        float: left;
        overflow: hidden;

        div {
          float: left;
        }
        div:nth-child(1) {
          margin-top: 18.2%;
          margin-left: 3vw;
          margin-right: 1.33vw;

          img {
            width: 5.33vw;
            margin-top: 4.34%;
          }
        }
        div:nth-child(2) {
          padding-top: 4.53vw;
          padding-bottom: 4.53vw;
          font-size: 4vw;
          color: #333;
          line-height: 5.6vw;
          float: left;
          width: 9vw;
          text-align: center;
          margin-right: 4vw;
        }
      }
      .js2 {
        float: left;
        font-size: 3.46vw;
        color: #333;
        line-height: 4.93vw;
        float: left;
        width: 8.06vw;
        text-align: center;
        margin-right: 0.12vw;
        padding-top: 5.5%;
      }
      .js3 {
        float: left;
        margin-top: 2.53vw;
        margin-right: 1.74vw;
        width: 36.67vw;
        .js3_1 {
          overflow: hidden;
          .js3_1a {
            float: right;
            font-size: r(20);
            line-height: r(46);
          }
          .js3_1b {
            float: right;
            font-size: r(40);
            color: #f2495e;
            font-weight: bold;
          }
        }
        .js3_2 {
          overflow: hidden;
          .js3_2a {
            float: right;
            font-size: r(20);
          }
          .js3_2b {
            float: right;
            font-weight: bold;
            color: #333;
            font-size: r(28);
          }
        }
      }
      .js4 {
        float: right;
        display: block;
        width: r(230);
        line-height: r(112);
        background: #02d4d7;
        color: #fff;
        font-weight: bolder;
        font-size: r(34);
      }
    }
  }
}
</style>


