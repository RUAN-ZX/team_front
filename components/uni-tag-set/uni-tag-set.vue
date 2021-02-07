<template>
	<view class="uni-tag-set">
		<uni-tag
			class="tag"
			v-for="(tagItem,tagIndex) in set"
			:key="tagIndex"
			:text="tagItem"
			circle="true"
			inverted="true"
			size="small"
			type="primary"
		></uni-tag>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue";
	
	export default {
		
		name: "uniTagSet",
		props: {
			set:{
				type: [Array],
				default: []
			}
		}
	}
</script>

<style lang="less">
	@import "@/uni.less";
	.uni-tag-set{
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		overflow-y: hidden;
		overflow-x: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
		.tag{
			width: auto;
			margin-right: @padding/2;
			margin-top: @padding/3;
		}
	}
</style>
