<template>
	<view class="loginBg bgcommon"
	:style='{"minHeight": `${pageInfo.height+10}px`, "background-image":"url(" + require("@/static/images/bg_reg.png") + ")"}'
	>	<view class="reg-input-box colorwhite"> 
			<view v-for="(item,index) in list" :key="index" class="input-box">
				<uni-easyinput  v-if="!item.sendmsgbtn" 
				v-model="item.value"
				:type="item.inputtype" 
				:inputBorder="false"
				:clearable="false"
				:styles="styles"
				:placeholderStyle="placeholderStyle"
				autoHeight
				class="input-item" 
				:placeholder="item.palceholder" ></uni-easyinput>
				<view v-else class="msg-box-wrap">
					<view class="input-item item-sendmsg" >
						<uni-easyinput
						:type="item.inputtype"
						v-model="item.value" 
						:inputBorder="false"
						:styles="styles"
						:placeholderStyle="placeholderStyle"
						:clearable="false"
						autoHeight
						:placeholder="item.palceholder"
						class="input-item" 
						></uni-easyinput>
					</view>
					
					<view v-if="!showtimer" class="getmsg-box" @click="()=>getmsgcode()">获取验证码</view>
					<view v-else class="getmsg-box">{{timer}}s</view>
					
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
				placeholderStyle: "font-size:14px",
				styles: {
					color: '#fff',
					fontSize:'18px'
				},
				list: [
					{palceholder:"请输入手机号",labelkey:"mphone", validata:"telphone", errormsg:"手机号格式错误", inputtype:"text", value:"",sendmsgbtn:false},
					{palceholder:"请输入验证码",labelkey:"code",validata:"notEmpty",errormsg:"验证码不能为空",inputtype:"text", value:"",sendmsgbtn:true},
					{palceholder:"请输入密码",labelkey:"pwd",validata:"notEmpty",errormsg:"密码码不能为空",inputtype:"text", value:"",sendmsgbtn:false}
				],
				showtimer:false,
				timer:59,
				timerhandle:0
			}
		},	
		watch:{
			timer:function(b,af){
				//console.log("before:",b,"after:",af)
				if(af<=0) {
					this.showtimer = false
					this.timer = 59
					clearInterval(this.timerhandle)
				}
			}
		},
		created() {
			
		},
		methods: {
			async getmsgcode(){
				let url = "/login/getCode"
				let findItem = this._getkey('mphone')
				if(!validate[findItem.validata](findItem.value)){
					uni.showToast({
						title:"手机号格式错误",
						icon:"error"
					})
					return ;
				}
				let senddata = {
					mphone : findItem.value
				}
				let that = this
				
				let msgback = await this.$request.post(url,senddata)
				
				if(msgback.code == 0){
					this._showerrortoast("发送成功",true)
					this.showtimer = true
					this.timerhandle = setInterval(function(){
						 that.timer --
					},1000)
				}else this._showerrortoast(msgback.msg)	
				
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
				let gettokenfundata = await this.$commonFunc.setToken(this.$adpid,this.$secrect,sendata.mphone)
				if(!gettokenfundata){
					uni.showToast({title:"获取token失败",icon:"error"})
					return ;
				} 
				let url = '/login/setPwd'
				let res = await this.$request.post(url,sendata)
				if(res.code == 0){
					this._showerrortoast("修改成功，请登陆",true)
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
			
			_showerrortoast(_txt,sucessflag = false){
				let iconflg = sucessflag?"success":"error"
				uni.showToast({
					title:_txt,
					icon:iconflg
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
		height:100vh;
	}
	.reg-input-box{
		padding: 30px 50px 0 50px;
		.input-box{
			border-bottom: 1px #fff solid;
			margin-top: 10px;
			.input-item{
				height: 45px;
				padding-left: 2px;
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
