<template>
	<view class="about-box bgcommon" :style='{"minHeight": `${pageInfo.height-14}px`}'>
		<view class="about-content-box font16 colorwhite">
			
		
			
			
			<view v-for="(item,index) in noticelist" :key="index" @click="()=>msglistClick(item)">
				
				<view class="msg-list-item">
					<view class="msg-tit font16">【官方公告】{{item.d_title}}</view>
					<view class="msg-time font14">{{item.d_time}}</view>
				</view>
				
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
				let url = "/docs/list"
				let returnjson = await this.$request.post(url)
				if(returnjson.code == 0){
					this.noticelist =returnjson.data
				}
			},
			msglistClick(item){
				console.log(item);
				uni.navigateTo({
					url:"/pages/home/sysmsg?msgId="+item.id+"&tit="+item.d_title+"&tm="+item.d_time+"&detail="+item.d_detail,
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.about-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
		
		
		
		.msg-list-item{
			border-radius: 5px;
			margin: 10px;
			padding: 10px;
			background-color: rgba(255, 255, 255, 0.08) !important;
			.msg-tit{
				word-wrap: break-word;
				overflow: hidden;
				height: 42px;
						
			}
			.msg-time{
				margin-top: 14px;
			}
		}
	
	}
	
	
	
</style>
