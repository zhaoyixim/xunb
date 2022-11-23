<template>
	<view class="wrap-box padding15"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
	
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-left">
					<view class="bills-litter-title coloryellow font20 marbtn10">充值{{item.usdt}} USDT</view>
					<view class="ctime-wrap colorb3b3b3 font16">{{item.c_time}}</view>
				</view>
				<view class="item-right colorwhite font20">
					<view class="marbtn10 font16"> </view>
					<view :class='["font20",item.stabtnstyle]'> {{item.statxt}} </view>
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
				let url = '/user/getInvestBill'
				let senddata = {...this.pageDiv}
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0 ){
					let savejson = []
					rebackjson.data.forEach(it=>{
						
						let unitjson={
							usdt:it.invest_cnt,
							c_time:it.c_time,
							stabtnstyle:it.bill_sta ==0?"btncomfirimg":(it.bill_sta==1?"btnsure":"btnfail"),
							statxt:it.bill_sta ==0?"确认中":(it.bill_sta==1?"成功":"失败")
						}
						savejson.push(unitjson)
					})
					this.dataList.push(savejson)
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
@import './common.scss';
	
</style>
