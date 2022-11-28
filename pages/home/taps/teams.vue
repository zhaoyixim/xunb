<template>
	<view class="wrap-box padding15"
	:style='{"minHeight": `${pageInfo.height-24}px`, "background-image":"url(" + require("@/static/images/bg_more.png") + ")"}'>
		<view class="charge-title-box bghalfwhite2 font18 coloryellow">
			<view class="title-box ">
				<view class="colorwhite">{{pageInfo.allperson}}</view>
				<view class="font16">社区总人数</view>
			</view>
			<view class="title-box">
				<view class="colorwhite">{{pageInfo.directperson}}</view>
				<view class="font16">直接粉丝</view>
			</view>
			<view class="title-box">
				<view class="colorwhite">{{pageInfo.redirectperson}}</view>
				<view class="font16">间接粉丝</view>
			</view>
		</view>
		<view v-if="false" class="teams-content colorwhite bghalfwhite2 font16">
			<view class="middel-box">
				<view class="middel-box-img">
					<image class="image-box" :src="inviteimg"></image>
				</view>
				<view class="middel-box-txt">
					<view>100052</view>
					<view>我的邀请码</view>
				</view>
				<view class="copybtn-box"> 
					<view class="copybtn font12">复制</view>
				</view>
			</view>
		</view>
		
		<view class="invite-box item-wrap">
			<view class="invite-box-wrap">
				<view class="invite-left">
					<view class="invite-left-imagebox">
						<image class="image-box" src="/static/images/myinvite.png"></image>
					</view>
				</view>
				<view class="invite-middle colorwhite font16">
					<view>邀请好友</view>
					<view class="invite-code-box">我的邀请码:{{pageInfo.id || '10000'}}</view>
				</view>
				<view class="invite-right colorwhite font18">
					<view class="invitebtn" @click="()=>invitenow()">立即邀请</view>
				</view>
			</view>
		</view>
		
		<view class="txt-content bghalfwhite2 colorwhite font16">
			<view class="txt-item">我的会员等级</view>
			<view class="txt-item font18 icon-wrap" >
				vip1
				<view class="litter-icon" 
				:style='{"background-image":"url(" + require("@/static/images/info.png") + ")"}'
				@click="()=>clickIcon()" ></view>
			</view>
			
		
		</view>
	
		<view class="teams-content-box colorwhite font20">
			<view class="content-box-wrap  bghalfwhite2">
				<view v-for="(it,indexs) in taplist" :key="indexs" :class='{"content-item":true,"item-active":it.checked}' @click="()=>handleclick(indexs)" >{{it.labelname}}</view>
			</view>			
		</view>
		<view class="list-wrap">
			<view class="list-box bghalfwhite2 fong18 colorwhite" v-for="(item,idx) in listdata" :key="idx" >
				<view class="left-box">
					<view class="font20 ">{{item.mphone}}</view>
					<view>会员等级：{{item.mlevel}}</view>
					<view> </view>
				</view>
				<view class="right-box">
					宝箱等级：{{item.box_lev}}
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
					allperson:0,
					directperson:0,
					redirectperson:0
				},
				inviteimg:"/static/images/jk.png",
				avatarimg:"/static/images/head.png",
				aboutcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				taplist:[
					{labelname:"直接粉丝",labelid:"0",checked:true},
					{labelname:"间接粉丝",labelid:"1",checked:false}
				],
				listdata:[],
				savezjie:[],
				savejjie:[],
				pageDiv:{
					pageNo:1,
					pageSize:10
				},
			}
		},
		created() {
		 this.pageinit()	
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.pageinit()
		},
		methods: {
			invitenow(){
				uni.navigateTo({
					url: './../invites'
				})
			},
			async pageinit(){
				let meminfo = this.$vcache.vget('meminfo')
				this.pageInfo.id = meminfo.id
				let url = '/Team'
				let senddata = {...this.pageDiv}
				let rebjson = await this.$request.post(url,senddata)
				//console.log("",rebjson)
				if(rebjson.code == 0){
					this.pageInfo.directperson = rebjson.data.ztCnt
					this.pageInfo.redirectperson = rebjson.data.jtCnt
					this.pageInfo.allperson = parseInt(rebjson.data.ztCnt) + parseInt(rebjson.data.jtCnt)
				
					rebjson.data.ztUser.forEach(it=>{
						let unijson = {
							mphone:it.m_phone,
							mlevel:"vip1",
							box_lev:it.box_lev
						}
						this.savezjie.push(...unijson)
					})
					
					rebjson.data.jtUser.forEach(it=>{
						let unijson = {
							mphone:it.m_phone,
							mlevel:"vip1",
							box_lev:it.box_lev
						}
						this.savejjie.push(...unijson)
					})
					this.listdata = this.savezjie
				}
			},
			handleclick(taplistindex){
				this.taplist.forEach(it=>it.checked = false)
				let item = this.taplist[taplistindex]
				if(taplistindex == 0){
					this.listdata = this.savezjie
				}else this.listdata = this.savejjie
				item.checked = true
			},
			clickIcon(){
				return false;
				this.$refs.popups.open('center')
			},
			handleclosewin(){
				this.$refs.popups.close()
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
		.charge-title-box{
			display: flex; flex-direction: row;
			border-radius: 5px;
			padding-top: 10px;
			padding-bottom: 20px;
			.title-box{
				flex: 1;
				padding: 10px;
				text-align: center;
			}
		}
		.teams-content{
			display: none;
			margin-top: 2px;
			padding: 10px 15px;
			.middel-box{
				display: flex; flex-direction: row;
				
				.middel-box-img{
					height: 42px; width: 42px;
				}
				.middel-box-txt{
					width:200px; padding-left: 5px;
				}
				.copybtn-box{
					display:flex;justify-content: center; align-items: center;
					.copybtn{
						background-color: #fff;
						color: #333;
						padding: 8px 18px; border-radius: 5px; text-align: center;
						
						
					}
				}
			}
		
		}
		.txt-content{margin-top: 2px; padding: 15px 10px;
			display:flex; 
			flex-direction: row; justify-content: center; align-items: center;
			position: relative;
			.txt-item{flex:1;}
			.icon-wrap{
				.litter-icon{
					position: absolute;
					margin-left: 35px;
					height: 20px; width:20px;
					margin-top: -20px;
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.teams-content-box{
			.content-box-wrap{
				display: flex; flex-direction: row;
				justify-content: center;  align-items: center;
				text-align: center; padding: 10px 0;
				.content-item{flex: 1;
				 margin: 0 16px; border-bottom: 4px transparent solid;
				 padding: 5px 0;}
				.item-active{border-bottom: 4px #fff solid;}
			}
		}
		.popup-content{
			height: 425px;  width: 375px; margin: auto;
		}
	}
	
	.list-box{
		display: flex; flex-direction: row;
		align-items: center;
		padding: 20px;
		margin-top: 10px;
		.left-box{flex: 1;}
		.right-box{
			width: 90px;
		}
	}
	
	.invite-box{
		margin: 10px 0;
		.invite-box-wrap{height: 60px;
		    background-image: linear-gradient(to right,#5e3bff,#65379f);
		    border-radius: 100px; 
			display: flex; flex-direction: row; padding: 5px;
			.invite-left{width: 50px;
				.invite-left-imagebox{width: 100%;height: 48px;}
			}
			.invite-middle{
				width: 160px;
				display: flex; flex-direction: column; justify-content: center;
				.invite-code-box{
					    color: rgba(256, 256, 256, 0.5);
				}
			}
			.invite-right{ 
				display: flex; justify-content: center;
				align-items: center;
				.invitebtn{
					    border: 1px solid #ffdd64;
					    border-radius: 100px;
					    background-image: linear-gradient(#fac17f,#fc9723);
					    padding: 6px 22px;
						height: 35px; overflow: hidden;
						line-height: 34px;
				}
			}
		}
	}
</style>
