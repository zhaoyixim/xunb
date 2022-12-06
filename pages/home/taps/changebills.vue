<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-left">
					<view class="bills-litter-title coloryellow font20 marbtn10">{{item.dec}}</view>
					<view class="ctime-wrap colorb3b3b3 font18">{{item.create_time}}</view>
				</view>
				<view class="item-right colorwhite font20">
					<view class="marbtn10">{{item.score_val}}晶块</view>
					<view v-if="false" class="marbtn10 font16"> 消耗个晶块</view>
					<view v-if="false" class="font20 btnsure"> 成功 </view>
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
			this.getbills()
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.getbills()
		},
		methods: {
			async getbills(){
				let url = '/user/getCKB'
				let senddata = {...this.pageDiv}
				let rebackjson = await this.$request.post(url,senddata)
				if(rebackjson.code == 0 ){
					let savejson = []
					rebackjson.data.forEach(it=>{
						let unitjson={
							dec:it.dec,
							kob:it.kob_cnt,
							score_val:it.score_val,
							create_time:it.create_time
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
@import './common.scss';



</style>
