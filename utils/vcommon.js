import md5 from 'js-md5'
import request from '@/utils/request.js'
import vcache from '@/utils/vcache.js'
import Vue from 'vue'
/*token 存储有效时间--单位秒*/
const expiretime = 3600
const commonFunc = {
	getRandomString:(code=10)=>{
	      let len = code
	      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789' 
	      let maxLen = $chars.length
	      let pwd = ''
	      for (let i = 0; i < len; i++) {
	        pwd += $chars.charAt(Math.floor(Math.random() * maxLen ))
	      }
	      return pwd.toUpperCase()
	},
	setToken:async(appid,secrect,mphone)=>{
		let timestamp=new Date().getTime()/*毫秒级*/
		let senddata = {
			appId : appid.toUpperCase(),
			secrect : secrect,
			imel : md5(appid+secrect+mphone),
			timeId : timestamp,
			mphone : mphone,
			randStr : commonFunc.getRandomString()
		}
		let json1 =  "";
		for(let key in senddata){
			json1 += senddata[key]
		}
		let json2 = md5(json1)
		senddata.authId = md5(md5(json1) + json2)
		let savedata = await request.post('/auth',senddata)
		if(savedata.code == 0){
			await vcache.vset("token",savedata.data,expiretime)
			return true
		}else{
			uni.showToast({
				title:"token获取失败",
				icon:"error"
			})
			return false
		}
	},
	tokenCheck:async(flag = false)=>{
		/*flag == true 强制刷新token*/
		let gettoken = await vcache.vget("token")
		let meminfo = await vcache.vget("meminfo")
		if(!meminfo){
			uni.showToast({
				title:"未登录!",
				icon:"error"
			})
			setTimeout(function(){
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},1000)
			return ;
		}
		
		 if(flag || null == gettoken || undefined ==gettoken){
			 console.log("token过期")
			 let gettokenfundata = await commonFunc.setToken(Vue.prototype.$adpid,Vue.prototype.$secrect,meminfo.m_phone)		
			 return gettokenfundata
		 }
		 return true
	},
	updatememinfo:async()=>{
		let getmeminfo = await vcache.vget("meminfo")
		let memurl = "/user/info"
		let sendPhone = {mphone:getmeminfo.m_phone}
		let meminfo = await request.post(memurl,sendPhone)
		if(meminfo.code == 0) {
			await vcache.vset("meminfo",meminfo.data)
		}else{
			uni.showToast({
				title:meminfo.msg,
				icon:"erorr"
			})
		}
	},
	quietloginfunc:async(beforedata)=>{
		await commonFunc.tokenCheck(true)
		console.log("asdfasdf")
		let url = '/login'
		let formdata =  await vcache.vget("formdata")
		let loginback =	await request.post(url,formdata)
		if(loginback.code ==0){
			 /*获得用户信息*/
			 if(loginback.data.loginId){
				await vcache.vset("logincode",loginback.data.loginId)
			 }
			return  request.post(beforedata.url,beforedata.data) 
		}
		return true
	}
}
export default commonFunc