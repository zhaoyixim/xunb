<template>
	<view class="loginBg colorwhite" 
	:style='{"minHeight": `${pageInfo.height+10}px`, "background-image":"url(" + require("@/static/images/bg_login.png") + ")"}'
	>
		<view class="">
			<br /><br />
			<view class="">
				<view class="font40">您好，</view>
				<view class="font40" style="padding-top: 11px;">欢迎来到寻宝记</view>
			</view>
			<view  style="margin: 20px 0;padding:20px 4px;">						
				<view class=" ">
					<input type="text" class="input-txt" placeholder="请输入帐号" v-model="formData.mphone" />
				</view>
				<view class="">
					<input  type="password" class="input-txt"  placeholder="请输入密码" v-model="formData.pwd"  />
				</view>						
			</view>					
			<view class="">
				<button  class="login-box colorwhite " @click="()=>submitBtn()">登录</button>
				<view class="link-area ">
					<view class=" font18" @click="()=>clickReg()">　立即注册</view> 
				 <view  class=" font18" @click="()=>clickforgetpasswd()">　忘记密码?</view>
				</view>
			</view>					
		</view>
		<view class="zf-txt-pos zf-txt-color-white footer-tips font14">
			<view class="tipsbox">
				登录即表明同意<text class="colorred">(用户协议)</text> 和 <text class="colorred"> (隐私政策)</text>
			</view>
		</view>		
	</view>
</template>
<script>
	// TODO 修复Android v3 加载过慢问题
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	// #endif
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				formData:{
					mphone:"18221204475",
					pwd:"123456"
				}
			}
		},
		created() {
			let meminfos = this.$vcache.vget('meminfo')
			if(meminfos && meminfos.m_phone){
				uni.switchTab({
					url:"../index/index"
				})
			}
		},
		methods: {
			async submitBtn(){
				let sendData = this.formData
				let that = this
				if(sendData.mphone == '' || sendData.mphone == undefined){
					uni.showToast({
						title:"请输入手机号",
						icon:"error"
					})
					return ;
				}
				if(sendData.pwd == '' || sendData.pwd == undefined){
					uni.showToast({
						title:"请输入密码",
						icon:"error"
					})
					return ;
				}
				let gettokenfundata = await this.$commonFunc.setToken(this.$adpid,this.$secrect,sendData.mphone)
				if(!gettokenfundata){
					uni.showToast({title:"获取token失败",icon:"error"})
					return ;
				} 
				let gettokendata = await this.$vcache.vget("token")
				let url = '/login'
			    let loginback =	await this.$request.post(url,sendData)
				if(loginback.code ==0){
					 /*获得用户信息*/
					 if(loginback.data.loginId){
						this.$vcache.vset("logincode",loginback.data.loginId)
					 }
					this.$vcache.vset("meminfo",loginback.data)
					uni.showToast({title:"登陆成功...",icon:"success"})
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/index/index'
						})	
					},1000)
				}else{
					uni.showToast({
						title:loginback.msg,
						icon:"error"						
					})
				}
				
			},
			clickReg(){
				uni.navigateTo({
					url: './reg'
				})
			},
			clickforgetpasswd(){
				uni.navigateTo({
					url: './changepwd'
				})
			}
			
		}
	}
</script>

<style lang="scss">	
	@import '@/common/common.scss';
	
	.loginBg{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 20px;
	}
	.input-txt{font-size: 16px !important;
		height: 30px;
		margin-top: 12px; padding: 5px 10px;
		border-bottom: 1px #fff solid;
	}
	.input-placeholder{		  
		    padding-left: 15px;
	}
	.login-box{margin-bottom: 10px; 
	background-color: transparent;
	border: 1px #fff solid; border-radius: 30px;
	}
	.link-area{display: flex; 
	  flex-direction: row;
	  justify-content: space-between;
	  padding: 0 15px;
	  
	}
	.footer-tips{
	width:100%; text-align: center;
	padding-top: 10px;
		.tipsbox{
			display: inline; 
			
			width: 65%; margin: auto;}
	}
</style>
