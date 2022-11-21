const validata = {
	notEmpty:(val)=>{
		if(undefined == val || "" == val || null == val) return false
		else return true
	},
	telphone:(_val)=>{
		let reg = /^1[0-9]{10,10}$/;
		return reg.test(_val)
	}
}
export default validata