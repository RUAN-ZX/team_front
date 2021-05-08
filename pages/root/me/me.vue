<template>
    <view>
		<view class="header">
			<image
				src="@/static/img/bg.jpeg"
				class="header_image" mode="scaleToFill">
			</image>
			<view class="header_alias_avatar"
				:style="[{top: info.top+'px'}]">
				
				<view class="header_avatar">
					<image class="header_frame_image" mode="widthFix"
					:src="'https://stea.ryanalexander.cn'+userInfo.grade.img"></image>
					<image class="header_avatar_image" mode="widthFix"
					:src="userInfo.avatar"></image>
				</view>
				<view class="header_right">
					<view class="header_alias overflow">
						{{userInfo.alias}}
						
					</view>
					<view class="header_grade">
						<u-tag
						:style="[{marginRight: '10px'}]"
						:bg-color="userInfo.grade.color"
						:text="userInfo.grade.text"
						mode="dark"
						size="mini"
						></u-tag>
						<u-tag
						:type="userInfo.certification.color"
						:text="userInfo.certification.text2"
						mode="dark"
						size="mini"
						></u-tag>
					</view>
				</view>
			</view>
		</view>
        <view class="card social">
			<view class="social_items"
			v-for="(socialItem,socialIndex) in socialData"
			:key="socialIndex">
				<view class="social_num">{{socialItem.num}}</view>
				<view class="social_name">{{socialItem.name}}</view>
			</view>
		</view>
		
		<view class="card function">
			<u-button type="primary" @click="logout">登出</u-button>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '@/api/api.js';
	export default {
        data() {
            return {
				cellIndex: 0,
				info: {},
				userInfo: {},
				socialData:[
					{
						name: "谁看过我",
						num: "33"
					},
					{
						name: "收到的赞",
						num: "198"
					},
					{
						name: "我的发布",
						num: "203"
					},
					{
						name:"我的好友",
						num: "27"
					}
				]
			}
        },
        methods: {
            logout(){
				// uni.onSocketOpen(() => {
				//   uni.closeSocket();
				// });
				
				// uni.onSocketClose((res) => {
				//   console.log('WebSocket 已关闭！');
				  
				// });
				uni.navigateTo({
					url: '/pages/login/login',
					success: res => {
						uni.removeStorageSync("a");
						uni.removeStorageSync("r");
						uni.removeStorageSync("i");
					},
					fail: () => {},
					complete: () => {}
				});
			}
        },
		onLoad() {
			
			this.userInfo = getApp().globalData.userInfo_;
			this.info = getApp().globalData.info;
		}
    }
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	$padding_: 2*$padding;
	.header{
		position: relative;
		width: 100vw;
		height: 24vh;
		z-index: $zindex_bg;
		display: block;
		margin: 0;
		.header_image{
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.header_image:after{
			z-index: 5;
			position: absolute;
			width: 100%;
			height: 100%;
			
			top: 0;left: 0;
			content: "";
			background: linear-gradient(rgba(255,255,255,0) 90%, rgba(255,255,255,1.0) 100%);
		}
		
		.header_alias_avatar{
			position: absolute;
			left: $padding_;
			z-index: $zindex_content;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			// align-items: center;
			
			height: 120rpx;
			.header_avatar{
				// border: 2px $themeColor3 solid;
				width: 120rpx;
				height: 100%;
				border-radius: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				
				.header_avatar_image{
					
					width: 90rpx;
					height: 75%;
					position: absolute;
					border-radius: 100%;
					
				}
				.header_frame_image{
					position: absolute;
					z-index: $zindex_tab;
					width: 120rpx;
					height: 100%;
					border-radius: 100%;
				}
			}
			.header_right{
				margin-left: $padding;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;
				
				.header_alias{
					width: 50vw;
					font-weight: bolder;
					font-size: 40rpx;
					color: $themeColor3;
				}
				.header_grade{
					margin-top: $padding/2;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				
			}
		}
	}
	
	
	.social{
		margin: -4vh $padding_ $padding $padding_;
		
		
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.social_items{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: $padding;
			
			border-left: 1.1px solid $lineColor;
			border-right: 1.1px solid $lineColor;
			.social_num{
				font-size: 50rpx;
				color: $themeColor;
				font-weight: bolder;
				font-family: 'STXinwei', Courier, monospace;
			}
			.social_name{
				color: $labelColor2;
				font-size: 28rpx;
				
			}
		}
	}
	.card{
		background-color: $cardColor;
		border: 0;
		overflow: hidden;
		border-radius: $padding/2;
		padding: $padding;
		position: relative;
		height: auto;
		z-index: $zindex_content;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);
		
	}
	.function{
		margin: 0 $padding_ $padding $padding_;
	}
</style>
