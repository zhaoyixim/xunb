import App from './App'
import request from './utils/request.js'
import vcache from './utils/vcache.js'
import commonFunc from './utils/vcommon.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$vcache = vcache
Vue.prototype.$commonFunc = commonFunc
Vue.prototype.$adpid ="4h5pIhBbekx~zWfLXM"
Vue.prototype.$secrect ="IFBMy(eIP*(rc6&Cm0t#HlV!4YEHM2t0DNQt*o*"
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "4h5pIhBbekx~zWfLXM"
	return {
		app
	}
}
// #endif
