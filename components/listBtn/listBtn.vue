<template>
	
	<view class="list-btn"
		@click="navigate_()">
		<lu-button-ripple></lu-button-ripple>
		<view class="left">
			{{title}}
		</view>
		<view class="right">
			>
		</view>
		
	</view>

	
		
</template>

<script>
	import luButtonRipple from '../lu-button-ripple/lu-button-ripple.vue';	
	export default {
		name: 'listBtn',
		comments:{
			luButtonRipple
		},
		props: {
			title: {
				type: String,
				default: '36rpx'
			},
			navigate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			navigate_:function(){
				uni.navigateTo({
					url: this.navigate,
				});	
			}
		}
	}
</script>

<style lang="less">
	@import "@/uni.less";
	.list-btn{
		display: flex;
		flex-direction: row;
		color: @labelColor;
		border-bottom: 1px solid @lineColor;
		height: @height_header*1.2;
		line-height:@height_header*1.2;
		z-index: 0;
		position: relative; // 限定ripple在空间范围内起效果的最佳方法
		height: auto;
		width: auto;
		.left{
			flex: 10;
			
			font-size: @height_header*0.45;
			word-break: break-all;
			white-space:nowrap; 
			text-overflow: ellipsis;  /* 超出部分省略号 */
			
			overflow: hidden;  /*超出隐藏*/
		}
		.right{
			font-size: @height_header*0.4;
			flex: 1;
			text-align: center;
		}
	}
</style>
