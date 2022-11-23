<template>
	<view class="wrap-box padding15"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		
		
		<view class="list-wrap">
			<view v-for="(item,index) in dataList " :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-left">
					<view class="bills-litter-title coloryellow font20 marbtn10">兑换{{item.kob}} KOB</view>
					<view class="ctime-wrap colorb3b3b3 font16">{{item.c_time}}</view>
				</view>
				<view class="item-right colorwhite font20">
					<view class="marbtn10 font16"> 消耗{{item.ctystal}}个晶块</view>
					<view class="font20 btnsure"> 成功 </view>
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
							kob:it.kob_cnt,
							ctystal:it.out_cnt,
							c_time:it.c_time
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
