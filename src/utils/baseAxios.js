import axios from "axios";
const createAxios = axios.create({
    baseURL:'https://www.fastmock.site/mock/f65912777f6c4e3d41cb65052ba59a53/boss'
})
export default createAxios;
createAxios.interceptors.request.use(config=>{
	// config 请求配置
	
	// 可用于
	// 发送网络请求时，在界面显示一个请求的同步动画
	// 某些请求（比如登录（token））必须携带一些特殊的信息
	
	// 请求成功拦截
    console.log("请求拦截器")
    return config
},err=>{
	// 请求失败拦截
    return Promise.reject(err)
})  

// 添加响应拦截器
createAxios.interceptors.response.use(res=>{
	// res 响应结果
	// 响应拦成功拦截
    console.log("响应拦截器")
    return res
},err=>{
	// 响应拦失败拦截
    return Promise.reject(err)
})  

