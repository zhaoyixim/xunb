const validata = {
	notEmpty:(val)=>{
		if(undefined == val || "" == val || null == val) return false
		else return true
	},
	telphone:(_val)=>{
		let reg = /^[1][3-9][\d]{9}/;
		return reg.test(_val)
	}
}
export default validata