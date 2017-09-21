<template>
	<div class="">
		<div class="fixed w100" style="z-index:101;">
			<tab :line-width="2" custom-bar-width="60px">
				<tab-item
					v-for="item in mains"
					:keys="item.id"
					:selected="getProductData.main.id === item.id"
					@on-item-click="onItemClick"
					>
					{{item.title}}
				</tab-item>
			</tab>
		</div>
		<div class="page" style="padding-top:44px;padding-bottom:80px;">
			<group title="" class="text-left" gutter="0">
				<div class="p10 c0 fs12">
					<h3>产品介绍：</h3>
					<p class="p10">
						产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍
						产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍
					</p>
				</div>
			</group>
			<!--产品列表-->
			<group gutter="-1px" class="text-left">
				<cell v-for="item in products" :keys="item.id" is-link :title="item.title" @click.native="handleProductDetial(item)"></cell>
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

export default {
	data () {
		return {
			name: "products",
			isShowProductDetail: false,
			content: "<p class='pp1'><strong>产品中文名</strong><br/></p><p class='pp3'><span class='ps2'><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>燕文航空经济小包</span><span class='ps3'>-</span><span class='ps2'>普货</span></p><p class='pp3'><span class='ps4'><strong>产品英文名</strong></span></p><p class='pp5'><span class='ps2'>&nbsp; &nbsp; &nbsp; YW AIR ECONOMY MAIL-GENERAL CARGO</span></p><p class='pp3'><span class='ps4'><strong>产品描述</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 中低端平邮类普货产品，时效一般，价格实惠。主要使用大邮政供应商</span><span class='ps3'> </span><span class='ps2'>，例如荷邮</span><span class='ps3'>/</span><span class='ps2'>中邮</span><span class='ps3'>/</span><span class='ps2'>土邮</span><span class='ps3'>/</span><span class='ps2'>马邮等等。</span></p><p class='pp3'><span class='ps4'><strong>通达国家范围</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 英国、澳洲、加拿大、法国、美国、德国等重点</span><span class='ps3'>40</span><span class='ps2'>国</span></p><p class='pp3'><span class='ps4'><strong>重量范围</strong></span></p><p class='pp5'><span class='ps5'>&nbsp; &nbsp; &nbsp; 不超过</span><span class='ps2'>2kg</span></p><p class='pp3'><span class='ps4'><strong>参考时效</strong></span></p><p class='pp6'><span class='ps2'>&nbsp; &nbsp; &nbsp; 15-35</span><span class='ps5'>天</span></p><p class='pp2'><span style='font-size: 20px;'></span></p><hr/><p class='pp3'><span class='ps4'></span></p><p class='pp3'><span class='ps4'><strong>产品中文名</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 燕文航空经济小包</span><span class='ps3'>-</span><span class='ps2'>特货</span></p><p class='pp3'><span class='ps4'><strong>产品英文名</strong></span></p><p class='pp5'><span class='ps2'>&nbsp; &nbsp; &nbsp; YW AIR ECONOMY MAIL-SPECILA CARGO</span></p><p class='pp3'><span class='ps4'><strong>产品描述</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 中低端平邮类含电产品，时效一般，价格实惠。主要使用小邮政供应商</span><span class='ps3'> </span><span class='ps2'>，例如瓦努阿图</span><span class='ps3'>/</span><span class='ps2'>所罗门。</span></p><p class='pp3'><span class='ps4'><strong>通达国家范围</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 加拿大、法国、比利时、意大利等大致</span><span class='ps3'>20</span><span class='ps2'>国</span></p><p class='pp3'><span class='ps4'><strong>重量范围</strong></span></p><p class='pp5'><span class='ps5'>&nbsp; &nbsp; &nbsp; 不超过</span><span class='ps2'>2kg</span></p><p class='pp3'><span class='ps4'><strong>参考时效</strong></span></p><p class='pp6'><span class='ps2'>&nbsp; &nbsp; &nbsp; 20-45</span><span class='ps5'>天</span></p><p><br/></p>",
			mains: [],
			products: [{name: "燕文航空经济小包"}, {name: "燕文航空经济小包"}],
			productsData: {},
			cmsUrl: "",
			getProductData: {main: {}, product: {}},  // 默认设置
			productDetail: {},
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
				for (let i = len; i >= 0; i--) {
					vm.mains.push(data.maList[i]) // 调整数据mains
					vm.getProducts(data.maList[i].id)  // 请求四种类型的products
				}
				vm.getProductData.main = vm.mains[0]
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
			console.log(vm.productsData)
		},
		onItemClick (index) {
			this.products = this.productsData[this.mains[index].id]
		},
		handleProductDetial (item) {
			console.log(item)
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
</style>