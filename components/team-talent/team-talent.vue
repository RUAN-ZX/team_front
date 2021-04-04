<template>
	<view id="talent" class="talent" @click="click($event)">
		<view
			class="u-wave-ripple"
			:class="[waveActive ? 'u-wave-active' : '']"
			:style="{
				top: rippleTop + 'px',
				left: rippleLeft + 'px',
				width: fields.targetWidth + 'px',
				height: fields.targetWidth + 'px',
				backgroundColor: 'rgba(0, 0, 0, 0.10)'
			}"
		></view>
		<view class="talent-alias-org">
			<aliasAvatar class="talent-aliasAvatar" :alias="talentItem.alias" :avatar="talentItem.avatar" :uid="talentItem.uid"
			 :access="m_access" font_size="28rpx"></aliasAvatar>
			<org class="talent-org" :org="talentItem.org">
		
			</org>
		</view>
		
		<view class="wrapper">
			
			<uni-tag-set :set="talentItem.label" class="talent-label">
			</uni-tag-set>
		
			<view class="talent-item-content overflow">
				{{talentItem.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import org from '@/components/org/org.vue';
	var m_this;
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	export default {
		components:{
			aliasAvatar,
			org,
			uniTagSet
		},
		props:{
			talentItem:{
				type: Object,
				default: function(){
					return {}
				}
			},
		},
		data() {
			return {
				rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
				rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
				fields: {}, // 波纹按钮节点信息
				waveActive: false, // 激活水波纹
			};
		},
		created() {
			m_this = this;
		},
		methods:{
			getWaveQuery(e) {
				this.getElQuery(e).then(res => {
					console.log(res)
					// 查询返回的是一个数组节点
					let data = res[0];
					// 查询不到节点信息，不操作
					if (!data.width || !data.width) return;
					// 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
					// 最终的方形（变换后的圆形）才能覆盖整个按钮
					data.targetWidth = data.height > data.width ? data.height : data.width;
					if (!data.targetWidth) return;
					this.fields = data;
					let touchesX = '',
						touchesY = '';
					// #ifdef MP-BAIDU
					touchesX = e.changedTouches[0].clientX;
					touchesY = e.changedTouches[0].clientY;
					// #endif
					// #ifdef MP-ALIPAY
					touchesX = e.detail.clientX;
					touchesY = e.detail.clientY;
					// #endif
					// #ifndef MP-BAIDU || MP-ALIPAY
					touchesX = e.touches[0].clientX;
					touchesY = e.touches[0].clientY;
					// #endif
					// 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
					// 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
					// 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
					this.rippleTop = touchesY - data.top - data.targetWidth / 2;
					this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
					this.$nextTick(() => {
						this.waveActive = true;
					});
				});
			},
			click(e) {
				// 进行节流控制，每this.throttle毫秒内，只在开始处执行
				this.$u.throttle(() => {
					this.waveActive = false;
					this.$nextTick(function() {
						this.getWaveQuery(e);
					});
					this.$emit('click', e);
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/entity/talent/talent?pid='+m_this.talentItem.talentId,
							animationType: 'fade-in',
							animationDuration: 300
						});
					}, 300);
					
				}, 1000);
			},
			// 获取节点信息
			getElQuery(e) {
				return new Promise(resolve => {
					let queryInfo = '';
					// 获取元素节点信息，请查看uniapp相关文档
					// https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
					queryInfo = uni.createSelectorQuery().in(this);
					
					queryInfo.select("#talent").boundingClientRect();
					queryInfo.exec(data => {
						console.log(data)
						resolve(data);
					});
				});
			},
		}
	}
</script>


<style scoped lang="scss">
@import '@/uview-ui/libs/css/style.components.scss';
@import "@/common/uni.scss";
.talent{
	border: 0;
	//border-radius: 10rpx;
	overflow: hidden;
	// box-sizing: border-box;
	// transition: all 0.15s;
	
	padding: $padding/2;
	z-index: 1;
	margin: $padding;
	background-color: $cardColor;
	position: relative;
	height: auto;// 根据内容自适应高度
	min-height: 200rpx;
	box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);
	
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid $lineColor;
	
	.talent-alias-org{
		height: $height_header;
		display: flex;
		flex-direction: row;
		z-index:2;
		.talent-aliasAvatar{
			flex: 2;
			
			
		}
		.talent-org{
			flex: 3;
			display: inline-block;
			text-align: middle;
		}
	}
	.wrapper{
		// position: relative;
		.talent-label{
			
		}
		
		.talent-item-content{
			margin: $padding/2 0;
			color: $labelColor2;
			border: none;
			font-size: $height_header*0.4;
			-webkit-line-clamp: 2;
		}
	}
}

.u-btn::after {
	border: none;
}

.u-btn {
	position: relative;
	border: 0;
	//border-radius: 10rpx;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	// 避免边框某些场景可能被“裁剪”，不能设置为hidden
	overflow: visible;
	line-height: 1;
	@include vue-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0 40rpx;
	z-index: 1;
	box-sizing: border-box;
	transition: all 0.15s;
}

.u-wave-ripple {
	overflow:hidden;
	z-index: 0;
	position: absolute;
	border-radius: 100%;
	background-clip: padding-box;
	pointer-events: none;
	user-select: none;
	transform: scale(0);
	opacity: 1;
	transform-origin: center;
}

.u-wave-ripple.u-wave-active {
	opacity: 0;
	transform: scale(2);
	transition: opacity 0.7s linear, transform 0.4s linear;
}


</style>