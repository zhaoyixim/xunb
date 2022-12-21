<template>
	<view class="about-box bgcommon" :style='{"minHeight": `${pageInfo.height-14}px`}'>
		<view class="about-content-box font16 colorwhite">
			
				<view class="msg-tit">{{tit}}</view>
				<br>
				<view class="font14">{{tm}}</view>
				<hr class="hr-solid">
				<view class="font14" v-html="detail">{{detail}}</view>
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
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				noticelist:[],
				tit:"",
				tm:"",
				detail:""
			}
		},
		onLoad(val){
			console.log(val)
			this.tit=val.tit
			
			this.tm=val.tm
			this.detail=val.detail
		},
		created() {
			this.$commonFunc.tokenCheck()
			
		},
		
		methods: {
			
			
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.about-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-top: 20px;
		.about-content-box{
			padding: 15px;
			padding-bottom: 30px;
			
		}
		.msg-tit{
			text-align: left;
		}
		
		
	}
	.hr-solid{
		border: 0;
		border-top: 1px solid #d0d0d5;
		margin: 5px 0 5px 0;
	}
	
</style>
