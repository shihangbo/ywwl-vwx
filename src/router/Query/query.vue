<template>
	<div class="page query">
		<div class="query-msg-fixed bg-white bbh text-left">
			<div class="query-id pl10"><span>单号:</span><span class="query-id__label">{{queryId}}</span></div>
			<div class="query-msg-fixed__item">
				<p class="w50 cut fl c0"><span>信息:</span><span :class="{'text-red': this.resources.state === 0}">{{stateStr}}</span></p>
				<p class="w50 cut fl c0"><span>时间:</span><span>{{timeStr || 0}} 天</span></p>
			</div>
			<div class="query-msg-fixed__item">
				<p class="w50 cut fl c0"><span>发件国:</span><span>{{originCountry || "-"}}</span></p>
				<p class="w50 cut fl c0"><span>目的国:</span><span>{{destinCountry || "-"}}</span></p>
			</div>
		</div>
		<div class="text-left query-msg-content">
			<p class="fs18 c0 mt20" style="padding-left:.5rem;margin-bottom:-10px;"><icon style="vertical-align: sub;" type="download"></icon>目的国: <span class="label-warn__sm">{{destinCountry || "暂无"}}</span></p>
			<timeline>
				<timeline-item v-for="(i, index) in destion" :key="index">
					<div class="time-item">
						<h4>{{i.location}} {{i.message}}</h4>
						<p>{{i.timestamp}}</p>
					</div>
				</timeline-item>
			</timeline>
			<div class="div-line"></div>
			<p class="fs18 c0 mt20" style="padding-left:.5rem;margin-bottom:-10px;"><icon style="vertical-align: sub;" type="download"></icon>发件国: <span class="label-primary__sm">{{originCountry || "暂无"}}</span></p>
			<timeline>
				<timeline-item v-for="(i, index) in start" :key="index">
					<div class="time-item">
						<h4>{{i.location}} {{i.message}}</h4>
						<p>{{i.timestamp}}</p>
					</div>
				</timeline-item>
			</timeline>
		</div>
	</div>
</template>

<script>
import { Timeline, TimelineItem, Icon } from "vux"
import query from "../../servers/query"
// const resources = require("./res.json")

export default {
	data () {
		return {
			name: "watson",
			resources: {},
		}
	},
	computed: {
		queryId () {
			return this.$route.params.queryId
		},
		// resources () {
		// 	return resources
		// },
		start () {
			return this.resources.origin_items || []
		},
		destion () {
			return this.resources.destin_items || []
		},
		stateStr () {
			return {
				0: "查询不到",
				10: "运输途中",
				20: "运输过久",
				30: "到达待取",
				35: "投寄失败",
				39: "跟踪结束",
				40: "成功签收",
				50: "跟踪异常"
			}[this.resources.state || 0]
		},
		timeStr () {
			return this.resources.days || ""
		},
		originCountry () {
			return this.resources.origin_country
		},
		destinCountry () {
			return this.resources.destin_country
		}
	},
	created () {
		// console.log(resources)
		this.load()
	},
	methods: {
		async load () {
			const vm = this
			const params = {
				"billNums": vm.queryId,
				"language": "chn"
			}
			vm.$vux.loading.show({text: "加载中..."})
			const {status, statusText, data} = await query.getTrackExp2(params)
			if (status === 200) {
				vm.resources = data[vm.queryId]
			} else {
				vm.$vux.toast.text(statusText, "top")
			}
			vm.$vux.loading.hide()
		}
	},
	components: {
		Timeline,
		TimelineItem,
		Icon
	}
}
</script>

<style scoped lang="stylus">
.query
	padding-bottom 53px
	.query-msg-fixed
		position fixed
		top 0
		left 0
		width 100%
		height 79px
		z-index 101
		.query-id
			width 100%
			height 30px
			line-height 30px
			font-size 16px
			color #fff
			background-color #00cc42
			font-weight 500
		.query-msg-fixed__item
			height 24px
			line-height 24px
			background-color antiquewhite
			padding-left 10px
		.query-id__label
			border 1px solid #fff
			padding 0 8px
			margin-left 10px
			border-radius 3px
	.query-msg-content
		padding-top 80px
		.time-item
			border 1px solid #ddd
			padding 3px 6px
			border-radius 5px
			background-color snow
			box-shadow 3px 3px 3px #bbb
	.div-line
		width 100%
		height 1px
		background-color #ddd
	.text-red
		color red
</style>