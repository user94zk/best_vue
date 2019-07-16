import Vue from "vue";
import Vuex from "vuex";
// import apis from "@/core/api/index"
// import Store from "storejs"
// console.log("OK");
Vue.use(Vuex);
// this.$store
// this.$store.state 访问属性
// this.$store.commit 访问属性 mutations 方法   this.$store.commit("add",{xxx})
// this.$store.dispatch 访问属性 actions 方法   this.$store.dispatch("add",{xxx})


//定义属性值  data
const state={
	cartList:[],
	isLogin:false,
	count:0,
	userInfo:"",
	cityList:""
}
//定义同步方法
const mutations={
	// vuexInit(state){
	// 	state.cartList=Store.get("cartList")||[];
	// 	console.log(Store.get("cartList"));
	// 	// isLogin
	// },
	add(state,data){
		console.log(data)
		if(state.cartList.length!=0){
			// console.log(state.cartList)
			// forEach空数组不遍历
			var bool=true;
			var n=0;
			state.cartList.forEach((item)=>{
				item.bool=true
				if(data.id==item.id){
					item.num++;
					bool=false;
					return;
				}
			})
			if(bool){
				state.cartList.push(data);
			}
			state.cartList.forEach(item=>{
				n+=item.num
			})
			state.count=n;
		}else{
			data.num=1;
			state.cartList.push(data);
			state.count=1;
			
		}
		
	},

	changeBool(state,data){
		state.cartList.forEach(item=>{
			if(item.id==data){
				item.bool=!item.bool
			  }
		})
		console.log(data)
	},
	saveUserInfo(state,data){
		state.userInfo=data;
		console.log(state.userInfo);
	}
}
//定义 computed(属性计算)
const getters={
	count(state){
		// return state.cartList.length*2;
	}
}
//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={
	syFn(context){
		// context.state  可以取 state 属性
		// context.commit  可以调用 mutations 同步方法 属性
		// context.dispatch可以调用 actions 异步方法 属性
		// 在组件里面调用 也是一样,同上面的方法一直 
	},
	test(context,data){
	}	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
