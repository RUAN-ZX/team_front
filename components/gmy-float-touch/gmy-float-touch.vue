<template name="gmy-float-touch">
	<view>
		<view class="u-dropdown__content" :style="[contentStyle, {
				transition: `opacity ${duration / 1000}s linear`,
				top: 0,
			}]"
			@tap="maskClick" @touchmove.stop.prevent>
			
			<view class="u-dropdown__content__mask"></view>
		</view>
		<view @touchmove.stop.prevent = "doNothing" >
			<view class="box" @click="show"
			:style="{bottom:bottom+'px',zIndex: rindex+1}" 
			:animation="animationData" >
				<image :src="imgLists[0]" mode="widthFix"></image>
			</view>
			<view class="menu " 
			:class="{menu0:!isShow&&isleft,menu1:isShow&&isleft ,menu1R:isShow&& !isleft ,menu0R:!isShow&& !isleft}" 
			:style="{bottom:(bottom+75)  +'px',zIndex: rindex}" 
			@tap="menuClick(1)" >
				<image :src="imgLists[1]" mode="widthFix"></image>
			</view>
			
			<view class="menu" :class="{menu0:!isShow&&isleft,menu2:isShow&&isleft ,menu2R:isShow&& !isleft ,menu0R:!isShow&& !isleft }"  
			:style="{bottom:(bottom+53)+'px',zIndex: rindex}" @tap="menuClick(2)">
				<image :src="imgLists[2]" mode="widthFix"></image>
			</view>
			<view class="menu" :class="{menu0:!isShow&&isleft,menu3:isShow&&isleft ,menu3R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  
			:style="{bottom:bottom+'px',zIndex: rindex}" @tap="menuClick(3)">
				<image :src="imgLists[3]" mode="widthFix"></image>
			</view>
			<view class="menu" :class="{menu0:!isShow&&isleft,menu4:isShow&&isleft ,menu4R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  
			:style="{bottom:(bottom - 53)+'px',zIndex: rindex}" @tap="menuClick(4)">
				<image :src="imgLists[4]" mode="widthFix"></image>
			</view>
			<view class="menu" :class="{menu0:!isShow&&isleft,menu5:isShow&&isleft ,menu5R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  
			:style="{bottom:(bottom - 75)+'px',zIndex: rindex}" @tap="menuClick(5)">
				<image :src="imgLists[5]" mode="widthFix"></image>
				<!-- <u-back-top :scroll-top="scrollTop"></u-back-top> -->
			</view>
		</view>
	</view>
</template>

<script>
	var m_this;
	export default{
		name:"gmy-float-touch",
		data(){
			return {
				windowHeight:0,
				contentStyle: {
					zIndex: -1,
					opacity: 0
				},
				isShow:false,
				bottom:100,
				left:3,
				right:3,
				isleft:false,
				animationData:''
			}
		},
		props:{
			duration:{
				type: Number,
				default:300
			},
			rindex:{
				type:Number,
				default: 10
			},
			imgLists:{
				type:Array,
				default: [
					"https://stea.ryanalexander.cn/psl/avatarDefault.jpg",
					"https://stea.ryanalexander.cn/psl/avatarDefault.jpg",
					"https://stea.ryanalexander.cn/psl/avatarDefault.jpg",
					"https://stea.ryanalexander.cn/psl/avatarDefault.jpg",
					"https://stea.ryanalexander.cn/psl/avatarDefault.jpg"
				]
			},
			mainImg:{
				type:String,
				default:"https://stea.ryanalexander.cn/psl/avatarDefault.jpg"
			}
		},
		created() {
			m_this = this;
			this.windowHeight = this.$u.sys().windowHeight;
			console.log(this.$u.sys());
		},
		methods:{
			doNothing:function(){},
			show:function(){
				this.isShow = !this.isShow;
				this.maskChange();
				this.spread();
				
			},
			maskClick() {
				this.isShow = false;
				this.maskChange();
				this.spread();
			},
			maskChange(isShow) {
				if(this.isShow){
					this.contentStyle = {
						zIndex: this.rindex-2,
					}
				}
				else{
					this.contentStyle = {
						zIndex: -1,
						opacity: 0
					}
				}
				
			},
			
			spread:function(e){
				var animation = uni.createAnimation({
				  duration: m_this.duration,
					timingFunction: 'ease',
				});
				this.animationData = animation.export();
				
				if(this.isShow){
					animation.rotate(135).step();
				}
				else{
					animation.rotate(0).step();
				}
				this.animationData = animation.export();
			},
			// touchmove:function(e){
			// 	if(this.isShow){
			// 		return 
			// 	}
			// 	var position = e.touches[0];
			// 	var wHeight = this.getSystemInfo('H');
			// 	if(position.pageY>100 && position.pageY+100 < wHeight){
			// 		this.top =  position.pageY-20;
			// 	}
			// 	this.left = position.pageX;
			// },
			// touchend:function(e){
			// 	var wWidth = this.getSystemInfo('W');
			// 	const pageX = e.changedTouches[0].clientX;
			// 	if(pageX > wWidth*0.5){
			// 		this.isleft = false;
			// 		this.left = wWidth-50;
			// 	}
			// 	else{
			// 		this.isleft = true;
			// 		this.left = 3;
			// 	}
				
			// },
			menuClick:function(index){
				// this.$emit("menuClick",index);
				// 这里固定了干脆 反正都是发布功能罢了 导向三个同样的页面
				switch(index){
					case 1:{
						uni.navigateTo({
							url: '/pages/release/project/project',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					}
					case 2:{
						uni.navigateTo({
							url: '/pages/release/talent/talent',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					}
					case 3:{
						uni.navigateTo({
							url: '/pages/release/qa/qa',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					}
					case 4:{
						uni.navigateTo({
							url: '/pages/release/qa/qa',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					}
					case 5:{
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
						break;
					}
				}
			},
			getSystemInfo:function(type){
				var result;
				const screen = uni.getSystemInfoSync();
				const wHeight = screen.windowHeight;
				const wWidth = screen.windowWidth;
				switch(type){
					case 'H':result =  wHeight;break;
					case 'W':result = wWidth;break;
					default: result = 'Err';			
				}
				return result;
			},
			
		}
	}
	
</script>

<style lang="scss">

	image{
		width: 100%;
		height: 100%;
	}
	.box{
		position: fixed;
		right: 20upx;
		// top: 70%;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.14);
		// background-color: rgba($color: #000000, $alpha: 0.5);
	}
	.menu{
		color:white;
		position: fixed;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.14);
		// background-color: rgba($color: #000000, $alpha: 0.8);
	}
	.menu0{
		left: 5upx;
		opacity: 0;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu1{
		left: 20upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu2{
		left: 106upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu3{
		left: 145upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu4{
		left: 106upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu5{
		left: 20upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu0R{
		right: 5upx;
		opacity: 0;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
		
	}
	.menu1R{
		right: 20upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu2R{
		right: 106upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu3R{
		right: 145upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu4R{
		right: 106upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu5R{
		right: 20upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	
	.u-dropdown {
		width: 100vw;
		height: 200vh; // 可以滑动的长度不会超过200vh 故遮罩完全
		position: relative;
		&__content {
			position: absolute;
			z-index: 8;
			width: 100%;
			height: 200vh;
			left: 0;
			top: 0;
			overflow: hidden;
			
	
			&__mask {
				position: absolute;
				z-index: 9;
				background: rgba(0, 0, 0, .3);
				width: 100%;
				height: 200vh;
				left: 0;
				top: 0;
			}
		}
	}
</style>
