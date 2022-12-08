<template>
	<view class="wrap-box padding15 bgcommon"
	 
	 :style='{"minHeight": `${pageInfo.height-24}px`}'>
		<view class="invite-content-wrap" v-if="coverimg">
			<image class="image-box" :src="coverimg" ></image>
		</view>
		<view class="invite-footer-wrap">
			<view v-for="(itm,idx) in footerList" :key="idx" class="invite-footer-box" @click="()=>handleclick(idx)"> 
				<view class="item-img">
					<image class="image-box" :src="itm.labelPath"></image>
				</view>
				<view class="item-txt colorwhite font116">
					{{itm.labelName}}
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
				coverimg:"",
				footerList:[
					{labelName:"复制邀请码",labelPath:"/static/images/nav-invite.png"},
					{labelName:"复制链接",labelPath:"/static/images/nav-url.png"},
					{labelName:"保存海报",labelPath:"/static/images/nav-save.png"}
				],
				pagedata:null,
				meminfo:this.$vcache.vget('meminfo')
				
			}
		},
		created() {
			this.$commonFunc.tokenCheck()
			this.pageinit()
		},
		methods: {
			handleclick(itemindex){
				if(itemindex == 0){
					uni.setClipboardData({
						data: this.meminfo.id.toString(),
						success: function () {
							uni.showToast({
								title:"邀请码复制成功",
								icon:"success"
							})
						}
					});
				}else if(itemindex ==1){
					uni.setClipboardData({
						data: this.pagedata.shareLink+'?id='+this.meminfo.id.toString(),
						success: function () {
							uni.showToast({
								title:"链接复制成功",
								icon:"success"
							})
						}
					})
				}else{
					if(itemindex ==2){
						// #ifdef H5
						this.saveImg(this.pagedata.adUrl,this.meminfo.id)
						// #endif
						// #ifdef APP-PLUS
						this.saveimgs()
						// #endif
					}
					
				}
			},
			saveImg(url,savename) {
					var oA = document.createElement("a");
					oA.download = savename;
					oA.href = url;
					document.body.appendChild(oA);
					oA.click();
					oA.remove();
			},      
			saveimgs(){
					uni.downloadFile({
						url: this.pagedata.adUrl,
						success: res => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: '图片保存成功',
											icon: 'none',
										});
									},
									fail: function(e) {
										console.log(e);
										uni.showToast({
											title: '图片保存失败',
											icon: 'none',
										});
									}
								});
							}
						}
					});
			},

			async pageinit(){
				let url = '/invite/getQR'
				let getjson = await this.$request.post(url)
				//console.log("asdf",getjson)
				if(getjson.code == 0){
					this.pagedata = getjson.data
					this.coverimg = getjson.data.adUrl
				}
			}
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.wrap-box{
		background-color: #353535;
		.invite-content-wrap{
			padding:20px 30px; padding-bottom: 0px;
			height: 70vh;
			.image-box{border-radius: 10px;}
		}
		.invite-footer-wrap{
			display: flex; 
			flex-direction: row; 
			justify-content: center; 
			align-items: center;
			.invite-footer-box{
				padding-top:10px;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.item-img{
					width: 63px;
					height: 63px; 
					.image-box{border-radius: 50%;}
				}
				.item-txt{padding: 10px 0;}
			}
			
		}
	}
	
</style>
