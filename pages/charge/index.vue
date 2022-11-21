<template>
	<view class="charge-box-wrap"
	:style='{"minHeight": `${pageInfo.height-44}px`,"background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		
		<view class="charge-box">
			<view v-for="(item,index) in goodslist" :key="item.id" class="box-wrap color333 bgwhite" @click="()=>handleclickmodel(item)">
				<view class="box-img">
					<image  class="image-box" :src="item.gds_pic"></image>
				</view>
				<view class="box-footer font18">
					<view class="left-box font16">
						<view class="text-box">售价:{{item.kob}}kob</view>
					</view>
					<view class="right-box"><image  class="image-box" :src="labelIconPath"></image> </view>
				</view>
			</view>
			
		</view>
		
		<uni-popup :show="popupshow" ref="popupgoods" mask-background-color="transparent" >
			<view class="popup-content-wrap bgwhite">
				<view class="fon28 color666">
					<view class="title-box font24">
						<view class="color333">购买说明</view>
						<view class="title-cancel-icon" @click="()=>handleclosewin()">
							<uni-icons type="closeempty" color="#666" size="30"></uni-icons>
						</view>
					</view>
					<view class="mes-box font16">
						<view class="meg-box-title">确定要花费{{clickitems.kob}}KOB购买此商品?</view>
						
					</view>
					<view class="msg-btn-box font24 colorwhite">
						<view class="btn-box2" @click="()=>handleclick()">确定购买</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				popupshow:false,
				clickitems:{},
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				labelIconPath:'/static/images/btnDh.png',
				goodslist: []
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: './bills'
			})
		},
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()
		},
		methods: {
			handleclosewin(){
				this.popupshow = false
				this.$refs.popupgoods.close()
			},
			async pageinit(){
				let url = '/store/getGoods'
				let rebackjson = await this.$request.post(url)
				if(rebackjson.code == 0 ){
					this.goodslist = rebackjson.data
				}else{
					uni.showToast({
						title:rebackjson.msg,
						icon:"error"
					})
				}
			},
			handleclickmodel(items){
				this.clickitems = items
				this.popupshow = true
				this.$refs.popupgoods.open()
			},
			async handleclick(){
				let url = '/store/createBill'
				let items = this.clickitems
				let senddata = {
					gdsId:items.id
				}
				console.log("items",items)
				
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0){
					uni.showToast({
						title:"购买成功",
						icon:"success"
					})
					let that = this
					setTimeout(function(){
						/*兑换成功*/
						that.updatenewuseinfo()
					},1000)
				}else{
					uni.showToast({
						title:rebackjson.msg,
						icon:"error"
					})
				}
				
			},
			/*获取更新用户信息*/
			async updatenewuseinfo(){
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
			}
			
		}
	}
</script>

<style lang="scss">	
	@import '@/common/common.scss';
	.charge-box-wrap{
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.charge-box{
		display: flex;
		width: 98%;
		height: auto;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px 0 10px 10px;
	}
	.box-wrap{
		 flex: 1;
		 width: calc((100% - 30px) / 2);
		 min-width: calc((100% - 30px) / 2); 
		 max-width: calc((100% - 30px) / 2); 
		 height: 116px;
		 overflow: hidden;
		 border-radius: 10px;
		 margin: 8px 10px 8px 0;
		 padding-bottom: 10px;
		.box-img{ 
			height: 96px;
			border-radius: 10px;
		}
		.box-content{ height: 53px;
			padding: 5px; padding-bottom: 0;font-size: 16px;
			text-align: left;
			word-break: break-all; 
			overflow:hidden;
			text-overflow:ellipsis;
               
		}
		.box-footer{display: flex; 
			flex-direction: row;
			justify-content: space-between; 
			
			.left-box{flex:1; display: flex; flex-direction: row; 
			 padding-left: 3px;
			 }
			 .text-box{
				 padding-top: 3px;
			 }
			.stoneIcon-box{
				height: 24px; width: 24px; margin-left: 5px; 
			}
			.right-box{width: 28px;height: 24px; 
			margin-right: 10px;padding-top: 2px;
			padding-right: 1px;
			}
		}
	}
</style>
