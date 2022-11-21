<template>
	<view class="home-box" 
	:style='{"minHeight": `${pageInfo.height}px`, "background-image":"url(" + require("@/static/images/bg_my.png") + ")"}'>
		<view class="title-box item-wrap">
			<view class="title-box-wrap"  
			:style='{"background-image":"url(" + require("@/static/images/my_info.jpg") + ")"}'
			>
				<view class="top-box">
					<view class="avatar-box">
						<view class="avatar-image-wrap">
							<image class="image-box" :src="pageInfo.avatar || '/static/images/head.png'  "></image>
						</view>
					</view>
					<view class="userinfo-box font18 colorwhite">
						<view>{{pageInfo.uname || '寻宝家'}}</view>
						<view>{{pageInfo.mphone}}</view>
					</view>
				</view>
				<view class="bottom-box colorwhite font18">
					<view class="item-box">
						<view>{{pageInfo.crystalnum}}</view>
						<view class="coloryellow">晶块</view>
					</view>
					<view class="item-box">
						<view>{{pageInfo.kobnum}}</view>
						<view class="coloryellow">KOB</view>
					</view>
					<view class="item-box">
						<view>{{pageInfo.usdtnum}}</view>
						<view class="coloryellow">USDT</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="item-wrap tap-box">
			<view class="tap-box-wrap">
				<view v-for="(it,idx) in taplist" :key="it.labelId" class="tap-item-box" @click="()=>handletapclick(it)">
					<view class="tap-image">
						<image class="image-box" :src="it.labelIcon"></image>
					</view>
					<view class="font14 colorwhite"> {{it.labelName}} </view>
				</view>
			</view>
		</view>
		
		<view class="list-box item-wrap ">	
			<uni-list :border="border">
				<view v-for="(item,index) in barList" :key="index" @click="()=>handlebarclick(item)" >
					<uni-list-item  showArrow :title="item.labelName" />
				</view>
			</uni-list>		
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
					kobnum:0,
					crystalnum:0,
					usdtnum:0,
					uname:"",
					avatar:"",
					invite_code:"",
					mphone:""
				},
				border:false,
				barList: [
					{labelId:1,labelName:"关于我们",tohref:"./aboutus"},
					{labelId:2,labelName:"加入社群",tohref:"./joinus"},
					{labelId:3,labelName:"帮助中心",tohref:"./helpcenter"},
					{labelId:4,labelName:"系统公告",tohref:"./sysmsg"},
					{labelId:5,labelName:"流水明细",tohref:"./taps/bills"},
					{labelId:6,labelName:"加盟商",tohref:"./joinmercal"},
					{labelId:7,labelName:"账户管理",tohref:"./accountmanage"}				
				],
				taplist:[
					{ labelId:1,labelName:"晶块兑换",tohref:"./taps/chargestones", labelIcon:"/static/images/dh.png"},
					{ labelId:2,labelName:"充币",tohref:"./taps/stonesinput",labelIcon:"/static/images/zc.png"},
					{ labelId:3,labelName:"提币",tohref:"./taps/stonesoutput", labelIcon:"/static/images/td.png"},
					{ labelId:4,labelName:"我的团队",tohref:"./taps/teams", labelIcon:"/static/images/zd.png"}
				]
			}
		},
	
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()
		},
		methods: {
			pageinit(){
				let meminfo = this.$vcache.vget('meminfo')
				this.pageInfo.kobnum = meminfo.kob
				this.pageInfo.crystalnum = meminfo.crystal
				this.pageInfo.usdtnum = meminfo.usdt
				this.pageInfo.uname = meminfo.m_name
				this.pageInfo.avatar = meminfo.m_header
				this.pageInfo.invite_code = meminfo.invite_code
				this.pageInfo.id = meminfo.id
				this.pageInfo.mphone = meminfo.m_phone
			},
			handlebarclick(item){
				uni.navigateTo({
					url: item.tohref
				})
			},
			handletapclick(item){
				uni.navigateTo({
					url: item.tohref
				})
			},
			invitenow(){
				uni.navigateTo({
					url: './invites'
				})
			}
			
		}
	}
</script>

<style lang="scss">	
@import '@/common/common.scss';
	.home-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.list-box{}
		/deep/ .uni-list{
			background-color: rgba(255,255,255,.08) !important;
		}
		/deep/ .uni-list-item{
			background-color: rgba(255,255,255,.08) !important;
		}
		/deep/ .uni-list-item__content-title{	color: white !important; }
		.item-wrap{padding: 7.5px;}
		.title-box{
			.title-box-wrap{
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin: auto; 
				border-radius: 15px;
				height: 185px;
				.top-box{
					display:flex; flex-direction: row;
					padding: 15px; border-bottom: 1px #fff solid;
					.avatar-box{
						width: 33.3%;
						.avatar-image-wrap{
							border: 1px #fff solid;
							width: 82px; height: 82px;
							border-radius: 50%;
							.image-box{border-radius: 50%;}
						}
					}
					.userinfo-box{flex: 1;
						display: flex; flex-direction: column;
						 justify-content: center;
					}
				}
				.bottom-box{flex:1;
					display: flex;  
					flex-direction: row; 
					padding-top: 8px;
					.item-box{flex:1; text-align: center;
					 display: flex; flex-direction: column;
					 align-items: center; justify-content: center;
					}
					
				}
			}
		}
	
		.tap-box{
			padding-right: 7.5px;
			.tap-box-wrap{
					border-radius: 5px; 
					background-color: rgba(255,255,255,.08)!important;
					display: flex; 
					flex-direction: row; 
					padding: 5px;
					padding-bottom: 10px;
				.tap-item-box{
					width: 25%; 
					display: flex; flex-direction: column;
					align-items: center;
					.tap-image{
						width: 40px; height: 40px;
					}
				}
			}
		}
	}
	/deep/ .uni-list::after{height: 0 !important;}
</style>
