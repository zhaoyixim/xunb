<template>
	<view class="about-box bgcommon"
	:style='{"minHeight": `${pageInfo.height+10}px`}'>
		
		<view class="about-content-box linebr colorwhite">
			KOB（Kob Coin）BSC
			Kob Coin是由KO交易所发行的平台代币，简称KOB，是推动社区生态发展的去中心化数字资产。
			
			KOB作为KO社区生态系统和去中心化交易所燃料，已经应用到多个场景，比如:寻宝记平台赋能以及消耗、扩大社区生态发展。
			已有英超利物浦前队长迈克尔欧文、NBA白乔丹等重磅明星支持发声。
			
			
		<view class="v-wrap">
			<view v-for="(item,index) in mp4list" :key="index">
				<video class="v-box"
				:src="item.mp4url"
						       
				controls></video>
			</view>
		       
		   
			
		</view>
			
			寻宝记生态平台将会收取激活宝箱费用，用户量达标后会接入广告（激活费以及广告收益都用于KOB添池拉盘，70%添池，30%拉盘，保持KOB持续上涨）开启全民布道时代。
			
			KO交易所是一家全球性的数字货币交易服务商，提供专业的币币交易、期货交易、数字资产管理、数据分析等综合服务平台。KO定位 “为共识赋能”，拥有强大的技术团队和运营团队，致力于发现优质的数字资产。通过建立一流平台及整合优质资源，为全球用户提供最安全、高效、稳定的数字资产交易服务和金融产品。目前已经获得超过数亿美元的战略投资。未来KO将进一步研发打造基于区块链创新技术的生态应用。
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
					height:this.$vcache.vget('safeHeight'),
				},
				mp4list:[
					{mp4url:this.$request.getOriginBaseUrl()+'/mp4/1.mp4' },
					{mp4url:this.$request.getOriginBaseUrl()+'/mp4/2.mp4' },
					{mp4url:this.$request.getOriginBaseUrl()+'/mp4/3.mp4' }
				],
				
				msgcontent:""
			}
		},
		created() {
			
		
			this.$commonFunc.tokenCheck()
			//this.pageinit()	
		},
		methods: {
			async pageinit(){
				let url = '/docs/getFile'
				let senddata = {
					fileId:30
				}
				let jsondata = await this.$request.post(url,senddata)
				this.msgcontent = jsondata.data.d_detail
			}
			
		}
	}
</script>

<style lang="scss">	
@import '@/common/common.scss';
	.about-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.about-content-box{
			padding: 15px;margin: auto;
			//text-align: center;
			width: 90%;
			padding-bottom: 30px;
		}
	}
	.v-wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		.v-box{padding: 0;margin: 10px 0;}
	}
</style>
