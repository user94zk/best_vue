//mint轮播
import { Swipe, SwipeItem } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
//中部弹框
import { Popup } from 'mint-ui';






export default (Vue) => {
  //mint轮播
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

  //mint底部导航
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  //中部弹框
  Vue.component(Popup.name, Popup);

  }
  