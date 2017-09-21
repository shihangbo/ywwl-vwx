<template>
	<div class="price-comparison">
		<div class="page" style="padding-bottom: 55px;">
			<Group title="价格比较" class="text-left">
				<cell v-if="!getCityData.city.id" @click.native="handleShowStartAddress" title="发出地" is-link class="text-left"></cell>
				<cell v-if="getCityData.city.id" @click.native="handleShowStartAddress" :value="`${getCityData.area.name}-${getCityData.city.name}`" title="发出地" is-link class="text-left"></cell>
				<cell v-if="!getCityData.destin.id" @click.native="handleShowDestinAddress" title="目的地" is-link class="text-left"></cell>
				<cell v-if="getCityData.destin.id" @click.native="handleShowDestinAddress" :value="getCityData.destin.chinesename" title="目的地" is-link class="text-left"></cell>
				<x-input v-model="getCityData.weight" class="text-left" text-align="right" title="重量(kg)" placeholder="输入重量" novalidate :show-clear="false" placeholder-align="right"></x-input>
			</Group>
			<Group gutter="0" style="margin-top:-1px;" v-if="isShowMoreChoose">
				<div class="p10">
					<p class="text-left pl10" style="margin-bottom:5px;">产品类型</p>
					<Checker
						v-model="productTypes"
						type="checkbox"
						default-item-class="demo5-item"
						selected-item-class="demo5-item-selected"
						>
						<checker-item v-for="item in productTypesData" :key="item.id" :value="item.id">{{item.name}}</checker-item>
					</Checker>
				</div>
				<div class="p10" style="padding-top:0;">
					<p class="text-left pl10" style="margin-bottom:5px;">带电类型</p>
					<Checker
						v-model="electricTypes"
						type="checkbox"
						default-item-class="demo5-item"
						selected-item-class="demo5-item-selected"
						>
						<checker-item v-for="item in electricTypesData" :key="item.id" :value="item.id">{{item.name}}</checker-item>
					</Checker>
				</div>
			</Group>
			<p class="mt10 text-right pr10">
				<x-button mini plain type="primary" @click.native="isShowMoreChoose = !isShowMoreChoose">更多条件</x-button>
			</p>
			<p class="mt30 mb30" style="padding:0 10%;">
				<x-button v-if="isShowPriceButton" plain type="warn" @click.native="handleQueryPrice">查询</x-button>
				<x-button v-if="!isShowPriceButton" plain>查询</x-button>
			</p>
			<!--价格显示-->
			<div v-if="isShowPriceList">
				<x-table class="bg-white">
					<thead class="bg-lightgrey">
						<tr>
							<th>产品名称</th>
							<th>时效(工作日)</th>
							<th>资费(元)</th>
						</tr>
					</thead>
					<tbody>
						<tr @click="handleShowPriceDetail(item)" v-for="(item, index) in priceList" :keys="index">
							<td class="w40 cut" style="text-align: left;padding-left: 5px;"><i class="iconfont eye">&#xe610;</i>{{item.productName.length >= 10 ? `${item.productName.slice(0, 10)}...` : item.productName}}</td>
							<td class="w30 cut">{{item.limitTime}}</td>
							<td class="w30 cut">{{item.chargePrice}}</td>
						</tr>
					</tbody>
				</x-table>
				<load-more style="margin-top: 20px;margin-bottom: 0px;" tip="我也是有底线的哦～" :show-loading="false" background-color="#fbf9fe"></load-more>
			</div>
		</div>
		<!--出发地选择-->
		<Popup v-model="isShowStartAddress" height="100%" :hide-on-blur="false">
			<div class="popup1">
				<tab>
					<tab-item
						v-for="(item, index) in area"
						:keys="index"
						@on-item-click="onItemClick"
						:class="{'tab-item': getTabItemClass(item.areaCode)}"
						class="relative" :selected="item.areaCode === getCityData.area.areaCode"
						>
						{{item.area}}
					</tab-item>
				</tab>
				<ul class="p10 bg-white text-left">
					<li v-for="(item, index) in city" :keys="index" class="inline city-item" :class="{city: item.id === getCityData.city.id}" @click="handleChooseCity(item)">{{item.name}}</li>
				</ul>
				<p class="mt30" style="padding:0 10%;">
					<x-button v-if="getCityData.city.id" type="primary" @click.native="handleAreaCode">确定</x-button>
					<x-button v-if="!getCityData.city.id" disabled>确定</x-button>
				</p>
			</div>
		</Popup>
		<!--目的地选择-->
		<Popup v-model="isShowDestinAddress" height="100%" :hide-on-blur="false">
			<div class="popup2">
				<div style="height: 44px;">
					<search
						v-model="keywords"
						placeholder="请输入目的地"
						autoFixed
						@on-change="handleSearchChange"
						@on-cancel="handleSearchCancel"
						></search>
				</div>
				<ul class="p10 bg-white text-left" v-if="filterDestinData.length > 0">
					<li v-for="(item, index) in filterDestinData" :keys="index" class="inline city-item" :class="{city: item.id === getCityData.destin.id}" @click="handleChooseDestin(item)">{{item.chinesename}}</li>
				</ul>
				<p v-if="!filterDestinData.length" class="p10 bg-white text-center fs14 color-warning">暂无目的地信息～</p>
				<p class="mt30" style="padding:0 10%;">
					<x-button v-if="getCityData.destin.id" type="primary" @click.native="handleDestinCode">确定</x-button>
					<x-button v-if="!getCityData.destin.id" disabled>确定</x-button>
				</p>
			</div>
		</Popup>
		<!--具体价格显示-->
		<Popup v-model="isShowPriceDetail" position="right" width="100%" :hide-on-blur="false">
			<div class="popup3">
				<card style="margin-top:0;margin-bottom:50px;padding:10px;">
					<div class="detail relative bth" slot="content">
						<h3 class="pt20 pb30" @click="isShowPriceDetail = !isShowPriceDetail">{{priceDetail.productName}}详情介绍</h3>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">产品名称:</span>
							<span class="value">{{priceDetail.productName || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">产品类型:</span>
							<span class="value">{{priceDetail.productTypeName || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">带电类型:</span>
							<span class="value">{{priceDetail.electricTypeName || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">燃油费率:</span>
							<span class="value">{{priceDetail.fuelRate || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">时效(工作日):</span>
							<span class="value">{{priceDetail.limitTime || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">是否可追踪:</span>
							<span class="value">{{priceDetail.isTrack === 1 ? "是" : "否"}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">重量(克):</span>
							<span class="value">{{getCityData.weight || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">资费(元):</span>
							<span class="value">{{priceDetail.chargePrice || '-'}}</span>
						</p>
						<p class="clearfix text-left relative bbh">
							<span class="key fl text-justify">折扣%(可输入):</span>
							<span class="value" v-if="priceDetail.discountFlag === '1'">
								<input class="discount" @input="handleDiscount" v-model="discount"></input>
							</span>
							<span class="value" v-if="priceDetail.discountFlag === '0'">
								暂无折扣
							</span>
						</p>
						<p class="clearfix text-left relative bbh mb20">
							<span class="key fl text-justify">折后价(元):</span>
							<span class="value" style="color: red">{{priceDetail.discountPrice || '-'}}</span>
						</p>
						<div v-if="priceDetail.desc" class="text-left">
							<div class="p10 priceDetail-desc">
								<p class="fs16 p10 c0">产品说明</p>
								<p v-html="priceDetail.desc"></p>
							</div>
						</div>
						<p class="mt30 mb30" style="padding:0 10%;">
							<x-button type="primary" @click.native="back">返回</x-button>
						</p>
					</div>
				</card>
			</div>
		</Popup>
	</div>
</template>

<script>
import { Group, Cell, XInput, XButton, Popup, Tab, TabItem, XTable, LoadMore, Search, Checker, CheckerItem, Card } from "vux"
import priceComparison from "../../servers/priceComparison"

export default {
	data () {
		return {
			name: "priceComparison",
			isShowStartAddress: false,
			isShowPriceList: false,
			isShowPriceButton: false,
			isShowDestinAddress: false,
			getCityData: {area: {}, city: "", weight: "", destin: {}}, // 我是收集信息的
			// 出发地相关
			area: [], // 转化数据-保存区域
			areaCity: {}, // 转化数据-保存区域城市 {1001: [], 1002: []}
			city: [], // 获取-对应城市
			// 目的地相关
			destinData: [],
			filterDestinData: [],
			keywords: "",
			// 显示具体价格相关
			isShowPriceDetail: false,
			priceList: [],
			// 更多筛选条件
			isShowMoreChoose: false,
			electricTypesData: [{name: "电商快递", id: 1}, {name: "商业快递", id: 2}, {name: "中国邮政", id: 3}, {name: "外国邮政", id: 4}],
			electricTypes: [],
			productTypesData: [{name: "不含电", id: 10}, {name: "内置电池", id: 11}, {name: "配套电池", id: 12}, {name: "纯电池", id: 13}],
			productTypes: [],
			priceDetail: {},
			discount: 100
		}
	},
	created () {
		this.load()
	},
	methods: {
		async load () {
			const vm = this
			const params = {"country": {"regionId": "N"}, "city": {"name": "N"}}
			vm.$vux.loading.show({text: "加载中..."})
			const {data, status, statusText} = await priceComparison.getBaseInfChargePriceExt(params)
			if (status === 200) {
				// console.log(data)
				vm.getAreaCity(data.lineCity.lineCityList) // 获取 areaCity
				vm.getDestinData(data.country.regionList)
				vm.city = vm.areaCity["1001"] // 初始化城市
				vm.getCityData.area = vm.area[0] // 初始化
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
			vm.$vux.loading.hide()
		},
		getAreaCity (lineCityList) {
			let hashTable = {}
			lineCityList.forEach((item) => {
				var key = (typeof item) + item.areaCode
				if (!hashTable[key]) {
					hashTable[key] = true
					this.area.push(item)
				}
			})

			lineCityList.forEach((item) => {
				if (!this.areaCity[item.areaCode]) {
					this.areaCity[item.areaCode] = []
				}
				this.areaCity[item.areaCode].push(item)
			})
		},
		getDestinData (regionList) {
			this.destinData = regionList.map((item) => {
				this.$set(item, "searchStr", `${item.chinesename}/${item.chinesepinyin}/${item.englishname}`)
				return item
			})
			// console.log(this.destinData)
		},
		handleShowStartAddress () {
			this.isShowStartAddress = !this.isShowStartAddress
		},
		onItemClick (index) {
			switch (index) {
				case 0:
					this.city = this.areaCity["1001"]
					this.getCityData.area = {areaCode: "1001", name: "华北"}
					break
				case 1:
					this.city = this.areaCity["1002"]
					this.getCityData.area = {areaCode: "1002", name: "华东"}
					break
				case 2:
					this.city = this.areaCity["1003"]
					this.getCityData.area = {areaCode: "1003", name: "华南"}
					break
				case 3:
					this.city = this.areaCity["1004"]
					this.getCityData.area = {areaCode: "1004", name: "香港"}
					break
				case 4:
					this.city = this.areaCity["1006"]
					this.getCityData.area = {areaCode: "1006", name: "西南"}
					break
			}
		},
		handleChooseCity (city) {
			this.getCityData.city = city
		},
		handleAreaCode () {
			console.log(this.getCityData)
			this.isShowStartAddress = false
			this.isShowPriceButton = true
		},
		handleShowDestinAddress () {
			this.isShowDestinAddress = true
		},
		handleSearchChange () {
			this.getFilterDestinData()
		},
		getFilterDestinData () {
			this.filterDestinData = [] // 清空上一个数据
			if (this.keywords) {
				this.destinData.forEach((item) => {
					if (item.searchStr.indexOf(this.keywords) !== -1) {
						this.filterDestinData.push(item)
					}
				})
			}
		},
		handleSearchCancel () {
			// console.log("您已清除keywords！")
			this.keywords = ""
		},
		handleChooseDestin (item) {
			this.getCityData.destin = item
			console.log(this.getCityData)
		},
		handleDestinCode () {
			this.isShowDestinAddress = false
		},
		handleShowPriceDetail (item) {
			console.log(item)
			this.priceDetail = item
			this.isShowPriceDetail = true
		},
		// 价格查询
		async handleQueryPrice () {
			console.log(this.getCityData)
			const vm = this
			if (!vm.getCityData.city.id) return vm.$vux.toast.text("请选择出发地", "top")
			if (!vm.getCityData.destin.id) return vm.$vux.toast.text("请选择目的地", "top")
			if (!vm.getCityData.weight) return vm.$vux.toast.text("请输入重量", "top")
			vm.$vux.loading.show({text: "加载中..."})
			const params = {
				"areaCode": vm.getCityData.area.areaCode,
				"productTypes": vm.productTypes.length > 0 ? vm.productTypes.join(",") : "N",
				"electricTypes": vm.electricTypes.length > 0 ? vm.electricTypes.join(",") : "N",
				"countryId": vm.getCityData.destin.id,
				"destination": vm.getCityData.destin.searchStr,
				"weight": vm.getCityData.weight
			}
			const {status, statusText, data} = await priceComparison.getChargePriceExt(params)
			if (status === 200) {
				vm.priceList = data.priceList
				vm.isShowPriceList = true
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
			vm.$vux.loading.hide()
		},
		getTabItemClass (itemAreaCode) {
			if (this.getCityData.city.areaCode === itemAreaCode) return true
			else return false
		},
		async handleDiscount () {
			console.log(this.discount)
			const vm = this
			const params = {
				"productCode": vm.priceDetail.productCode,
				"weight": vm.getCityData.weight,
				"discount": vm.discount / 100,
				"areaCode": vm.getCityData.area.areaCode,
				"countryId": vm.getCityData.destin.id,
			}
			const {status, statusText, data} = await priceComparison.reckonPrice(params)
			if (status === 200) {
				vm.priceDetail.discountPrice = data.disocuntPrice
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
		},
		back () {
			this.isShowPriceDetail = false
			this.discount = 100 // 重置折扣
			this.priceDetail = {} // 清空数据
		}
	},
	components: {
		Group,
		Cell,
		XInput,
		XButton,
		Popup,
		Tab,
		TabItem,
		XTable,
		LoadMore,
		Search,
		Checker,
		CheckerItem,
		Card
	}
}
</script>

<style scoped lang="stylus">
.price-comparison
	.popup1
		width 100%
		height 100%
	.city-item
		display inline-block
		padding 2px 10px
		border 1px solid #ddd
		border-radius 10px
		background-color #eee
		margin 0 5px 8px 5px
	.city
		background-color #00A600
		border 1px solid #00A600
		color #fff
	.tab-item:before
		content ""
		position absolute
		top 10px
		right 10px
		display inline-block
		width 5px
		height 5px
		background-color red
		border-radius 50%
	.eye
		vertical-align bottom
		padding-right 3px
		color red
	.demo5-item
		width 22%
		height 26px
		line-height 26px
		text-align center
		border-radius 3px
		border 1px solid #ccc
		background-color #fff
		margin-right 6px
	.demo5-item-selected
		background #ffffff url(../../assets/jiaobiao-r.png) no-repeat right bottom
		border-color #ff4a00
		background-size 18px 18px
	.detail
		padding 10px 15px 5px
		border 1px solid #ddd
		border-radius 10px
		background-color cornsilk
		box-shadow 0px 0px 3px #ddd
		.key
			display block
			color #999
			width 94px
			height 50px
			margin-right 15px
			font-size 14px
			color #000
			line-height 50px
		.value
			height 50px
			line-height 50px
			font-size 14px
			color #000
	.priceDetail-desc
		border 1px solid #ddd
		border-radius 10px
		background-color beige
		box-shadow 3px 3px 3px #000
	.discount
		width 80px
		border 1px solid #ddd
		padding 3px 6px
		text-align center
		outline none
		color red
</style>