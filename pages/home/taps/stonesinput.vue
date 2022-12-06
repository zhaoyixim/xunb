<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		<view class="tap-box-wrap font26 colorwhite">
			<view v-for="(item,index) in taplist" :key="index" class="item-wrap" >
				<view class="item-box item-box-active">{{item.labelname}}</view>
			</view>
		</view>
		<view class="choose-new-box font18 colorwhite">
			<view>选择网络</view>
			<view class="net-box-wrap">
				<radio-group @change="changeradionet" class="net-box">
					<label v-for="(it,inx) in  radiolist" :key="inx" class="label-item">
						 <radio  :class='{"radio-box":true,"radio-checked":it.checked}' :checked="it.checked" :value="it.labelvalue"/>
						 <view class="">{{it.labelname}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="address-box colorwhite font18">
			<view class="font16">充值地址</view>
			<view class="input-box-wrap">
				<view class="input-box">
					<textarea 
					 v-model="choosedinvestaddr" 
					 :class=
					 '{
						"colorwhite":true,
						 "image-box":true,
						 "input-address-bep":tapIndexzerochoose,
						 "input-address":!tapIndexzerochoose,
						 "font12":true
					 }'
					
					></textarea> 
					
					<view class="newbasecolor  copybtn" @click="()=>makecoyebtn(1)">复制</view>
				</view>
			</view>
		</view>
		
		<view class="address-box  address-box-hash colorwhite font18">
			<view class="font16">哈希值</view>
			<view class="input-box-wrap">
				<view class="input-box-hash">
					<textarea class="image-box input-address" auto-focus v-model="investhashval" placeholder="输入或粘贴哈希值" >
					</textarea> 
					<view v-if="false" class="newbasecolor  copybtn" @click="()=>makestikbtn(1)">粘贴</view>
				</view>
			</view>
		</view>
		<view class="btn-style-wrap font20" @click="()=>submitbtn()">
			<view class="btn-style-box colorwhite">确认提交</view>
		</view>
		<view class="txt-box-wrap bghalfwhite2">
			<text class="txt-color font20">温馨提示</text>
			<view class="txt-content colorwhite">
				<br>
				1、转账完后，请在10分钟内输入哈希值并且提交，过期无效。
				<br>2、请勿向上述地址充值任何非USDT资产，否则资产将不可找回。
				<br>3、您的充币需要经过区块确认，请耐心等待。
				<br>4、最低充值5U、否则将无法到账。
				<br>5、该地址可反复进行充币，一般情况下不会更换，如有更换，我们会提前公告通知您。
			</view>
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
				investaddr:null,
				choosedinvestaddr:"",
				investhashval:"",
				taplist:[
					{labelname:"USDT",checked:true,used:true}
				],
				tapIndexzerochoose:true,
				radiolist:[
					{labelname:"BEP-20",labelkey:"net", checked:true,labelvalue:'0'},
					{labelname:"TRC-20",labelkey:"net",checked:false,labelvalue:'1'}
				],
				avatarimg:"/static/images/head.png",
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: './inputbills'
			})
		},
		created() {
			this.initpage()
		},
		methods: {
			async submitbtn(){
			 let url = '/Exchange/investUsdt'
			 let item = this.radiolist.find(it=>it.checked)
			 let senddata = {
				 netType:item.labelname,
				 hashId:this.investhashval
			 }
			 let backjson = await this.$request.post(url,senddata)
			 if(backjson.code == 0){
				 uni.showToast({
					 title:"提交成功",
					 icon:"success"
				 })
				 setTimeout(function(){
					 uni.navigateBack()
				 },2000)
				 
			 }else{
				 uni.showToast({
				 	title:backjson.msg,
				 	icon:"error"
				 })
			 }
			},
			async initpage(){
				let url = "/Exchange/getInvestAddr"
				let returnjson = await this.$request.post(url)
				this.investaddr = returnjson.data
				this.choosedinvestaddr = this.investaddr[0]
			},
			makecoyebtn(_type=1){
				uni.setClipboardData({
					data: this.choosedinvestaddr,
					success: function () {
						uni.showToast({
							title:"复制成功",
							icon:"none"
						})
					}
				});

			},
			makestikbtn(){
				let that = this
				uni.getClipboardData({
					success: function (res) {
						that.investhashval = res.data
					}
				});

			},
			changeradionet (e) {
				let indexItem = e.detail.value
				let item = this.radiolist[indexItem]
				this.radiolist.forEach(its=>{
					its.checked = false
				})
				item.checked = true
				if(this.pageInfo.height<738)
					this.tapIndexzerochoose = !this.tapIndexzerochoose
				this.choosedinvestaddr = this.investaddr[indexItem]
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.wrap-box{
		//min-height: 92.5vh;		
		//background-image: url(@/static/images/bg_more.png) !important;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.tap-box-wrap{
			padding:5px 30px;display:flex; flex-direction: row; justify-content: center;
			align-items: center; text-align: center;
			.item-wrap{
				flex:1;
				.item-box{
					margin: 0 107px; padding-bottom: 5px;
				}
				.item-box-active{
					color:#54a9f7;
					border-bottom: 3px #54a9f7 solid;
				}
			}
		}
		.choose-new-box{
			padding: 10px 0;
			.net-box-wrap{padding: 10px;}
			.net-box{
				display: flex; flex-direction: row ;
				.label-item{
					display: flex; flex-direction: row ; margin-right: 10px;
				}
			}
		}
		
		.address-box{
			padding-top: 10px;
			.input-box-wrap{
				padding-top: 10px;
				.input-box{
					border: 1px #fff solid;
					border-radius: 5px;
					min-height: 45px;
					display: flex; 
					flex-direction: row;
					justify-items: center; align-items: center;
					.input-address-bep{
						padding-left: 5px;
						flex: 1;
					}
					.input-address{
					
					padding-left: 5px;
					min-height: 45px;
					line-height: 18px;
					padding-top: 6px;
					flex: 1;}
					.copybtn{ width: 50px;text-align: left;}
				}
			}
		}
		.address-box-hash{padding-top: 20px;}
		.input-box-hash{
			border-bottom:2px #fff solid;
			height: 45px;
			display: flex; flex-direction: row;
			justify-items: center; align-items: center;
			.input-address{
			padding-left: 5px;
			line-height: 20px; 
			flex: 1;}
			.copybtn{ width: 50px;text-align: left;}
		}
		.btn-style-wrap{
			margin-top: 30px;
			margin-bottom: 20px;
			display: flex; justify-content: center; align-items: center;
			.btn-style-box{
				border-radius: 10px;
				padding: 10px 50px;
				background-color: #54a9f7;
			}
		}
		.txt-box-wrap{
			margin-top: 20px;
			//margin-bottom: 30px;
			//border:3px #fff solid;
			padding: 5px;
			.txt-color{
				color: red;
			}
			.txt-content{
				padding: 20px 5px ; padding-top: 6px;
			}
		}
	}
	
	
	/*radio部分样式*/

/deep/ .uni-radio-input{
	height: 20px !important; width: 20px !important;
}

/deep/ .uni-radio-input-checked{
	background-color: #54a9f7 !important;color: #ffffff !important;
	 border-color: #54a9f7 !important;
}
</style>
