<template>
	<div class="price-comparison">
		<div class="page">
			<Group>
				<cell v-if="!getCityData.city.id" title="发出地" is-link class="text-left" @click.native="handleShowStartAddress"></cell>
				<cell v-if="getCityData.city.id" title="发出地" is-link class="text-left" @click.native="handleShowStartAddress" :value="`${getCityData.area.name}-${getCityData.city.name}`"></cell>
				<cell title="目的地" is-link class="text-left" value="美国"></cell>
				<x-input class="text-left" text-align="right" title="重量(kg)" placeholder="输入重量" novalidate :show-clear="false" placeholder-align="right"></x-input>
			</Group>
			<p class="mt30" style="padding:0 10%;">
				<x-button plain type="warn">查询</x-button>
				<x-button plain>查询</x-button>
			</p>
		</div>
		<Popup v-model="isShowStartAddress" height="100%" :hide-on-blur="false">
			<div class="popup1">
				<tab>
					<tab-item @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass('1001')}" class="relative" selected>华北</tab-item>
					<tab-item @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass('1003')}" class="relative">华南</tab-item>
					<tab-item @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass('1002')}" class="relative">华东</tab-item>
					<tab-item @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass('1004')}" class="relative">香港</tab-item>
					<tab-item @on-item-click="onItemClick" :class="{'tab-item': getTabItemClass('1006')}" class="relative">西南</tab-item>
				</tab>
				<ul class="p10 bg-white text-left">
					<li v-for="item in city" class="inline city-item" :class="{city: item.id === getCityData.city.id}" @click="handleChooseCity(item)">{{item.name}}</li>
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
import { Group, Cell, XInput, XButton, Popup, Tab, TabItem } from "vux"
export default {
	data () {
		return {
			name: "priceComparison",
			isShowStartAddress: false,
			city: [{name: "北京", id: 1, areaCode: "1001"}, {name: "济南", id: 2, areaCode: "1001"}],
			getCityData: {area: {areaCode: "1001", name: "华北"}, city: {}}  // 默认华北1001，华南1003，华东1002，香港1004，西南1006
		}
	},
	methods: {
		handleShowStartAddress () {
			this.isShowStartAddress = !this.isShowStartAddress
		},
		onItemClick (index) {
			switch (index) {
				case 0:
					this.city = [{name: "北京", id: 1, areaCode: "1001"}, {name: "济南", id: 2, areaCode: "1001"}]
					this.getCityData.area = {areaCode: "1001", name: "华北"}
					break
				case 1:
					this.city = [{name: "深圳", id: 3, areaCode: "1003"}, {name: "广州", id: 4, areaCode: "1003"}]
					this.getCityData.area = {areaCode: "1003", name: "华南"}
					break
				case 2:
					this.city = [{name: "上海", id: 5, areaCode: "1002"}, {name: "杭州", id: 6, areaCode: "1002"}]
					this.getCityData.area = {areaCode: "1002", name: "华东"}
					break
				case 3:
					this.city = [{name: "香港", id: 11, areaCode: "1004"}]
					this.getCityData.area = {areaCode: "1004", name: "香港"}
					break
				case 4:
					this.city = [{name: "成都", id: 7, areaCode: "1006"}, {name: "重庆", id: 8, areaCode: "1006"}]
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
		TabItem
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