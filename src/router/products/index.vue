<template>
	<div class="">
		<div class="fixed w100" style="z-index: 102;">
			<tab :line-width="2" custom-bar-width="60px" bar-active-color="rgb(252, 55, 140)">
				<tab-item selected @on-item-click="onHandleFirstClick(firstLevel.yw.value)" active-class="active-6-1">{{firstLevel.yw.title}}</tab-item>
				<tab-item @on-item-click="onHandleFirstClick(firstLevel.fzy.value)" active-class="active-6-1">{{firstLevel.fzy.title}}</tab-item>
			</tab>
		</div>
		<div class="fixed w100" style="z-index:101;margin-top:44px;">
			<tab :line-width="2" custom-bar-width="60px">
				<tab-item
					v-for="item in mains"
					:key="item.id"
					:selected="getProductData.main.id === item.id"
					@on-item-click="onItemClick"
					class="cut"
					>
					{{item.title.split("-")[1]}}
				</tab-item>
			</tab>
		</div>
		<div class="page" style="padding-top:88px;padding-bottom:80px;">
			<group title="" class="text-left" gutter="0">
				<div class="p10 c0 fs12">
					<!--<h3>产品介绍：</h3>-->
					<p class="p10">
						<img :src="imgSrc" style="max-width: 100%;border-radius: 10px;">
					</p>
				</div>
			</group>
			<!--产品列表-->
			<group gutter="-1px" class="text-left" v-if="(products || []).length">
				<cell v-for="item in products" :key="item.id" is-link :title="item.title" @click.native="handleProductDetial(item)">
					<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="imgIcon">
				</cell>
			</group>
		</div>
		<!--产品详情-->
		<popup v-model="isShowProductDetail" position="right" width="100%">
			<div class="relative p10">
				<div class="product-box">
					<h2 class="pt10 pb20">{{productDetail.title}}</h2>
					<div class="content text-left" v-html="productDetail.content"></div>
					<p class="mt30 mb30" style="padding:0 10%;">
						<x-button type="primary" @click.native="back">返回</x-button>
					</p>
				</div>
			</div>
		</popup>
	</div>
</template>

<script>
import { Group, Tab, TabItem, Cell, Popup, Icon, XButton } from "vux"
import products from "../../servers/products"
import i1 from "../../assets/fw-3.png"
import i2 from "../../assets/fw-4.jpg"
import i3 from "../../assets/fw-7.jpg"
import i4 from "../../assets/fw-8.jpg"
import i5 from "../../assets/fw-9.jpg"
import ic1 from "../../assets/icon-ziying.png"
import ic2 from "../../assets/icon-zhongyou.png"
import ic3 from "../../assets/icon-waiyou.png"
import ic4 from "../../assets/nets.png"
import ic5 from "../../assets/icon-14.png"

export default {
	data () {
		return {
			name: "products",
			isShowProductDetail: false,
			content: "",
			mains: [],
			products: [],
			productsData: {},
			cmsUrl: "",
			getProductData: {main: {}, product: {}},  // 默认设置
			productDetail: {},
			imgSrc: "",
			imgIcon: "",
			firstLevel: {yw: {title: "自营产品", value: 1}, fzy: {title: "非中邮产品", value: 2}},
			secondLevelForYanwen: [],
			secondLevelForFeizy: [],
		}
	},
	computed: {
		img1 () {
			return i1
		},
		img2 () {
			return i2
		},
		img3 () {
			return i3
		},
		img4 () {
			return i4
		},
		img5 () {
			return i5
		},
		icon1 () {
			return ic1
		},
		icon2 () {
			return ic2
		},
		icon3 () {
			return ic3
		},
		icon4 () {
			return ic4
		},
		icon5 () {
			return ic5
		}
	},
	created () {
		this.init()
	},
	methods: {
		async init () {
			const vm = this
			const mainsParams = {
				currentPage: 1,
				language: "chn",
				pageSize: 10,
				typecode: "productSubtypes"
			}
			vm.$vux.loading.show({text: "加载中..."})
			const {status, statusText, data} = await products.getPageList(mainsParams)
			if (status === 200) {
				vm.cmsUrl = data.cmsUrl
				const len = data.maList.length - 1
				// for (let i = len; i >= 0; i--) {
				// 	vm.mains.push(data.maList[i]) // 调整数据mains
				// 	vm.getProducts(data.maList[i].id)  // 请求四种类型的products
				// }
				for (let i = 0; i < len; i++) {
					if (data.maList[i].title.split("-")[0] === vm.firstLevel.yw.title) {
						vm.secondLevelForYanwen.push(data.maList[i])
					} else if (data.maList[i].title.split("-")[0] === vm.firstLevel.fzy.title) {
						vm.secondLevelForFeizy.push(data.maList[i])
					}
					vm.getProducts(data.maList[i].id)  // 请求四种类型的products
				}
				vm.mains = vm.secondLevelForYanwen
				vm.getProductData.main = vm.secondLevelForYanwen[0]
				vm.imgSrc = vm.img1 // 默认图片
				vm.imgIcon = vm.icon1
				// console.log(vm.getProductData)
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
			vm.$vux.loading.hide()
		},
		async getProducts (mainsId) {
			const vm = this
			const productsParams = {
				"language": "chn",
				"parentid": mainsId,
				"typecode": "productArticle"
			}
			vm.$vux.loading.show({text: "加载中..."})
			const {status, statusText, data} = await products.getArticleList(productsParams)
			if (status === 200) {
				vm.productsData[mainsId] = data.list
				if (mainsId === vm.mains[0].id) {
					vm.products = data.list
				}
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
			vm.$vux.loading.hide()
			// console.log(vm.productsData)
		},
		onHandleFirstClick (index) {
			const vm = this
			if (index === 1) {
				vm.mains = vm.secondLevelForYanwen
				vm.getProductData.main = vm.secondLevelForYanwen[0]
				vm.onItemClick(0)
			} else if (index === 2) {
				vm.mains = vm.secondLevelForFeizy
				vm.getProductData.main = vm.secondLevelForFeizy[0]
				vm.onItemClick(0)
			}
			// console.log(vm.mains)
		},
		onItemClick (index) {
			this.products = this.productsData[this.mains[index].id]
			this.imgSrc = this.getImgSrc(index)
			this.imgIcon = this.getImgIcon(index)
		},
		getImgSrc (i) {
			return {
				0: i1,
				1: i2,
				2: i3,
				3: i4,
				4: i5
			}[i || 0]
		},
		getImgIcon (i) {
			return {
				0: ic1,
				1: ic2,
				2: ic3,
				3: ic4,
				4: ic5
			}[i || 0]
		},
		handleProductDetial (item) {
			// console.log(item)
			// 处理 content
			item.content = item.content.replace(/"p1"|"p2"|"p3"|"p4"|"p5"|"p6"|"p7"|"p8"|"p9"/g, "pp")
			this.productDetail = item
			this.isShowProductDetail = true
		},
		back () {
			this.productDetail = {}
			this.isShowProductDetail = false
		}
	},
	components: {
		Group,
		Tab,
		TabItem,
		Cell,
		Popup,
		Icon,
		XButton
	}
}
</script>

<style scoped lang="stylus">
	.content
		p
			padding 0 !important
			margin 0 !important
	.product-box
		padding 10px
		border 1px solid #ddd
		border-radius 10px
		background-color floralwhite
		box-shadow 0 0 5px
	.active-6-1
		color: rgb(252, 55, 140) !important;
		border-color: rgb(252, 55, 140) !important;
</style>
