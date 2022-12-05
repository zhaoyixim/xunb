<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		<view class="name-wrap bghalfwhite">
			 <view class="coloryellow font18 username-box">
				 用户名
			 </view>
			 <view class="input-box">
				 <input class="styleinput font24 colorwhite" v-model="usernameval" placeholder="请输入您的用户名" @click="()=>focushandle()" />
			 </view>
		</view>
		
		<view class="btn-box" @click="()=>handlebtn()">
			<view class="btn-self colorwhite">确定</view>
		</view>
	</view>
</template>
<script>
	// TODO 修复Android v3 加载过慢问题
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	// #endif
	export default {
		data() {
			return {
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				usernameval:""
				
			}
		},
		created() {
			this.pageinit()
		},
		methods: {
		 async pageinit(){
			 let meminfo = this.$vcache.vget('meminfo')
			 this.usernameval = meminfo.m_name
		 },
		 focushandle(){
			 this.usernameval = ""
		 },
		 async handlebtn(){
			 if('' == this.usernameval){
				 uni.showToast({
				 	title: '名字不能为空',
				 	icon: 'error'
				 })
				 return  ;
			 }
			 let url = "/user/setNickName"
			 let meminfo = await this.$vcache.vget('meminfo')
			 let senddata = {
				 mphone : meminfo.m_name,
				 nickName:this.usernameval
			 }
			 let returnjson =await this.$request.post(url,senddata)
			 if(returnjson.code == 0 ){
				 uni.showToast({
				 	title: '修改成功',
				 	icon: 'success'
				 })
				 setTimeout(function(){},2000)
				 uni.navigateBack()
			 }else{
				 uni.showToast({
				 	title: returnjson.msg,
				 	icon: 'error'
				 })
				 return ;
			 }
		 }
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.wrap-box{
		
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
		.name-wrap{
			border-radius: 5px;
			padding: 10px;
			display: flex; 
			flex-direction: column;
			.username-box{text-align: left;}
			
			.input-box{
				flex: 1;
				padding-right: 30px;
				//margin-top: 25px;
				
			}
		}
		.btn-box{
		margin-top: 30px;
		
		}
	}
	
</style>
