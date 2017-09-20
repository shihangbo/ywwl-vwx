<template>
	<div class="price-comparison">
		<div class="page" style="padding-bottom: 55px;">
			<Group title="价格比较" class="text-left">
				<cell v-if="!getCityData.city.id" title="发出地" is-link class="text-left" @click.native="handleShowStartAddress"></cell>
				<cell v-if="getCityData.city.id" title="发出地" is-link class="text-left" @click.native="handleShowStartAddress" :value="`${getCityData.area.name}-${getCityData.city.name}`"></cell>
				<cell title="目的地" is-link class="text-left" value="美国"></cell>
				<x-input class="text-left" text-align="right" title="重量(kg)" placeholder="输入重量" novalidate :show-clear="false" placeholder-align="right"></x-input>
			</Group>
			<p class="mt30 mb30" style="padding:0 10%;">
				<x-button v-if="isShowPriceButton" plain type="warn" @click.native="handleQueryPrice">查询</x-button>
				<x-button v-if="!isShowPriceButton" plain>查询</x-button>
			</p>
			<!--价格显示-->
			<div v-if="isShowPriceList">
				<x-table class="bg-white">
					<thead class="bg-lightgrey">
						<tr>
							<th>Product</th>
							<th>Price</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
						</tr>
						<tr>
							<td>Apple</td>
							<td>$1.25</td>
							<td> x 1</td>
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
					<tab-item v-for="(item, index) in area" :keys="index" @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass(item.areaCode)}" class="relative" :selected="item.areaCode === getCityData.area.areaCode">{{item.area}}</tab-item>
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
	</div>
</template>

<script>
import { Group, Cell, XInput, XButton, Popup, Tab, TabItem, XTable, LoadMore } from "vux"
import priceComparison from "../../servers/priceComparison"

export default {
	data () {
		return {
			name: "priceComparison",
			isShowStartAddress: false,
			isShowPriceList: false,
			isShowPriceButton: false,
			getCityData: {area: {}, city: "", wight: "", destin: {}},  // 获取-默认华北1001，华南1003，华东1002，香港1004，西南1006
			area: [], // 转化数据-保存区域
			areaCity: {}, // 转化数据-保存区域城市 {1001: [], 1002: []}
			city: [], // 获取-对应城市
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
			const {data, status, statusText} = await priceComparison.getChargePriceExt(params)
			if (status === 200) {
				console.log(data)
				vm.getAreaCity(data.lineCity.lineCityList) // 获取 areaCity
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
		// 价格查询
		handleQueryPrice () {
			const vm = this
			vm.$vux.loading.show({text: "加载中..."})
			setTimeout(() => {
				vm.isShowPriceList = true
				vm.$vux.loading.hide()
			}, 2000)
		},
		getTabItemClass (itemAreaCode) {
			if (this.getCityData.city.areaCode === itemAreaCode) return true
			else return false
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
		LoadMore
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
</style>