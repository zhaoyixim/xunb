<template>
	<view class="about-box"
	:style='{"minHeight": `${pageInfo.height+10}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'
	>
		<view class="about-content-box font16 colorwhite">
			<view class="avatar-box bghalfwhite">
				<view class="top-box">
					<view class="top-name">头像</view>
					<view class="avatar-imgbox">
						<image class="image-box"  :src="avatarimg"></image>
					</view>
					<view class="icon-box avatar-icon">
						<uni-icons  @click="()=>tochangeavatar()" type="right" color="#bbb" size="24" />
					</view>
				</view>
				<view class="name-box">
					<view class="top-name">用户名</view>
					<view class="icon-box">
						<uni-icons  type="right" color="#bbb" size="24" @click="()=>tochangename()" />
					</view>
				</view>
			</view>
			<view class=" font16 colorwhite bghalfwhite changepwd-box">
				<view class="pwd-box border-df">
					<view class="">修改密码</view>
					<view class="icon-box">
						<uni-icons  type="right" color="#bbb" size="24" @click="()=>tochangepawd()" />
					</view>
				</view>
				
				<view class="pwd-box">
					<view class="">版本号</view>
					<view class="icon-box">
						v1.0.1
					</view>
				</view>
			</view>
			<view class="btn-box colorwhite font18">
				<view class="btn-wraps">
					退出
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
					height:this.$vcache.vget('safeHeight')
				},
				avatarimg:"/static/images/head.png",
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				getmeminfo:this.$vcache.vget("meminfo")
			}
		},
		mounted() {
			this.$commonFunc.tokenCheck()
			this.avatarimg =this.getmeminfo.m_header
		},
		methods: {
			tochangeavatar(){
				uni.navigateTo({
					url: './accouts/changeavatar'
				})
			},
			tochangename(){
				uni.navigateTo({
					url: './accouts/changename'
				})
			},
			tochangepawd(){
				uni.navigateTo({
					url: '/pages/login/changepwd'
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
		
		.about-content-box{
			padding: 15px;
			padding-bottom: 30px;
			.avatar-box{
				border-radius: 10px;
				.top-box{
					border-bottom: 1px rgba(255, 255, 255, 0.5) solid;
					display: flex; flex-direction: row; padding: 15px;
					.top-name{width: 160px;}
					.avatar-imgbox{
						width: 80px; height: 80px;
						.image-box{border-radius: 50%;}
					}
					.icon-box{width:125px; display: flex; justify-content: center; align-items: center;}
					.avatar-icon{flex: 1 !important;}
				}
				.name-box{padding: 15px; display: flex;flex-direction: row;  justify-content: space-between; align-items: center;}
			}
			.changepwd-box{
				margin-top: 10px; border-radius: 10px;
				.border-df{border-bottom: 1px rgba(255, 255, 255, 0.5) solid;}
				.pwd-box{padding: 15px; display: flex;flex-direction: row;  justify-content: space-between; align-items: center;}
			}
			.btn-box{
				margin-top: 30px;
				 
			padding: 5px 12px; display: flex; 
			flex-direction: row; justify-content: center; align-items: center;
				.btn-wraps{
					
					text-align: center;
					width: 100%;
					padding: 8px;border-radius: 20px;
				}
			}
		}
		
	}
	
</style>
