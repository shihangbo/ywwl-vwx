<template>
	<div class="">
		<group title="" class="text-left" gutter="0">
			<tab :line-width="2" custom-bar-width="60px">
				<tab-item @on-item-click="onItemClick" selected>燕文自营</tab-item>
				<tab-item @on-item-click="onItemClick">中邮类</tab-item>
				<tab-item @on-item-click="onItemClick">外邮&专线</tab-item>
				<tab-item @on-item-click="onItemClick">FBA</tab-item>
			</tab>
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
			<cell v-for="item in products" is-link :title="item.name" @click.native="handleProductDetial(item)"></cell>
		</group>
		<!--产品详情-->
		<popup v-model="isShowProductDetail" position="right" width="100%">
			<div class="relative w100 h100">
				<div class="content text-left p10" v-html="content"></div>
				<p class="mt30 mb30" style="padding:0 10%;">
					<x-button type="primary" @click.native="back">返回</x-button>
				</p>
			</div>
		</popup>
	</div>
</template>

<script>
import { Group, Tab, TabItem, Cell, Popup, Icon, XButton } from "vux"
export default {
	data () {
		return {
			name: "products",
			isShowProductDetail: false,
			products: [{name: "燕文航空经济小包"}, {name: "燕文航空经济小包"}],
			content: "<p class='pp1'><strong>产品中文名</strong><br/></p><p class='pp3'><span class='ps2'><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>燕文航空经济小包</span><span class='ps3'>-</span><span class='ps2'>普货</span></p><p class='pp3'><span class='ps4'><strong>产品英文名</strong></span></p><p class='pp5'><span class='ps2'>&nbsp; &nbsp; &nbsp; YW AIR ECONOMY MAIL-GENERAL CARGO</span></p><p class='pp3'><span class='ps4'><strong>产品描述</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 中低端平邮类普货产品，时效一般，价格实惠。主要使用大邮政供应商</span><span class='ps3'> </span><span class='ps2'>，例如荷邮</span><span class='ps3'>/</span><span class='ps2'>中邮</span><span class='ps3'>/</span><span class='ps2'>土邮</span><span class='ps3'>/</span><span class='ps2'>马邮等等。</span></p><p class='pp3'><span class='ps4'><strong>通达国家范围</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 英国、澳洲、加拿大、法国、美国、德国等重点</span><span class='ps3'>40</span><span class='ps2'>国</span></p><p class='pp3'><span class='ps4'><strong>重量范围</strong></span></p><p class='pp5'><span class='ps5'>&nbsp; &nbsp; &nbsp; 不超过</span><span class='ps2'>2kg</span></p><p class='pp3'><span class='ps4'><strong>参考时效</strong></span></p><p class='pp6'><span class='ps2'>&nbsp; &nbsp; &nbsp; 15-35</span><span class='ps5'>天</span></p><p class='pp2'><span style='font-size: 20px;'></span></p><hr/><p class='pp3'><span class='ps4'></span></p><p class='pp3'><span class='ps4'><strong>产品中文名</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 燕文航空经济小包</span><span class='ps3'>-</span><span class='ps2'>特货</span></p><p class='pp3'><span class='ps4'><strong>产品英文名</strong></span></p><p class='pp5'><span class='ps2'>&nbsp; &nbsp; &nbsp; YW AIR ECONOMY MAIL-SPECILA CARGO</span></p><p class='pp3'><span class='ps4'><strong>产品描述</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 中低端平邮类含电产品，时效一般，价格实惠。主要使用小邮政供应商</span><span class='ps3'> </span><span class='ps2'>，例如瓦努阿图</span><span class='ps3'>/</span><span class='ps2'>所罗门。</span></p><p class='pp3'><span class='ps4'><strong>通达国家范围</strong></span></p><p class='pp4'><span class='ps2'>&nbsp; &nbsp; &nbsp; 加拿大、法国、比利时、意大利等大致</span><span class='ps3'>20</span><span class='ps2'>国</span></p><p class='pp3'><span class='ps4'><strong>重量范围</strong></span></p><p class='pp5'><span class='ps5'>&nbsp; &nbsp; &nbsp; 不超过</span><span class='ps2'>2kg</span></p><p class='pp3'><span class='ps4'><strong>参考时效</strong></span></p><p class='pp6'><span class='ps2'>&nbsp; &nbsp; &nbsp; 20-45</span><span class='ps5'>天</span></p><p><br/></p>"
		}
	},
	methods: {
		onItemClick (index) {
			switch (index) {
				case 0:
					this.products = [{name: "燕文航空经济小包"}, {name: "燕文航空经济小包"}]
					break
				case 1:
					this.products = [{name: "中国邮政小包"}, {name: "中国邮政小包"}]
					break
				case 2:
					this.products = [{name: "中德DPD专线小包"}, {name: "中德DPD专线小包"}]
					break
				case 3:
					this.products = [{name: "FBA（TNT）"}, {name: "FBA（TNT）"}]
					break
			}
		},
		handleProductDetial (item) {
			console.log(item)
			this.isShowProductDetail = true
		},
		back () {
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
</style>