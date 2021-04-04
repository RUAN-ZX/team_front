<template>
	<view>
		<u-button @click="navigateBack">返回</u-button>
		<rich-text :nodes="richText"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				richText: '',
			}
		},
		onLoad(options) {
			this.richText = decodeURIComponent(options.rich);
			console.log(this.richText)
		},
		methods: {
			navigateBack(){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style>

</style>
