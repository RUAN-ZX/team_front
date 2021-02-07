<template>
	<view class="_notice">
		<view class="textSec" :style="'width:'+textWidth+'px;'+'animation-duration:'+ duration +'s'">
			<view class="textItem" v-for="(item,index) in list" :key="index" :id="'textItem'+index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//显示数据
			list: {
				type: Array,
				defual:function(){
					return [];
				}
			},
		},
		data() {
			return {
				duration:10,
				textWidth:0,
			};
		},
		mounted(){
			let endIdx = this.list.length-1;
			const query = uni.createSelectorQuery().in(this);
			query.select('#textItem'+endIdx).boundingClientRect(data => {
				this.textWidth = data.width + data.left + (endIdx+1)*10;//获取总的长度
				this.duration = this.textWidth/50;//美妙走50个像素，获取走的时间
			}).exec();
		},
		methods:{
		}

	};
</script>

<style lang="scss">
	._notice {
		z-index: 9;
		width: 100%;
		font-size: 20upx;
		height: 25px;
		box-sizing: border-box;
		overflow-y: hidden;
		.textSec{
			min-width: 100vw;
			font-size: 20upx;
			height: 25px;
			display: block;
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;
			animation-name: scroll;
			animation-timing-function:linear;
			animation-iteration-count: infinite;
			@keyframes scroll
			{
				from {
				  transform: translateX(0);
				}
				to {
				  transform: translateX(calc(-100% - 4em)); 
				}
			}
			.textItem{
				display: inline-block;
				height: 15px;
				line-height: 15px;
				background: #fff;
				color: #afafaf;
				border-radius: 4upx;
				margin: 0 10upx;
				padding: 0 15upx;
			}
		}
	}
</style>
