import axios from "axios"

export default {
	getPageList (params) {
		return axios.post("/article/pageList.action", {...params})
	},
	getArticleList (params) {
		return axios.post("/article/articleList.action", {...params})
	}
}
