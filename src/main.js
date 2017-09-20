import "es6-promise/auto"
import Vue from "vue"
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload"
import App from "./App"
import router from "./router"
import { ToastPlugin } from "vux"

// public css
import "css-kit"

Vue.config.productionTip = false

Vue.use(ToastPlugin)

import defaultPng from "./assets/default.png"
Vue.use(VueLazyload, {
	error: defaultPng,
	loading: defaultPng,
	try: 1
})
/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App }
})

FastClick.attach(document.body)
