<template>
	<view class="jionmercal-box bgcommon"
	:style='{"minHeight": `${pageInfo.height+10}px`}'>
	
		
		<view class="top-box-wrap colorwhite ">
			<view class="item-title">
				<view class="font32">{{pagedata.total}}</view>
				<view class="font18">总收益</view>
			</view>
			<view class="item-wrap">
				<view class="item-box-wrap">
					<view class="font26">{{pagedata.today}}</view>
					<view class="font16">今日收益</view>
				</view>
				<view>|</view>
				<view class="item-box-wrap">
					<view class="font26">{{pagedata.yesterday}}</view>
					<view class="font16">昨日收益</view>
				</view>
			</view>
		</view>
		<view class="taplist font16 color999">
			<view v-for="(tap,indexss) in taplist" :key="indexss" 
			 :class='{"tap-item":true,"tap-active":tap.checked}' @click="()=>handletapclick(indexss)">{{tap.labelname}}</view>
			
		</view>
		<view class="list-wrap colorwhite">
			<view class="list-item-box-tr font16">
				<view class="tr-item">等级</view>
				<view class="tr-item">收益</view>
				<view class="tr-item">收益时间</view>
			</view>
			
			<view v-for="(items,idx) in listdatastore " :key="items.id" class="list-item-box-td font16">
				<view class="td-item">{{items.box_lev}}级</view>
				<view class="td-item">{{items.score_val}}USDT</view>
				<view class="td-item">{{items.create_time | substringtotime}}</view>
			</view>	
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				pageInfo:{
					height:this.$vcache.vget('safeHeight'),
					
				},
				pageDiv:{
					pageNo:1,
					pageSize:10
				},
				dtytpe:1,
				pagedata:{
					today:0,
					total:0,
					yesterday:0
				},
				taplist:[
					{labelname:"今日激活",checked:true},
					{labelname:"历史激活",checked:false}
				],
				listdatastore:[],
				meminfo:this.$vcache.vget('meminfo')
			}
		},
		filters:{
			substringtotime(substrings){
				return substrings.substring(0,11)
			}
		},
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()
			this.getdatastatictis()
			this.getlistdata()
		},
		onReachBottom(){
			this.pageDiv.pageNo ++
			this.getlistdata()
		},
		methods: {
			async pageinit(){
				let memurl = "/user/info"
				let sendPhone = {mphone:this.meminfo.mphone}
				let meminfos = await this.$request.post(memurl,sendPhone)
				if(meminfos.code == 0) 
						await this.$vcache.vset("meminfo",meminfos.data)
				
			},
			async getdatastatictis(){
				let url ='/user/getTotalUsdt'
				let sendPhone = {mphone:this.meminfo.mphone}
				let datastatitsc = await this.$request.post(url,sendPhone)
				if(datastatitsc.code == 0){
					this.pagedata = datastatitsc.data
				}else{
					uni.showToast({
						title:datastatitsc.msg,
						icon:"error"
					})
				}
			},
			async getlistdata(){
				//默认是今天的
				let url = '/user/getActive'
				let sendPhone = {mphone:this.meminfo.mphone,dt:this.dtytpe}
				sendPhone = {...sendPhone,...this.pageDiv}
				let activedata = await this.$request.post(url,sendPhone)
				if(activedata.code == 0){
					this.listdatastore.push(...activedata.data)
				}else{
					uni.showToast({
						title:activedata.msg,
						icon:"error"
					})
				}
			},
			handletapclick(tapindex){
				this.taplist.forEach(it=>it.checked = false)
				let item = this.taplist[tapindex]
				this.dtytpe = this.dtytpe==1?0:1
				this.pageDiv.pageNo = 1
				this.getlistdata()
				item.checked = true
			}
			
		}
	}
</script>

<style lang="scss">	
@import '@/common/common.scss';
	.jionmercal-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.top-box-wrap{
			display: flex; 
			flex-direction: column;
			justify-content: center; align-items: center;
			margin: 15px; margin-top:0;
			padding-top: 30px;
			background: linear-gradient(135deg, #61C3FF 0%, #32A8FF 100%) rgba(0,0,0,0.05);
			box-shadow: inset 0px 2px 0px 0px #FFFFFF;
			border-radius: 12px;
			.item-title{text-align: center;}
			.item-wrap{padding-top: 20px;padding-bottom: 30px;  display: flex; flex-direction: row; justify-content: space-between; align-items: center;}
			.item-box-wrap{width: 140px;text-align: center; }
		}
		.taplist{
			padding: 10px;
			display: flex; flex-direction: row;
			align-items:  flex-end;
			.tap-item{text-align: left;
			   
				border-bottom: 2px transparent solid;padding: 10px 0;margin: 0 18px; 
			 }
			.tap-active{
				font-size: 20px; color:#fbe69e;
				border-bottom: 2px #fff solid;}
		}
		
		.list-wrap{padding: 10px; }
		.list-item-box-tr{display: flex; flex-direction: row;
			/*border-radius: 4px;
			background-color: rgba(255, 215, 0, .5);*/
			background: rgba(255,206,0,0.3);
			border-radius: 2px;
			padding: 5px 0;
			padding-left: 20px;
			
		}
		.list-item-box-td{display: flex; flex-direction: row;padding: 5px 0;
			padding-left: 20px;
			.td-item{
				text-align: left;
			}
		}
		.tr-item{text-align: left; padding: 6px 0;}
		.td-item{text-align: left;padding: 6px 0;}
		.tr-item:nth-child(1){
			width: 80px;
		}
		.tr-item:nth-child(2){
			width: 90px;
		}
		.tr-item:nth-child(3){
			flex: 1;
		}
		
		.td-item:nth-child(1){
			width: 80px;
		}
		.td-item:nth-child(2){
			width: 90px;
		}
		.td-item:nth-child(3){
			flex: 1;
		}
	}
	
</style>
