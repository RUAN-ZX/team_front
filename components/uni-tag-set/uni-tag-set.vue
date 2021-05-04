<template>
	<view class="uni-tag-set">
		<view class="tag" 
		v-for="(tagItem,tagIndex) in set"
		:key="tagIndex">
			<u-tag
				:text="tagItem"
				shape="square"
				border-color="transparent"
				mode="light"
				:closeable="false"
				:size="size"
				:type="tagIndex<2?'primary':'info'"
				
			></u-tag>
		</view>
		
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue";
	
	export default {
		components: {
			uniTag
		},
		name: "uniTagSet",
		props: {
			size:{
				type: String,
				default: "mini"
			},
			set:{
				type: [Array],
				default: []
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	.uni-tag-set{
		display: flex;
		flex-direction: row;
		align-items: center;
		
		
		white-space: nowrap;
		overflow-y: hidden;
		overflow-x: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
		.tag{
			width: auto;
			margin-right: $padding/2;
			margin-bottom: 3px;
		}
	}
</style>
