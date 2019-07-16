import request from './http'
import axios from 'axios';
import mock from "@/mock/mock"

class Apls{
	GetBannerList(data){
		return request({
			method:"get",
			url:"/json1811.ashx",
			params:data
		})
	}
	GetIndexCakeList(data){
		return request({
			method:"get",
			url:"/json1811.ashx",
			params:data
		})
	}
	//  焦点图详情接口
GetNSCakeByName(data) {
    return request({
      method: "get",
      url: "/json1811.ashx",
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetNSCakeByName",
        v: "1560225194548"
      }
    })
  }
  // 商品详情接口
GetCakeByName(data) {
	return request({
	  method: "get",
	  url: "/json1811.ashx",
	  params: {
		City:"上海" ,
		ProName:data.ProName,
		c: "Product",
		m: "GetCakeByName",
		v: "1560236137480"
	  }
	})
  }
  //分类数据接口
  GetJdListNew() {
    return request({
      method: "get",
      url: "/json1811.ashx",
      params: {
        c: "NsCakeCenter",
        m: "GetJdListNew",
        v: "1560225194548"
      }
    })
  }

  GetjzCakeInfo(data){
    return request({
      method: "get",
      url: "/json1811.ashx",
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "IndexCenter",
        m: "GetjzCakeInfo",
        v: "1560236137480"
      }
    })
  }
  GetRuPCakeByName(data){
    return request({
      method: "get",
      url: "/json1811.ashx",
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetRuPCakeByName",
        v: "1560225194548"
      }
    })
  }
  GetNewCakeList(data){
    return request({
      method:"get",
      url:"/json1811.ashx",
      params:{
        v: '1561449732333',
        c: 'NewIndexController',
        m: 'index'
      }
    })
  }
  login(data){
    return mock.post("/login",{
      data
    })
  }

  edit(data){ 
    return mock.post("/register",{
      data
    })
  }
	
}


export default new Apls();