<template>
	<view class="index-box bgcommon" 
	:style="[{minHeight: `${pageInfo.height}px`}]">
		<view class="top-box-wrap" >
			<view class="uni-margin-wrap">
				<swiper class="swiper-topbox" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(items,indexs) in srollimgs" :key="items.id">
						<view v-if="items.is_show" class="swiper-item-box" @click="()=>srollclick(items)">											
							<image class="image-box" :src="items.pic_url" /> 										
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="bulletin font12" v-if="noticetxt">
					<uni-notice-bar color="#000" background-color="rgba(255,255,255,0.5)" single :text="noticetxt" />
			</view>	
		</view>
		<scroll-view class="zf-idx-container" 
		:style='{  "background-image":"url(" + require("@/static/images/idx_bg.png") + ")"}'>			
			<view class="viewcontroller">
				<view class="mui-row-box colorwhite">
					<view v-for="(itm,index) in taplist" :key="index" class="box-cell" @click="()=>clicktohref(itm,index)">
						<view class="icon-title-box">
							<image :src="itm.labeliconpath" class="image-box" />
						</view>		
						<view class="taptxt">{{itm.labelname}}</view>
					</view>
				</view>
				<!--宝箱区-->
				<view class="box-area">
					<uni-section  type="line" padding>
						<!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
						<swiper class="swiper-box-wrap"
						 :style='{ "minHeight":`${pageInfo.height-360}px`}'
						 
						 :indicator-dots="true" indicator-active-color="#FFF">
							<swiper-item v-for="(items,indexs) in boxList" :key="indexs">
								<uni-grid :column="3" :show-border="false" :highlight="true" @change="(e)=>changeboxitem(indexs,e)">
									<uni-grid-item v-for="(item, index) in items.itembox" :index="index" :key="index">
										<view :class='{"grid-item-box":true,"grid-item-box-active":item.checked}'>
											<image :src="item.imgsrc"  class="image-box" mode="aspectFill" />
											<view v-if="!item.allowed " class="item-dot-box colorwhite font12">{{item.bnm}}</view>
										</view>
									</uni-grid-item>
								</uni-grid>
							</swiper-item>
						</swiper>
					</uni-section>
				</view>
			</view>		
		</scroll-view>
		
		<uni-popup :show="popupshow" ref="popupunion" mask-background-color="transparent" >
			<view class="popup-content-wrap bgwhite">
				<view class="fon28 color666">
					<view class="title-box font24">
						<view class="color333">加盟说明</view>
						<view class="title-cancel-icon font30" @click="()=>handleclosewin()">
						<uni-icons type="closeempty" color="#666" size="30"></uni-icons>
						</view>
					</view>
					<view class="mes-box font16">
						<view class="meg-box-title">加盟所需:{{joinneedusdt}}USDT</view>
						<view>了解详情 请联系在线客服</view>
					</view>
					<view class="msg-btn-box font24 colorwhite">
						<view class="btn-box2" @click="()=>handlejoinus()">确认加盟</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup :show="popupboxshow" ref="popupbox" mask-background-color="transparent" >
			<view class="popup-content-wrap bgwhite">
				<view class="fon28 color666">
					<view class="title-box font24">
						<view class="color333">激活说明</view>
						<view class="title-cancel-icon" @click="()=>handleclosewin2()">
						<uni-icons type="closeempty" color="#666" size="30"></uni-icons>
						</view>
					</view>
					<view class="mes-box font16">
						<view class="meg-box-title">宝箱等级:{{boxlevel}}</view>
						<view class="meg-box-title">日产量:{{daygeneratenum}}晶块</view>
						<view>激活宝箱所需:{{boxactiveneedusdt}}USDT</view>
					</view>
					<view class="msg-btn-box font24 colorwhite">
						<view class="btn-box2" @click="()=>handleactive()">确认激活</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
				popupboxshow:false,
				popupshow:false,
				boxactiveneedusdt:0,
				boxclicklistindex:0,
				boxitemindex:0,
				boxlevel:0,
				daygeneratenum:0,
				pageInfo:{
					height:this.$vcache.vget('safeHeight')
				},
				srollimgs:[
					{pic_url:"/static/images/idx_top1.png",is_show:true,link_url:"#",allowToOutHref:false},
					{pic_url:"/static/images/idx_top2.png",is_show:true,link_url:"#",allowToOutHref:false},
					{pic_url:"/static/images/idx_top3.png",is_show:true,link_url:"#",allowToOutHref:false},
					{pic_url:"/static/images/idx_top.png",is_show:true,link_url:"#",allowToOutHref:false},
				],
				taplist:[
					{labelname:"新手",itemid:28,labeliconpath:"/static/images/noob.png",tohref:"./newuser"},
					{labelname:"社区",labeliconpath:"/static/images/community.png",tohref:"./../home/joinus"},
					{labelname:"邀请",labeliconpath:"/static/images/invite.png",tohref:"./../home/invites"},
					{labelname:"加盟",labeliconpath:"/static/images/unio.png",tohref:"./../home/joinmercal"}
				],
				activeBoximgsrc:"/static/images/box2.png",
				boxList:[],
				noticetxt:"",
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				meminfo:{},
				duration: 500,
				joinneedusdt:0,
				scrollTop:0,
			}
		},		
		async created() {
			let meminfo = await this.$vcache.vget('meminfo')
			
			if(!meminfo || null == meminfo.id || undefined ==meminfo.id ){
				
				uni.navigateTo({
					url: '../login/index'
				})
				return ;
			}
			this.meminfo= meminfo
			this.$commonFunc.tokenCheck()
			await this.pageinit()
		},
		async mounted() {
			if(!this.boxList || undefined == this.boxList.length){
				await this.getboxlist()
			}
		},
		methods: {
			async pageinit(){
				//this.meminfo = await this.$vcache.vget('meminfo')
				await this.getScrollImgs()
				await this.getboxlist()
				await this.getnoticetxt()
				await this.getjoinusdt()	
				await this.updatenewuseinfo()
			},
			/*获取更新用户信息*/
			async updatenewuseinfo(){
				let memurl = "/user/info"
				let sendPhone = {mphone:this.meminfo.m_phone}
				let meminfo = await this.$request.post(memurl,sendPhone)
				if(meminfo.code == 0) {
					this.meminfo = meminfo.data
					this.$vcache.vset("meminfo",meminfo.data)
				}else{
					uni.showToast({
						title:meminfo.msg,
						icon:"erorr"
					})
				}		   
			},
			
			async getjoinusdt(){
				let getusdturl = '/union/getUnionUsdt'
				let getusdtdata = await this.$request.post(getusdturl)
				this.joinneedusdt = getusdtdata.data
			},
			async getnoticetxt(){
				let url = "/docs/notice"
				let returnjson = await this.$request.post(url)
				if(returnjson.code == 0){
					this.noticetxt ="公告:"+returnjson.data[0].d_title
				}
			},
			/*轮播图*/
			async getScrollImgs(){
				let url = '/ad/swiper'
				let that = this
				let originbaseurl = that.$request.getOriginBaseUrl() 
				await this.$request.get(url).then(res=>{
					this.srollimgs = res
					this.srollimgs.forEach(it=>{
						it.pic_url = originbaseurl +it.pic_url
					})
				})
			},
			/*boxlist*/
			async getboxlist(){
				let url = '/Box/list'
				let senddata = {
					mphone:this.meminfo.m_phone
				}
				let getboxlist = await this.$request.post(url,senddata)
				if(getboxlist.code != 0) {
					uni.showToast({
						title:"获取宝箱信息出错"
					})
					return ;
				}
				let boxlist = []
				let itembox = []
				let that = this
				let box_level = this.meminfo.box_lev ?this.meminfo.box_lev:1
				await getboxlist.data.forEach((it,index)=>{
					if(it.checked) it.imgsrc = that.activeBoximgsrc
					else it.imgsrc = "/static/images/box.png"
					let boxIndex = parseInt(index/9)
					/*是否允许打开宝箱*/
					it.allowed = false
					if(index<=box_level-1){
						it.allowed = true
					}
					itembox.push(it)
					if(index === 8 || index === 17){
						let item_p = {}
						item_p.itembox = itembox
						boxlist[boxIndex] = item_p
						itembox = []
					}
				})
				
				this.boxList = boxlist
			},
			srollclick(item){
				if(item.allowToOutHref  && item.link_url){
					// #ifdef H5
					 window.location.href= item.link_url
					// #endif
					//#ifndef H5
						plus.runtime.openURL(item.link_url)
					// #endif
				}
			},
			handleclosewin(){
				 this.$refs.popupunion.close()	
			},
			handleclosewin2(){
				 this.$refs.popupbox.close()	
			},
			async handlejoinus(){
				let urls = '/union/join'
				let bsckjson = await this.$request.post(urls)
				if(bsckjson.code == 0){
					uni.showToast({
						title:"加盟成功",
						icon:"success"
					})
					this.$commonFunc.updatememinfo()
					this.popupshow = false
					this.$refs.popupunion.close()
					
					let itesmfind = this.taplist.find((it,inx)=>{
						if(inx ==3) return true
						else return false
					})
					
					uni.navigateTo({
						url: itesmfind.tohref
					})
					
				}else{
					uni.showToast({
						title:bsckjson.msg,
						icon:"error"
					})
				}
			},
			async clicktohref(item,itemindex){
				if(itemindex ==3 && this.meminfo.unio_sta!=1){
					//加盟，判断是否是加盟身份
					this.popupshow = true
					this.$refs.popupunion.open()
				}else{
					uni.navigateTo({
						url: item.tohref
					})
				}
			},
			async handleactive(){
				
				//确定激活宝箱
				let listindex = this.boxclicklistindex
				let itemindex = this.boxitemindex
				let item = this.boxList[listindex].itembox[itemindex]
				let url = '/Box/buy'
				let senddata = {
					mphone : this.meminfo.m_phone,
					bn:item.bnm
				}
				let rejson = await this.$request.post(url,senddata)
				if(rejson.code == 0){
					this.popupboxshow = false
					this.$refs.popupbox.close()
					item.allowed = true
					//更新宝箱级别
					this.meminfo.box_level = item.bnm
					this.$vcache.vset("meminfo", this.meminfo)
					
					console.log("购买后数据",item)
					console.log("adsf",this.boxList[listindex].itembox)
					uni.showToast({
						title: '激活成功',
						icon: 'success'
					})
				}else{
					this.popupboxshow = false
					this.$refs.popupbox.close()
					uni.showToast({
						title: rejson.msg,
						icon: 'error'
					})
				}
			},
			async changeboxitem(listIndex,e) {
		 	   let itemIndex = e.detail.index
			   let item = this.boxList[listIndex].itembox[itemIndex]
			  
			   if(itemIndex >0){
			   	 let beforeItem = this.boxList[listIndex].itembox[itemIndex-1]
			   	 if(!beforeItem.allowed){
			   		 uni.showToast({
			   		 	title: '请按照顺序激活',
			   		 	icon: 'error'
			   		 })
					 return ;
			   	 }
			   }
				if(!item.allowed){
					this.boxactiveneedusdt = item.usdt
					this.boxlevel = item.bnm
					this.daygeneratenum = item.crystal
					this.popupboxshow = true
					this.$refs.popupbox.open()
					this.boxclicklistindex = listIndex
					this.boxitemindex = itemIndex
					return ;
				}
				/*用户打开宝箱*/
				let url = '/Box/open'
				//let meminfo = this.$vcache.vget('meminfo')
				let senddata = {
					mphone:this.meminfo.m_phone,
					bn:item.bnm
				}
				let reabckjson =await this.$request.post(url,senddata)
				if(reabckjson.code == 0 ){
					item.imgsrc = this.activeBoximgsrc
					item.checked = true
					uni.showToast({
						title: "宝箱打开成功",
						icon: 'success'
					})
					setTimeout(function(){
					},1000)
					
								
				}else{
					uni.showToast({
						title: reabckjson.msg,
						icon: 'error'
					})	
				}
			}
			
		}
	}
