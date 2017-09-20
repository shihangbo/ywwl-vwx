import axios from "axios"

export default {
	getChargePriceExt (params) {
		return axios.post("/busHalOnline/getBaseInfChargePriceExt.htm", {...params})
	}
}
