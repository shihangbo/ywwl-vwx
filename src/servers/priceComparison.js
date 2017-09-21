import axios from "axios"

export default {
	getBaseInfChargePriceExt (params) {
		return axios.post("/busHalOnline/getBaseInfChargePriceExt.htm", {...params})
	},
	getChargePriceExt (params) {
		return axios.post("/busHalOnline/getChargePriceExt.htm", {...params})
	},
	reckonPrice (params) {
		return axios.post("/busHalOnline/reckonPrice.htm", { ...params })
	}
}
