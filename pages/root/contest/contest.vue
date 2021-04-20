<template>
	<view class="u-demo">
		<view class="item"
			:style="[popupStyle]"
		>
			
		</view>
		<u-button @click="change"></u-button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
			}
		},
		created() {
			
		},
		computed: {
			// 下拉出来部分的样式
			popupStyle() {
				let style = {};
				// 进行Y轴位移，展开状态时，恢复原位。收齐状态时，往上位移100%，进行隐藏
				style.transform = `translateY(${this.active ? 0 : '-10%'})`
				// style['transition-duration'] = 0.4 + 's';
				style['opacity'] = this.active ? 1 : 0;
				return style;
			}
		},
		methods: {
			change(){
				this.active = !this.active;
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "@/uview-ui/libs/css/style.components.scss";

	.item {
		background-color: blue;
		height: 300px;
		width: 50px;
		transition: all 0.4s ease-out;
	}
	
</style>
