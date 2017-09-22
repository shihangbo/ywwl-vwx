<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<router-view></router-view>
		<tabbar>
			<tabbar-item link="/query">
				<i slot="icon" class="iconfont lh1">&#xe62d;</i>
				<span slot="label">快件追踪</span>
			</tabbar-item>
			<tabbar-item show-dot link="/priceComparison">
				<i slot="icon" class="iconfont lh1">&#xe854;</i>
				<span slot="label">价格比较</span>
			</tabbar-item>
			<tabbar-item link="/products">
				<i slot="icon" class="iconfont lh1">&#xe60d;</i>
				<span slot="label">产品服务</span>
			</tabbar-item>
			<!--<tabbar-item link="http://www.wise-mate.com/branchYanwen/indexMobile.html">
				<i slot="icon" class="iconfont lh1">&#xe660;</i>
				<span slot="label">网点查询</span>
			</tabbar-item>-->
		</tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux"
export default {
	name: "app",
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
