<template>
	<view class="btn-page">
		<view class="btn-box" @tap="_tap">
			<luButtonRipple>
				<view class="col">
					qqq
				</view>
				<view class="col">
					qqq
				</view>
				<view class="col">
					qqq
				</view>
			</luButtonRipple>
		</view>
		<!-- <view class="btn-box" v-for="(btn,index) in btnList" :key="index">
			<luButtonRipple :rippleBackgroundColor="btn.backgroundColor" :rippleOpacity="btn.opacity" :buttonRippleId="index" @rippleTap="_tap">
				<view class="col">
					{{btn.text}}
				</view>
				<view class="col">
					{{btn.text}}
				</view>
				<view class="col">
					{{btn.text}}
				</view>
			</luButtonRipple>
		</view> -->
	</view>
</template>

<script>
import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
export default {
	components: { luButtonRipple },
	data() {
		return {
			btnList:[
				{	text:"透明度：1",
					backgroundColor:"#999",
					opacity:1
				},
				{
					text:"透明度：0.6",
					backgroundColor:"#999",
					opacity:0.6
				},
				{
					text:"透明度：0.3",
					backgroundColor:"#999",
					opacity:0.3
				},
				{
					text:"透明度：0.1",
					backgroundColor:"#999",
					opacity:0.1
				},
				{
					text:"颜色：红",
					backgroundColor:"red",
					opacity:0.6
				},
				{
					text:"颜色：黄",
					backgroundColor:"yellow",
					opacity:0.6
				},
				{
					text:"颜色：绿",
					backgroundColor:"green",
					opacity:0.6
				},
				{
					text:"颜色：蓝",
					backgroundColor:"blue",
					opacity:0.6
				}
			]
		};
	},
	methods: {
		_tap: function(){
				
		}
	}
};
</script>

<style lang="less">
	.btn-page{
		margin: 100px;
		position: relative;
		width: 100%;
		display: flex;
		height: auto;
		flex-direction: column;
		.btn-box{
			position: relative;
			width: 80%;
			height: 40px;
			font-size: 12px;
			background-color: #f9f9f9;
			border-radius: 5px;
			margin: 10px;
			overflow: hidden;
			box-shadow: 1px 2px 3px rgba(100,100,100,0.5);
			.col{
				position: relative;
				flex: 1;
				height: 20px;
			}
		}
		
	}
	
</style>
