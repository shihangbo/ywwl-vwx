import axios from "axios"

export default {
	getTrackExp2 (params) {
		return axios.post("/busHalOnline/getTrackExp.htm", {...params})
	}
}
