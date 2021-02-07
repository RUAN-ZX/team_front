<template>
	<view>
		<mp-html :content="html" />
		
	</view>
</template>

<script>
	import mpHtml from '@/components/mp-html/mp-html.vue'
	export default {
	// 不可省略
	components: {
	 mpHtml
	},
	data() {
	 return {
	   html: '<div>Hello World!</div>'
	 }
	}
	}
</script>

<style>

</style>
