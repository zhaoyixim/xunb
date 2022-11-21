import vcache from '@/utils/vcache.js'
let baseURL='http://api.xunbaoji888.com';
if(process.env.NODE_ENV === 'development'){ 
	//baseURL = 'http://dev.api.xunbao.com'
}
/*图片使用，没有修改过的*/
let baseOriginURL=baseURL

let header={};
const showToast = (title) => {
    uni.showToast({
        title: title,
        icon: 'none'
    })
}


/**请求接口
 * @method http
 * @param {String} url 接口地址
 * @param {Object} data 接口参数
 * @param {Object} option 接口配置信息，可选
 * @return {Object} Promise
 */
const http = async (url, data = {}, option = {}) => {
    let hideLoading = option.hideLoading || false // 是否显示 loading
    let hideMsg = option.hideMsg || false // 是否隐藏错误提示
    let token = '' // 登录鉴权获得的 token
	option.header = {'Content-Type': 'application/json'}
	if(undefined!=header) option.header = {...option.header,...header}
	let gettoken =await vcache.vget('token')
	let logincode  = await vcache.vget('logincode')
	if(undefined != gettoken && "" != gettoken && gettoken){
		option.header.Tokenid = gettoken
	}
	if(undefined != logincode && "" != logincode && logincode){
		option.header.Logincode = logincode
	}
	header = option.header
    if (!hideLoading)  uni.showLoading({title: '加载中...' })
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            method: option.method || 'POST', // 默认 post 请求
            header: option.header,
            data: data,
			dataType:"json",
            success: res => { // 服务器成功返回的回调函数
                if (!hideLoading) uni.hideLoading()
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else { // 返回值非 200，强制显示提示信息
                    showToast('[' + res.statusCode + '] 系统处理失败')
                    reject('[' + res.statusCode + '] 系统处理失败')
                }
            },
            fail: (err) => { // 接口调用失败的回调函数
                if (!hideLoading) uni.hideLoading()
                if (err.errMsg != 'request:fail abort') {
                    showToast('连接超时，请检查您的网络。')
                    reject('连接超时，请检查您的网络。')
                }
            }
        })
    })
}

const request = {
	setBaseUrl:(_baseURL)=>{
		baseURL=_baseURL
		console.log("baseurl",baseURL)
	},
	getBaseUrl:()=>{
		return baseURL
	},
	getOriginBaseUrl:()=>{
		return baseOriginURL
	},
	setHeader:(_header)=>{
		header=_header
		console.log("header",header)
	},
	getHeader:()=>{
		return header
	},
	get:(_url,_data)=>{
		//request.setBaseUrl("/api")
		let _options = { method : 'GET' }
		return http(_url,_data,_options)
	},
	post:(_url,_data)=>{
		//request.setBaseUrl("/api")
		let _options = { method : 'POST' }
		return http(_url,_data)
	}
}
export default request