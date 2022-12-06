<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
	
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-top-box  font18">
					<view class="coloryellow">提现{{item.c_type}} ({{item.nettype}})</view>
					<view class="txtfixed colorwhite">-{{item.amount}}{{item.c_type}} </view>
				</view>
				<view class="item-middel-box">
					<view class="text-box-wrap coloryellow font18">提现地址:<view class="font16 colorwhite text-content">{{item.outaddr}}</view> </view>
				</view>
				<view class="item-bottom-box colorb3b3b3">
					<view class="font16">{{item.c_time}}</view>
					<view class="font16"> {{item.statxt}} </view>
				</view>
			
			</view>
		</view>
	</view>
	<!--btncomfirimg  btnsure  btnfail-->
</template>
<script>

	export default {
		data() {
			return {
			   pageInfo:{
			   	height:this.$vcache.vget('safeHeight')
			   },
			   pageDiv:{
			   	pageNo:1,
			   	pageSize:10
			   },
				dataList:[]
			}
		},
		created() {
			this.getbills()
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.getbills()
		},
		methods: {
			async getbills(){
				let url = '/user/getCashOut'
				let senddata = {...this.pageDiv}
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0 ){
					let savejson = []
					rebackjson.data.forEach(it=>{
						let unitjson={
							amount:it.amount,
							c_time:it.c_time,
							c_type:it.c_type,
							nettype:it.net_type,
							outaddr:it.out_addr,
							stabtnstyle:it.bill_sta ==0?"btncomfirimg":(it.bill_sta==1?"btnsure":"btnfail"),
							statxt:it.bill_sta ==0?"确认中":(it.bill_sta==1?"已转入":"充值失败")
						}
						savejson.push(unitjson)
					})
					this.dataList.push(...savejson)
					//this.dataList = savejson
				}else{
					uni.showToast({
						title: rebackjson.msg,
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
.list-item-wrap{margin-bottom: 10px;}
.item-top-box{
	display: flex;
	padding: 10px; padding-bottom: 0px;
	justify-content: space-between;
	align-items: center; justify-items: center;
	.txtfixed{padding-top: 6px;}
}
.item-middel-box{padding: 2px 10px; 
	.text-box-wrap{
		display: flex; flex-direction: row; align-items: center;
		.text-content{padding-left:4px; width:69.2%;
		 word-wrap: break-word;
		 word-break: break-all;
		  }
	}
}
.item-bottom-box{
	display: flex;padding: 4px 10px; 
	justify-content: space-between;
	align-items: center;
}

	
</style>
