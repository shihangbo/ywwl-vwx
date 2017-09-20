import axios from "axios"

export default {
	getChargePriceExt (params) {
		return axios.post("/getChargePriceExt", {...params})
	}
}
