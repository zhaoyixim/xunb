<template>
	<view class="about-box bgcommon" :style='{"minHeight": `${pageInfo.height-14}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'>
		<view class="about-content-box font16 colorwhite">
			<view v-for="(item,index) in noticelist" :key="index">
				<view class="msg-box">{{item.d_title}}</view>
				<view class="msg-txt font14">{{item.d_detail}}</view>
			</view>
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
				noticelist:[]
			}
		},
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()
		},
		methods: {
			async pageinit(){
				let url = "/docs/notice"
				let returnjson = await this.$request.post(url)
				if(returnjson.code == 0){
					this.noticelist =returnjson.data
				}
			}
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
			display: flex; flex-direction: row;
		}
		.msg-box{width: 200px; overflow: hidden;}
		.msg-txt{flex: 1;text-align: left;padding-top: 20px; padding-left: 10px;padding-right: 10px;}
	}
	
</style>
