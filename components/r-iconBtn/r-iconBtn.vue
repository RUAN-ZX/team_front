<template>
	<view class="iconBtn" @click="iconClick()">
		<span class="icon"><u-icon :name="m_icon" :color="m_color"></u-icon></span>
		<span :class="'title '+m_style">{{text}}</span>
	</view>
</template>

<script>
	export default {
		name:"r-iconBtn",
		props:{
			text:{
				type: String,
				default: "收藏"
			},
			iconOn:{
				type: String,
				default: "heart-fill"
			},
			iconOff:{
				type: String,
				default: "heart"
			},
			requestObject:{
				type: Object,
				default: function(){
					return {}
				}
			},
			colorOn:{
				type: String,
				default: "#007aff"
			},
			colorOff:{
				type: String,
				default: "#afafaf"
			}
			
		},
		data() {
			return {
				toggle: false,
				m_icon: "heart",
				m_color: "#afafaf",
				m_style: "off"
			};
		},
		methods:{
			iconClick(){
				this.$u.throttle(() => {
					this.toggle = !this.toggle;
					if(this.toggle){
						this.m_icon = this.iconOn;
						this.m_color = this.colorOn;
						this.m_style = "on";
						// m_this.request()
					} 
					else{
						this.m_icon = this.iconOff;
						this.m_color = this.colorOff;
						this.m_style = "off";
						// m_this.request()
					} 
					
				}, 300);
				
			},
			request(){
				uni.request({
					url: this.requestObject.url
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	.iconBtn{
		margin: $padding/3;
		.icon{
			margin-right: $padding/3;
		}
		.title{
			font-size: 30rpx;
		}
		.on{
			color: $themeColor;
		}
		.off{
			color: $labelColor;
		}
	}
	
</style>
