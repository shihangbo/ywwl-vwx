<template>
	<div class="page">
		<grid>
			<grid-item label="快件追踪" link="/query">
				<img slot="icon" src="../assets/shixiao.png"/>
				<p class="c6 fs12">快件全球追踪</p>
			</grid-item>
			<grid-item label="价格比较" link="/priceComparison">
				<img slot="icon" src="../assets/price.png"/>
				<p class="c6 fs12">时效运费计算</p>
			</grid-item>
		</grid>
		<grid>
			<grid-item label="产品服务" link="/products">
				<img slot="icon" src="../assets/products.png"/>
				<p class="c6 fs12">快递产品介绍</p>
			</grid-item>
			<grid-item label="网点查询" link="http://www.wise-mate.com/branchYanwen/indexMobile.html">
				<img slot="icon" src="../assets/nets.png"/>
				<p class="c6 fs12">燕文网点查询</p>
			</grid-item>
		</grid>
	</div>
</template>

<script>
import { Grid, GridItem } from "vux"
export default {
	components: {
		Grid,
		GridItem
	}
}
</script>

<style scoped>
</style>
