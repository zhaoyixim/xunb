<template>
	<view class="box" :style="[{minHeight: `${pageInfo.height}px`}]">
		<iframe id="getiframe" :height="iframeHeight" :width="iframeWidth" 
		 marginwidth="0" 
		 frameborder="no" 
		 scrolling="no" src="/chat.html"></iframe>

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
				iframeHeight:0,
				iframeWidth:0
			}
		},		
		created() {
			this.iframeHeight = this.pageInfo.height+46
			console.log("height",this.iframeHeight)
			this.iframeWidth = this.$vcache.vget('safeWidth')
		},
		methods: {
			
			
			
		}
	}
</script>

<style lang="scss">	
	.box{overflow: hidden;}
	#getiframe{border: none; margin: 0;}
</style>
