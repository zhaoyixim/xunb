<script>
	import vcache from './utils/vcache.js'
	import request from './utils/request.js'

	export default {
		onLaunch: function() {
		},
		onShow: function() {
			let that = vcache
			 uni.getSystemInfo({
				success: function (res) {
					that.vset("safeHeight",res.safeArea.bottom - 50)
					that.vset("safeWidth",res.safeArea.width)
				}
			});
			
			
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {
			
		}
	}
</script>
<style lang="css">
	:root {
		--gobal-bg-color:rgb(82, 40, 164);
	}
	page{
		background-color:var(--gobal-bg-color)
	}
	
	uni-body{background-color:var(--gobal-bg-color)}
	 .uni-page-head-ft{right: 20px;}
	 uni-swiper .uni-swiper-dots-horizontal{
		bottom: 50px !important;
	 }
	.uni-easyinput__content-input{font-size: 20px !important;}
</style>
