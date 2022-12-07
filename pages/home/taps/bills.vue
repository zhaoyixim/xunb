<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`}'
	>
		<view class="teams-content-box colorwhite font20">
			<view class="content-box-wrap">
				<view v-for="(it,idx) in taplist" :key="it.labelId" :class= '{"content-item":true,"item-active":it.checked}' 
				@click="()=>handletapclick(idx)">{{it.labelname}}</view>
			</view>			
		</view>
		<view class="list-wrap">
			<view v-for="(item,index) in msglist" :key="index" class="list-item-wrap bghalfwhite">
				<view class="item-left">
					<view class="bills-litter-title coloryellow font18">{{item.dec}}</view>
					<view class="ctime-wrap colorb3b3b3 font14">{{item.create_time}}</view>
				</view>
				<view class="item-right">
					<view class="font18 colorwhite right-item-top">{{item.score_val}}
					{{listindex == 0 ?'晶块':(listindex ==1?"KOB":"USDT")}}
					</view>
					<view class="colorb3b3b3 font14">{{listindex == 0 ?'晶块':'余额'}}:{{item.balance}}</view>
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
				taplist:[
					{labelname:"晶块账单",labelId:0,checked:true},
					{labelname:"KOB账单",labelId:1,checked:false},
					{labelname:"USDT账单",labelId:2,checked:false}
					
				],
				listindex:0,
				msglist:[],
				border:false,
				pageDiv:{
					pageNo:1,
					pageSize:10
				},
				itemindex:0
				
			}
		},
		created() {
			this.handletapclick(0)
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.handletapclick(this.itemindex)
		},
		methods: {
			async handletapclick(itemindex){
				this.itemindex = itemindex
				this.taplist.forEach(it=>{
					it.checked = false
				})
				let item = this.taplist[itemindex]
				let url = ''
				if(this.itemindex == 0) url = '/user/getCrystalLog'
				if(this.itemindex == 1) url = '/user/getKobLog'
				if(this.itemindex == 2) url = '/user/getUsdtLog'
				let meminfo = this.$vcache.vget('meminfo')
				let senddata = {
					...this.pageDiv,
					mphone:meminfo.m_phone
				}
				let rebakjson = await this.$request.post(url,senddata)
				if(rebakjson.code == 0) this.msglist.push(...rebakjson.data)
				 
				 
				item.checked = true
				this.listindex = itemindex
				
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.right-item-top{margin-bottom: 5px;}
	.wrap-box{
		//min-height: 92.5vh;		
		//background-image: url(@/static/images/bg_more.png) !important;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.teams-content-box{
			.content-box-wrap{
				display: flex; flex-direction: row;
				justify-content: center;  align-items: center;
				text-align: center; padding: 10px 0;
				.content-item{flex: 1; padding: 5px 0;}
				.item-active{border-bottom: 3px #fff solid;}
			}
		}
		.list-wrap{
			margin: 10px 0;
			.list-item-wrap{
				display: flex; flex-direction: row; padding:15px; border-radius:10px;
				justify-content: center; align-items: center;
				margin-bottom: 10px;
				.bills-litter-title{margin-bottom: 10px; }
				.item-left{flex:1}
				.item-right{
					width: 86px; text-align:center;
					
				}
			}
			
		}
		
	}
	
</style>
