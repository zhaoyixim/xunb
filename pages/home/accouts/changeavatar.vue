<template>
	<view class="wrap-box padding15 bgcommon"
	:style='{"minHeight": `${pageInfo.height-24}px`}'
	>
		
		<view class="box-img-wrap bghalfwhite">
			<view class="img-box" @click="handleUpload">
				<image class="image-box" :src="avatarimg"></image>
			</view>
		</view>
		<view class="txt-box colorwhite font18">(点击图片修改)</view>
		<view class="btn-box">
			<view class="btn-self colorwhite">确定</view>
		</view>
		<uni-file-picker  
			v-model="imageValue" 
			ref="files"  
			:image-styles="imageStyles" 
			:autoUpload="uploadfalse" 
			file-mediatype="image"
			:limit="1"
			@select="uploadImgFunc"
		/>
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
				imageStyles:{
					width:1,
					height:1
									
				},
				uploadfalse:false,
				avatarimg:"/static/images/head.png",
				boxcoverimg:"http://img.xunbaoji888.com/storage/avatar/4f/e9951f73edb65e6c39bb360cf08fcb.png",
				border:false,
				imageValue:[],
				getmeminfo:this.$vcache.vget("meminfo")
			}
		},
		mounted() {
			this.avatarimg = this.getmeminfo.m_header
		},
		methods: {
			handleUpload(){
				//console.log("clickbtn",this.$refs.files.upload())
				this.$refs.files.choose()
			},
			/*获取最新用户信息*/
			async getnewuseinfo(){
				let memurl = "/user/info"
				let sendPhone = {mphone:this.getmeminfo.m_phone}
				let meminfo = await this.$request.post(memurl,sendPhone)
				if(meminfo.code == 0) {
					this.meminfo = meminfo.data
					this.$vcache.vset("meminfo",meminfo.data)
					this.avaliablekobval =meminfo.kob
				}else{
					uni.showToast({
						title:meminfo.msg,
						icon:"erorr"
					})
				}			
			},
			async uploadImgFunc(items){
			
				let fileItems = items.tempFiles[0]
				/*
				let uploadimgs = {
					fileType:fileItems.fileType,
					fileExt:fileItems.extname,
					fileName:fileItems.name,
					fileSize:fileItems.size,
					filePath:fileItems.path
				}*/
				let senddata = {
					mphone:this.getmeminfo.m_phone,
					headerPic:fileItems.path
				}
				console.log("图片上传",senddata)
				let url ='/user/setHeader'
				let uploadbackjson = await this.$request.post(url,senddata)
				if(uploadbackjson.code == 0){
					this.getnewuseinfo()
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
					setTimeout(function(){},2000)
				}
				this.imageValue = []
				this.imageValue.push(fileItems)
				console.log("所有参数",fileItems)
			}
			
		}
	}
</script>

<style lang="scss" scoped>	
@import '@/common/common.scss';
	.wrap-box{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.box-img-wrap{
			
			 border-radius: 10px;
			padding: 10px;
			display: flex; justify-content: center; align-items: center;
			.img-box{
				width:224px;height:224px;
				.image-box{border-radius: 50%;}
			}
		}
		.txt-box{padding:10px;  text-align: center;}
		.btn-box{
		padding: 10px; 
		border: 2px #fff solid; 
		border-radius:40px;
		display: flex; justify-content: center; align-items: center;
		.btn-self{text-align: center;}
		}
	}
	
</style>
