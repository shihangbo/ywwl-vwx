<template>
	<div class="query">
		<div class="bg-white p10">
			<div class="p10 mt10 tracking-box">
				<p class="tracking-title text-center">运单号查询</p>
				<p class="tracking"><input v-model="number"></input></p>
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
			number: 123242323, // 快递单号
		}
	},
	methods: {
		query () {
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
.tracking-box
	background-color #ddd
	border-radius 10px
	.tracking-title
		margin 8px 0
		color #000
		position relative
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
			border-radius 3px
			outline none
</style>