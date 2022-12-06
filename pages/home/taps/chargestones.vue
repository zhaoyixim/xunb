<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		<view class="charge-title-box font18 coloryellow">
			<view class="title-box bghalfwhite">
				<view class="colorwhite">{{pageInfo.crystalnum}}</view>
				<view class="font18">晶块余额</view>
			</view>
			<view class="title-box bghalfwhite">
				<view class="colorwhite">{{pageInfo.kobnum}}</view>
				<view class="font18">KOB余额</view>
			</view>
		</view>
		<view class="charge-content bghalfwhite font18">
			<view class="content-unit-box">
				<view class="coloryellow">晶块数量</view>
				<view class="input-unit-box">
					<input class="styleinput colorwhite font20" auto-focus
					 type="number" min="1"
					 v-model="fillednum" @input="(e)=>changeKobNums(e)"  
					 @focus="()=>focusinput()" placeholder="请输入数量"/>
				</view>
			</view>
			<view class="content-unit-box">
				<view class="coloryellow">KOB</view>
				<view class="input-unit-box">
					<input disabled  class="styleinputnoboder colorwhite font20" v-model="kobnums" placeholder=""/>
				</view>
			</view>
		</view>
		<view class="txt-content">
			<view class="colorwhite font15 txt-self">晶块与KOB兑换比例为1:{{pageInfo.changerate}}</view>
		</view>
		
		<view class="btn-box" @click="()=>changebtn()">
			<view class="btn-self colorwhite" >兑换</view>
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
				fillednum:"",
				kobnums:0,
				pageInfo:{
					height:this.$vcache.vget('safeHeight'),
					kobnum:0,
					crystalnum:0,
					usdtnum:0,
					changerate:"0"
				},
				meminfo:{},
				avatarimg:"/static/images/head.png",
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: './changebills'
			})
		},
		created() {
			this.inipagedata()
		},
		methods: {
			changeKobNums(e){
				let beforekobnums = this.kobnums
				if(this.fillednum - parseInt( this.pageInfo.crystalnum )>0){
					uni.showToast({
						title: '您的晶块数不够了',
						icon: 'error'
					})	
					return ;
				}
				this.kobnums = this.fillednum*parseInt(this.pageInfo.changerate)
				
			},
			async changebtn(){
				if(this.pageInfo.crystalnum <=0){
					uni.showToast({
						title: '您的晶块为0',
						icon: 'error'
					})	
					return ;
				}
				if(this.fillednum<=0){
					uni.showToast({
						title: '晶块数需大于0',
						icon: 'error'
					})	
					return ;
				}
				if(this.fillednum - parseInt( this.pageInfo.crystalnum )>0){
					uni.showToast({
						title: '您的晶块数不够了',
						icon: 'error'
					})	
					return ;
				}
				let url = "/Exchange/crystalToKob"
				let meminfo = await this.$vcache.vget('meminfo')
				let senddata = {
					mphone:meminfo.m_phone,
					crystalCnt:this.fillednum
				}
				let resjson = await this.$request.post(url,senddata)
				console.log("change",resjson)
				if(resjson.code == 0){
					
				   this.pageInfo.kobnum = this.pageInfo.kobnum+this.kobnums
				   this.pageInfo.crystalnum = this.pageInfo.crystalnum - this.fillednum
				   this.meminfo.kob=this.pageInfo.kobnum,
				   this.meminfo.crystal=this.pageInfo.crystalnum
				   this.$vcache.vset("meminfo",this.meminfo)
					uni.showToast({
						title: '兑换成功',
						icon: 'success'
					})
				  this.kobnums = 0
				  this.fillednum = ""
				}else{
					uni.showToast({
						title: resjson.msg,
						icon: 'error'
					})
				}
			},
			focusinput(){
				this.fillednum = ""
			},
			async inipagedata(){
				this.meminfo = this.$vcache.vget('meminfo')
				this.pageInfo.kobnum = this.meminfo.kob
				this.pageInfo.crystalnum = this.meminfo.crystal
				this.pageInfo.usdtnum = this.meminfo.usdt
				let url = '/Exchange/rateCrystalToKob'
				let getrate = await this.$request.post(url)
				this.pageInfo.changerate = getrate.data
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.wrap-box{
		min-height: 92.5vh;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.charge-title-box{
			display: flex; flex-direction: row;
			.title-box{
				flex: 1;
				height: 112px;
				border-radius: 5px;
				display: flex;  justify-content: center; align-items: center; flex-direction: column;
			}
			.title-box:nth-child(2){margin-left: 10px;}
		}
		.charge-content{
			margin-top: 10px;
			padding: 10px 15px;
			.content-unit-box{display: flex; flex-direction: column;}
			.content-unit-box:nth-child(2){margin-top: 15px;}
			.input-unit-box{margin-top: 20px;
				.styleinput{border: none;}
			}
		}
		.txt-content{margin:15px auto;
			.txt-self{text-align: center;}
		}
	}
	
</style>
