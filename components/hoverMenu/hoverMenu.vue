<!-- 
	name: 悬浮菜单
	version: v0.0.1
	update_time: 2020-6-25 
 -->
<template>
	<view>
		<!-- 遮罩 -->
		<view class="mask" v-if="show" @tap="show = false" @touchmove.stop.prevent></view>
		<!-- 按钮 -->
		<view class="major-box" :class="{show: show}" :style="{top: top + 'px' }" >
			<view class="click-btn" @tap="show = !show" draggable="true" @touchstart="touchstart" @touchmove.stop.prevent="touchmove">
				<view>小助手</view>
			</view>
			<view class="nav-box">
				<slot></slot>
				<!-- <view class="nav-btn" v-for="(btn, index) in btnList" :key="index" @tap="clickBtn(btn)">
					<view class="nav-icon" :style="{backgroundColor: btn.bgcolor}">{{btn.icon}}</view>
					<view class="nav-text">{{btn.text}}</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	created() {
		this.top = uni.getStorageSync("hoverTop");
	},
	props:{
		
	},
	data() {
		return {
			show: false ,// 是否显示
			top: 300,	// 顶端距离 
			deviationTop: 0,	// 偏移量
			windowHeight: uni.getSystemInfoSync().windowHeight,	// 视图高度 
			btnList: [		// 所有按钮 
				{
					icon: '组',
					text: '组队吧',
					bgcolor: '#73B3C7'
				},
				{
					icon: '找',
					text: '找项目',
					bgcolor: '#66B26A'
				},
				{
					icon: '问',
					text: '提问题',
					bgcolor: '#FE7A7D'
				},
				{
					icon: '文',
					text: '写文章',
					bgcolor: '#CAB493'
				},
				{
					icon: '简',
					text: '修简历',
					bgcolor: '#91B3B2'
				},
				{
					icon: '友',
					text: '加好友',
					bgcolor: '#959AB3'
				},
				
			]
		};
	},
	methods: {
		// 点击按钮 
		clickBtn: function(btn) {
			console.log('点击了：' + btn.text);
		},
		// 拖动开始，记录一下偏移量
		touchstart: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			this.deviationTop = touch.clientY - this.top;
			// console.log(this.deviationTop);
		},
		// 上下拖动时 
		touchmove: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			var top = touch.clientY;
			top = top - this.deviationTop;
			if (top < 0) {
				top = 0;
			}
			if (top > this.windowHeight - 40) {
				top = this.windowHeight - 40;
			}
			this.top = top;
			return false;
		},
	}
};
</script>

<style>
	/* 遮罩 */
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 3;
		background: rgba(0, 0, 0, 0.4);
	}
	/* 总盒子 */
	.major-box {
		border: 1px 0 solid;
		z-index: 99;
		position: fixed;
		width: 100%;
		/* height: 0px; */
		left: 650rpx;
		transition: left 0.5s;
		overflow: hidden;
	}
	/* 展开时 */
	.major-box.show{left: 110rpx;}
	
	.click-btn,
	.nav-box {
		float: left;
	}
	/* 按钮样式 */
	.nav-box{
		background-color: #FFF;
		border-radius: 0 0 0 5px;
	}
	.click-btn {
		width: 100rpx;
		background-color: #fe6d34;
		color: #fff;
		font-size: 10px;
		text-align: center;
		border-radius: 100rpx 0 0 100rpx;
		line-height: 12px;
		padding: 5px 0;
	}
	.click-btn view {
		padding-left: 15rpx;
	}

	/* 按钮盒子 */
	.nav-box {
		width: 500rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		justify-content: center;
	}
	.nav-btn {
		flex: 1;
		border: 0px #000 solid;
		min-width: 150rpx;
		padding: 12rpx 0;
		padding-bottom: 20rpx;
	}
	.nav-icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		font-size: 15px;
		border-radius: 50%;
		background-color: #666;
		color: #fff;
	}
	.nav-text {
		font-size: 12px;
		font-weight: bold;
		margin-top: 8rpx;
	}
</style>
