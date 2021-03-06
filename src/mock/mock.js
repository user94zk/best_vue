import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import {userList} from './data/userList' 
import Store from "storejs";

let mock=new MockAdapter(axios);
// 注册接口
mock.onPost('/register').reply(config=>{  
        var reqdata=JSON.parse(config.data).data;
        console.log(config)
        userList.push(reqdata)
        for(var i=0;i<userList.length;i++){
            if(userList[i].username==reqdata.uname){
                return [200,{ code: 0,msg:"账号已存在"}];
            }
        }
        return [200,{msg:'注册成功',code:1,reqdata}];
})


// 登录接口
mock.onPost('/login').reply(config => {
    var reqdata=JSON.parse(config.data).data;
    var data={
        code: 200,
        data:{},
        msg: '',}
        for(var i=0;i<userList.length;i++){
            if(userList[i].username==reqdata.uname){
                if(userList[i].password==reqdata.upwd){
                    return [200,{ code: 1,data:userList[i],msg:"登录成功"}];
                }else{
                    return [200,{ code: 2,msg:"密码错误"}];
                }
            }
        }
        return [200,{ code: 0,msg:"账号不存在"}];
        
    })








    export default axios;