<template>
	<div class="page color">
		my name is {{name}}.
	</div>
</template>

<script>
export default {
	data () {
		return {
			name: "query"
		}
	}
}
</script>

<style scoped lang="stylus">
.color
	red
</style>