</script>

<style lang="scss">	
	@import '@/common/common.scss';
	
	.uni-modal{
		border-radius:20px !important;
	}
	
	.index-box{ 
	 display: flex;
     flex-direction: column;
	}
	.top-box-wrap{
		height: 207px;
		position: relative;
	}
	.uni-margin-wrap {
		height: inherit;
	}
	.swiper-topbox {
		height: inherit;
	}
	.swiper-item-box {
		display: block;
		height: inherit;
		text-align: center;
	}
	.bulletin{ 
		position: absolute; bottom: 18px; width: 100%;
		height: 20px; background-color: transparent; }
	
	.zf-idx-container{
		flex: 1;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: 100% 100%;	
	}
	.mui-row-box{display: flex; 
	    flex-direction: row;
		padding: 60px 16px 0 16px;
		.box-cell{width: 25%;			
			text-align: center;
			.icon-title-box{
				// #ifndef H5
				//height: 180%; width:85%;
				// #endif
				// #ifdef H5
				height: 64px; width:60px;
				// #endif
				margin: auto;
			}
			.taptxt{
				font-size: 16px;
			}
		}		
	
	}
	.box-area{
	  
	}
	.swiper-box-wrap {
		position: relative; top: 35px;
		height: 400px;
		
	}
	.grid-item-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 76%; width: 92%;
		transform: scale(.8);
		position: relative;
	}
	.grid-item-box-active{
		height: 92% !important;
	}
	.item-dot-box{
		border: 1px #fff solid;
		position: fixed;
		// #ifndef H5
		bottom: 25px;right: 57%;
		width: 18px;
		height: 18px; line-height: 18px;
		// #endif
		// #ifdef H5
		bottom: 15px;right: 55%;
		padding-top: 2px;
		width: 18px;
		height: 16px;
		// #endif
		
		border-radius: 10px;
		text-align: center;
	}
	
	

	
</style>
