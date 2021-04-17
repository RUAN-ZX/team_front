<template>
    <view>
		<view class="header">
			<image
				src="@/static/img/bg.jpeg"
				class="header_image" mode="scaleToFill">
			</image>
			<view class="back" @click="goBack" 
			:style="[{top:info.top+'px',height:info.height+'px',lineHeight:info.height+'px'}]">
				<span class="back-icon" >
					<u-icon name="nav-back" color="#ffffff" :size="info.height/2+'px'"></u-icon>
				</span>
				<span class="back-text"
				:style="[{top:info.top+'px',fontSize:info.height/2+'px'}]"
				>返回</span>
			</view>
			
			<view class="header_alias_avatar">
				<view class="header_avatar">
					<image class="header_avatar_image" mode="widthFix"
					:src="avatarSrc"></image>
				</view>
				<view class="header_alias">
					{{header_alias}}
				</view>
			</view>
		</view>
        <view class="social">
			<view class="social_items"
			v-for="(socialItem,socialIndex) in socialData"
			:key="socialIndex">
				<view class="social_num">{{socialItem.num}}</view>
				<view class="social_name">{{socialItem.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
				info: {},
                avatarSrc: getApp().globalData.imgUrl+"/user/alias/alias (1).jpg", 
				header_alias: "阮菜鸡",
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
		onLoad() {
			this.info = getApp().globalData.info;
			
		},
        methods: {
            goBack(){
				uni.navigateBack();
			}
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
		.back {
			position: absolute;
			left: $padding_;
			z-index: $zindex_content;
			.back-icon{
				
			}
			.back-text {
				color: #ffffff;
				padding-left: $padding/2;
			}
		}
		.header_image{
			z-index: $zindex_bg;
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
			top: 10vh;
			left: $padding_;
			z-index: $zindex_content;
			display: flex;
			flex-direction: row;
			justify-content: left;
			align-items: center;
			.header_avatar{
				border: 2px $themeColor3 solid;
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
				.header_avatar_image{
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.header_alias{
				margin: $padding;
				color: $themeColor3;
				font-weight: bolder;
				font-size: 40rpx;
			}
		}
	}
	.social{
		border: 0;
		overflow: hidden;
		border-radius: $padding/2;
		padding: $padding;
		
		z-index: $zindex_content;
		margin: -4vh $padding_ $padding_ $padding_;
		background-color: $cardColor;
		position: relative;
		height: auto;
		
		
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);
		
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
	
</style>
