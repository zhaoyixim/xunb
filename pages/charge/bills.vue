<template>
	<view class="wrap-box padding15"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-left">
					<view class="bills-litter-title coloryellow font22 marbtn10">购买:{{item.usdt}}USDT</view>
					<view class="ctime-wrap colorb3b3b3 font20">{{item.c_time}}</view>
				</view>
				<view class="item-right colorwhite font20">
					<view class="marbtn10 font14">消耗{{item.kob}}KOB</view>
					<view class="font22 btnsure"> {{item.btntxt}} </view>
				</view>
			</view>
		</view>
	</view>
	<!--btncomfirimg  btnsure  btnfail-->
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
				let url = '/user/getGdsBill'
				let meminfo = this.$vcache.vget("meminfo")
				let senddata = {...this.pageDiv}
				senddata.mphone = meminfo.m_phone
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0 ){
					let savejson = rebackjson.data
					let resultjson = []
					savejson.forEach(it=>{
						let unitjson = {
							usdt:it.gds.usdt,
							kob:it.gds.kob,
							gds_id:it.gds_id,
							id:it.id,
							c_time:it.c_time,
							btntxt:"成功",
							sta:it.sta
						}
						resultjson.push(unitjson)
					})
					this.dataList.push(...resultjson)
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
	.wrap-box{
		//min-height: 92.5vh;		
		//background-image: url(@/static/images/bg_more.png) !important;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
		.list-wrap{
			margin: 10px 0;
			.marbtn10{margin-bottom: 10px;}
			.list-item-wrap{
				display: flex; flex-direction: row; padding:15px; border-radius:5px;
				margin-bottom: 5px;
				.item-left{flex:1; }
				.item-right{
					width: 86px; text-align:center;
					
				}
			}
		}
		
	}
	
</style>
