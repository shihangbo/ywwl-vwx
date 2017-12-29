<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<router-view></router-view>
			<tabbar>
			<tabbar-item link="/query" @click.native="barItem = 1" :show-dot="barItem === 1">
				<i slot="icon" class="iconfont lh1">&#xe62d;</i>
				<span slot="label">快件追踪</span>
			</tabbar-item>
			<tabbar-item @click.native="barItem = 2" :show-dot="barItem === 2" link="/priceComparison">
				<i slot="icon" class="iconfont lh1">&#xe854;</i>
				<span slot="label">价格比较</span>
			</tabbar-item>
			<tabbar-item @click.native="barItem = 3" :show-dot="barItem === 3" link="/products">
				<i slot="icon" class="iconfont lh1">&#xe60d;</i>
				<span slot="label">产品服务</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux"
export default {
	name: "app",
	data () {
		return {
			barItem: 0
		}
	},
	components: {
		Tabbar,
		TabbarItem
	}
}
</script>

<style lang="less">
	@import './style/reset.less';
  @import './style/responsive.less';
  @import './style/iconfont.less';
  @import './style/common.less';
</style>

<style lang="stylus">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	// margin-top: 60px;
}
</style>
