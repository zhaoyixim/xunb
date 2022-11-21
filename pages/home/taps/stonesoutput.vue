<template>
	<view class="wrap-box padding15"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		<view class="tap-box-wrap font26 colorwhite">
			<view v-for="(item,indexs) in taplist" :key="indexs" class="item-wrap"  @click="()=>tapclick(indexs)">
				<view :class='{"item-box":true,"item-box-active":item.checked}'>{{item.labelname}}</view>
			</view>
		</view>
		<view class="choose-new-box font18 colorwhite">
			<view>选择网络</view>
			<view class="net-box-wrap">
				<radio-group @change="changeradionet" class="net-box">
					<label v-for="(it,inx) in  radiolist" :key="inx" class="label-item" v-if="it.used">
						 <radio  :class='{"radio-box":true,"radio-checked":it.checked}' :checked="it.checked" :value="it.labelvalue"/>
						 <view class="">{{it.labelname}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="address-box colorwhite font18">
			<view class="">地址</view>
			<view class="input-box-wrap">
				<view class="input-box">
					<input class="image-box input-address font18" v-model="addresshashval" placeholder="提币地址" />
					<view class="newbasecolor  copybtn" @click="()=>makestikbtn()" >粘贴</view>
				</view>
			</view>
		</view>
		
		<view class="address-box address-box-price colorwhite font18">
			<view class="">金额</view>
			<view class="input-box-wrap">
				<view class="input-box-hash">
					<input class="image-box input-address font20" :placeholder="showPlaceholder" type="number" v-model="kobfilledval" />
					<view class="kob-wrap newbasecolor">{{showUnit}}</view>
					<view class="newbasecolor  copybtn2" @click="()=>filledAll()">全部</view>
				</view>
				<view class="tips-box font12">可用金额：{{avaliablekobval}} {{showUnit}}</view>
			</view>
		</view>
		
		<view class="btn-style-wrap font20" @click="()=>makebtnsubmit()">
			<view class="btn-style-box colorwhite">提现</view>
		</view>
		
		<view class="txt-box-wrap bghalfwhite2">
			<text class="txt-color font20">提币须知</text>
			<view class="txt-content colorwhite">
				1、请谨慎核实提币地址，否则可能会导致资产丢失，不可找回。
				<br>2、为保障资金安全，平台会对每次提币进行安全审核，审核通过后即可到账。
			</view>
		</view>
		
		<view class="address-box colorwhite font18">
			<view class="">KOB币安智能链地址:</view>
			<view class="input-box-wrap">
				<view class="input-box2">
					<input class="image-box input-address" disabled readonly  v-model="bianaddresslink" />
					<view class="newbasecolor  copybtn" @click="()=>makecoyebtnbian()">复制</view>
				</view>
			</view>
			<view class="colorred font16 tips-litter-box" style="display: none;">注意：请勿向此地址转币</view>
		</view>
		
		<view class="stand-box"></view>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				taplist:[
					{labelname:"KOB",checked:true,used:true},
					{labelname:"USDT",checked:false,used:false}
				],
				meminfo:{},
				showUnit:"KOB",
				showPlaceholder:"最小20000",
				radiolist:[],
				avatarimg:"/static/images/head.png",
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				avaliablekobval:0,
				bianaddresslink:"",
				
				addresshashval:"",
				kobfilledval:0
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: './outputbills'
			})
		},
		created() {
			this.getnewuseinfo()
			this.getnettyps()
			this.getbianaddress()
		},
		methods: {
		 getbianaddress(){
			 let url = '/Exchange/getKobSafe'
			 this.$request.post(url).then(res=>{
				 if(res.code == 0)
					this.bianaddresslink = res.data
				 else{
					uni.showToast({
						title:res.msg
					}) 
				 }
					
			 })
		 },
		 async makebtnsubmit(){
			 let url = '/Exchange/cashOut'
			 let finditem  = this.taplist.find(it=>it.checked)
			 let finditems  = this.radiolist.find(it=>it.checked)
			 let senddata = {
				 addr:this.addresshashval,
				 ctp:finditem.labelname,
				 netType:finditems.labelname,
				 amount:this.kobfilledval
			 }
			 let rebakjson = await this.$request.post(url,senddata)
			 if(rebakjson.code == 0){
				 uni.showToast({
				 	title:'提现成功',
				 	icon:"success"
				 })
				 setTimeout(function(){
				 	uni.navigateBack()
				 },2000)
			 }else{
				 uni.showToast({
				 	title:rebakjson.msg,
				 	icon:"erorr"
				 })
			 }
		 },
			/*获取最新用户信息*/
		 async getnewuseinfo(){
			    let getmeminfo =  this.$vcache.vget("meminfo")
				let memurl = "/user/info"
				let sendPhone = {mphone:getmeminfo.m_phone}
				let meminfo = await this.$request.post(memurl,sendPhone)
				if(meminfo.code == 0) {
					this.meminfo = meminfo.data
					this.$vcache.vset("meminfo",meminfo.data)
					this.avaliablekobval =this.meminfo.kob
				}else{
					uni.showToast({
						title:meminfo.msg,
						icon:"erorr"
					})
				}
		 },
		 async getnettyps(){
				let url = '/Exchange/getNetType'
				let typeslist = []
				//{labelname:"BEP-20",used:true, checked:true,labelvalue:'0'},
			    await this.$request.post(url).then(res=>{
					if(res.code == 0){
						res.data.forEach((items,index)=>{
							let unitypes = {
								labelname:items,
								used:index ==0?true:false, 
								checked:index ==0?true:false,
								labelvalue:index.toString()}
							typeslist.push(unitypes)
						})
					}
				 })
				 this.radiolist = typeslist
			},
			makestikbtn(){
				let that = this
				uni.getClipboardData({
					success: function (res) {
						that.addresshashval = res.data
					}
				});
			},
			filledAll(){
				this.kobfilledval = this.avaliablekobval
			},
			tapclick(tapindex){
				let item = this.taplist[tapindex]
				this.taplist.forEach(it=>it.checked = false)
				
				if(tapindex == 0){
					this.radiolist[1].used = false
					this.showUnit="KOB"
					this.showPlaceholder="最小20000"
				}else{
					this.radiolist[1].used = true
					this.showUnit="USDT"
					this.showPlaceholder="最小10"
				}
				item.checked= true
			},
			
			changeradionet (e) {
			    let indexItem = e.detail.value
			    let item = this.radiolist[indexItem]
			    this.radiolist.forEach(its=>{
			    	its.checked = false
			    })
			    item.checked = true
			},
			makecoyebtnbian(){
				uni.setClipboardData({
					data: this.bianaddresslink,
					success: function () {
						uni.showToast({
							title:"复制成功",
							icon:"none"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
.stand-box{height: 30px;}
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
					margin: 0 40px; padding-bottom: 5px;
				}
				.item-box-active{
					border-bottom: 3px #54a9f7 solid;color: #54a9f7;
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
			padding-top: 5px;
			.input-box-wrap{
				padding-top: 5px;
				.input-box{
					border-bottom: 2px #fff solid;
					height: 45px;
					display: flex; flex-direction: row;
					justify-items: center; align-items: center;
					.input-address{padding-left: 5px;line-height: 45px; flex: 1;}
					.copybtn{ width: 50px;text-align: left;}
					
				}
				
				.input-box2{
					   border: 1px #fff solid;
						border-radius: 5px;
						height: 45px;
						display: flex; flex-direction: row;
						justify-items: center; align-items: center;
						.input-address{padding-left: 5px; line-height: 45px; flex: 1;}
						.copybtn{ width: 50px;text-align: left;}
					
				}
			}
			.tips-litter-box{margin-top: 10px;}
		}
		
		.address-box-price{margin-top: 20px;}
		.input-box-hash{
			border-bottom:2px #fff solid;
			height: 45px;
			display: flex; flex-direction: row;
			justify-items: center; align-items: center;
			.input-address{padding-left: 5px;line-height: 45px; flex: 1;}
			.copybtn{ width: 50px;text-align: left;}
			.kob-wrap{width: 50px;}
			.copybtn2{
				width: 50px;text-align: left;
			}
		}
		.tips-box{
			text-align: left; color: #FF9424;
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
			margin-top: 10px;
			padding:5px;
			//border:3px #fff solid;
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
