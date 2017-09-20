import Vue from "vue"
import Router from "vue-router"

import Dashboard from "@/router/Dashboard"
import PriceComparison from "@/router/PriceComparison"
import Query from "@/router/Query"
import QueryPage from "@/router/Query/query"
import Products from "@/router/Products"

Vue.use(Router)

const router = new Router({
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: [
		{
			path: "/",
			name: "dashboard",
			component: Dashboard
		}, {
			path: "/priceComparison",
			name: "priceComparison",
			component: PriceComparison
		}, {
			path: "/query",
			name: "query",
			component: Query
		}, {
			path: "/query/:queryId",
			name: "queryPage",
			component: QueryPage
		}, {
			path: "/products",
			name: "products",
			component: Products
		}
	]
})

export default router
