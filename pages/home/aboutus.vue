<template>
	<view class="about-box bgcommon"
	:style='{"minHeight": `${pageInfo.height+10}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'>
		
		<view class="about-content-box linebr colorwhite" v-html='msgcontent'>
			
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
				border:false,
				msgcontent:""
			}
		},
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()	
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
			text-align: center;
			width: 90%;
			padding-bottom: 30px;
		}
	}
	
</style>
