<template>
	<div class="query page">
		<div class="p10 mt80">
			<div class="p10 mt10 tracking-box">
				<p class="tracking-title text-center">运单号查询</p>
				<p class="tracking"><input v-model="number" placeholder="请输入物流单号"></input></p>
				<p class="mt20 mb30">
					<x-button type="primary" @click.native="query">查询</x-button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { Group, Step, StepItem, LoadMore, XInput, XButton } from "vux"

export default {
	data () {
		return {
			name: "query",
			step: 0,
			number: "", // 快递单号
		}
	},
	methods: {
		query () {
			if (!this.number) return this.$vux.toast.text("请输入物流单号", "top")
			this.$router.push(`/query/${this.number}`)
		}
	},
	components: {
		Group,
		Step,
		StepItem,
		LoadMore,
		XInput,
		XButton
	}
}
</script>

<style scoped lang="stylus">
.query
	background-color beige
	.mt80
		margin-top 6rem
.tracking-box
	border-radius 10px
	background bisque url(../../assets/default.png) no-repeat
	background-size 100%
	box-shadow 0 0 5px #000
	.tracking-title
		margin 8px 0 12px 0
		color #000
		position relative
		font-size 20px
		font-weight 500
	// .tracking-title:before
	// 	content "************************************"
	// 	display inline-block
	// 	position absolute
	// 	top 50%
	// 	left 50%
	// 	color #000
	// 	transform translate(-50%, -50%)
	.tracking
		input
			box-sizing border-box
			width 100%
			height 42px
			line-height 42px
			border 1px solid #aaa
			padding 0 10px
			font-size 18px
			color #000
			border-radius 5px
			outline none
</style>