<template>
	<view class=" loginBg"
	:style='{"minHeight": `${pageInfo.height+10}px`, "background-image":"url(" + require("@/static/images/bg_reg.png") + ")"}'
	>	<view class="reg-input-box colorwhite"> 
			<view v-for="(item,index) in list" :key="index" class="input-box">
				<input v-if="!item.sendmsgbtn"  :value="item.value"  class="input-item" :placeholder="item.palceholder"  />
				<view v-else class="msg-box-wrap">
					<input class="input-item item-sendmsg" :value="item.value"  :placeholder="item.palceholder" />
					<view class="getmsg-box" @click="()=>getmsgcode()" >获取验证码</view>
				</view>
			</view>
			<view class="sub-btn-box">
				<view class="reg-btn font24" @click="()=>resetbtn()">重置密码</view>
			</view>
		</view>		
	</view>
</template>
<script>
	import validate from '@/utils/validate.js'
	export default {
		data() {
			return {
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				list: [
					{palceholder:"请输入手机号",labelkey:"mphone", validata:"telphone", errormsg:"请输入正确的手机号", inputtype:"text", value:"",sendmsgbtn:false},
					{palceholder:"请输入验证码",labelkey:"code",validata:"notEmpty",errormsg:"验证码不能为空",inputtype:"text", value:"",sendmsgbtn:true},
					{palceholder:"请输入密码",labelkey:"pwd",validata:"notEmpty",errormsg:"密码码不能为空",inputtype:"text", value:"",sendmsgbtn:false}
				]
			}
		},		
		created() {
			
		},
		methods: {
			getmsgcode(){
				let url = "/login/getCode"
				let findItem = this._getkey('mphone')
				if(!validate[findItem.validata](findItem.value)){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"error"
					})
					return ;
				}
				let senddata = {
					mphone : findItem.value
				}
				let that = this
				this.$request.post(url,senddata).then(res=>{
						if(res.code == 0)
							that._showerrortoast("发送成功")
						else that._showerrortoast(res.msg)
				})
			},
			async resetbtn(){
				let items = this.list
				let validatepass = true
				let sendata = {}
				items.forEach(it=>{
					if(!validate[it.validata](it.value)){
						this._showerrortoast(it.errormsg)
						validatepass = false
						return ;
					}else{
						sendata[it.labelkey] = it.value
					}
				})
				if(!validatepass) return ;
				let url = '/login/setPwd'
				let res = await this.$request.post(url,sendata)
				if(res.code == 0){
					this._showerrortoast("修改成功，请登陆")
					setTimeout(function(){
						uni.navigateTo({
							url: './index'
						})
					},2000)
					
				}else{
					this._showerrortoast(res.msg)
				}	
				
			},
			_getkey(_key){
				return this.list.find(it=>it.labelkey == _key)
			},
			_showerrortoast(_txt){
				uni.showToast({
					title:_txt,
					icon:"error"
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
	}
	.reg-input-box{
		padding: 30px 50px 0 50px;
		.input-box{
			border-bottom: 1px #fff solid;
			margin-top: 10px;
			.input-item{
				height: 45px;
				padding-left: 10px;
			}
			.msg-box-wrap{
				display: flex; flex-direction: row;
			}
			.item-sendmsg{flex: 1;
			
			}
			.getmsg-box{
				border: 1px red solid; border-radius: 10px;
				height: 35px;
				padding: 0 8px; display: flex; justify-content: center; align-items: center;
			}
			
		}
	}
	.sub-btn-box{
		width: 100%;
		display: flex; justify-content: center; align-items: center;
		.reg-btn{width: 100%;margin-top: 40px;
			padding: 5px 10px;text-align: center;
						border: 1px #fff solid;
			border-radius: 30px;
		}
	}
</style>
