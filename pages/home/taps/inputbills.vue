<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`}'
	>
	
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-top-box font18 colorwhite">
					<view>USDT链上充值</view>
					<view>{{item.nettype}}</view>
				</view>
				<view class="item-middle-box">
					<view class="middle-item-box coloryellow font16">
						<view class="middel-top-item item-flex">数量</view>
						<view class="middel-top-item item-flex">状态</view>
						<view class="middel-top-item middelwidthfixed">时间</view>
					</view>
					<view class="middle-item-box colorb3b3b3 font16">
						<view class="middel-top-item item-flex">{{item.usdt}}</view>
						
						
						<view v-if="item.statxt=='已转入'" class="middel-top-item item-flex fc-green">{{item.statxt}} </view>
						<view v-else-if="item.statxt=='充值失败'" class="middel-top-item item-flex fc-red">{{item.statxt}} </view>
						<view v-else  class="middel-top-item item-flex">{{item.statxt}} </view>
						<view class="middel-top-item middelwidthfixed ctime-item font14">{{item.c_time}}</view>
					</view>
					
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
			this.$commonFunc.tokenCheck()
			this.getbills()
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.getbills()
		},
		methods: {
			async getbills(){
				let url = '/user/getInvestBill'
				let senddata = {...this.pageDiv}
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0 ){
					let savejson = []
					rebackjson.data.forEach(it=>{
						
						let unitjson={
							usdt:it.invest_cnt,
							c_time:it.c_time,
							nettype:it.net_type,
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
.list-item-wrap{ padding: 10px;
  margin-bottom: 10px;
 border-radius: 5px;}
.item-top-box{display: flex;
  
	justify-content:space-between
}
.item-middle-box{padding-top: 4px;
	.middle-item-box{
		display: flex;
		align-items: center;
		flex-direction: row;
		padding-bottom: 4px;
		.item-flex{text-align: center;flex:1}
		
	}
	.middelwidthfixed{width: 120px; text-align: center;}
	.ctime-item{padding-top: 4px;}
}

.fc-green{
	color: lawngreen;
}
.fc-red{
	color: red;
}
</style>
