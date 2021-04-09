<template>
	<view id="project" class="project" @click="click($event)">
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
		
		<view class="project-title-org">
			<view class="project-title overflow">
				{{projectItem.title}}
			</view>
			<view class="project-like">
				<r-iconBtn
					text="收藏"
					icon="heart"
					iconFill="heart-fill"
					color="#007aff"
					requestObject=""
				></r-iconBtn>
			</view>
		</view>
		
		<view class="foundation-label">
			<uni-tag-set :set="projectItem.foundation">
			</uni-tag-set>
		</view>
		
		<view class="project-talent" v-for="(ptItem,ptIndex) in projectItem.talent" :key="ptIndex">
			<view class="project-talent-name">
				{{ptItem.name}}
		
			</view>
			<view class="project-talent-demand">
				<uni-tag-set :set="ptItem.demand">
				</uni-tag-set>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import rIconBtn from "@/components/r-iconBtn/r-iconBtn.vue";
	export default {
		components:{
			uniTagSet,
			rIconBtn
		},
		props:{
			projectItem:{
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
			
		},
		methods:{
			getWaveQuery(e) {
				this.getElQuery(e).then(res => {
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
					this.$nextTick(() => {
						this.getWaveQuery(e);
					});
					
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/entity/project/project?pid='+this.projectItem.projectId,
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
					
					queryInfo = uni.createSelectorQuery().in(this);
					
					queryInfo.select("#project").boundingClientRect();
					queryInfo.exec(data => {
						resolve(data);
					});
				});
			}
		}
	}
</script>


<style scoped lang="scss">
	@import '@/common/uni.scss';
	@import '@/uview-ui/libs/css/style.components.scss';
	.u-wave-ripple {
		overflow:hidden;
		z-index: $zindex_ripple;
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
		transition: opacity 0.7s ease-in, transform 0.4s linear;
	}

	.project{
		border: 0;
		overflow: hidden;
		
		border-radius: $padding/2;
		padding: $padding/2 $padding $padding/2 $padding ;
		
		z-index: $zindex_content;
		margin: $padding;
		background-color: $cardColor;
		position: relative;
		height: auto;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);
		
		display: flex;
		flex-direction: column;
		
		
		color: $labelColor2;
		.project-title-org{
			display: flex;
			flex: 1;
			flex-direction: row;
			// justify-content: left;
			align-items: center;
			.project-title{
				font-size: $height_header*0.5;
				color: $labelColor2;
				font-weight: bolder;
				flex: 1;
			}
			.project-like{
				margin-left: $padding;
			}
			
		}
		
		.type-detail{
			height: $height_header*0.4;
			line-height: $height_header*0.4;
			font-size: $height_header*0.4;
			color: $labelColor1;
		}
		.foundation-label{
			margin-bottom: $padding/2;
		}
		
		.project-talent{
			z-index: 0;
			position: relative;
			height: auto;
			width: auto;
			padding: $padding/2;
			border: 1px solid $lineColor;
			border-radius: 10rpx;
			margin-bottom: $padding/1.5;
			display: flex;
			flex-direction: row;
			align-items: center;
			.project-talent-name{
				margin-right: $padding;
				font-size: $height_header*0.45;
				font-weight: bolder;
			}
			.project-talent-demand{
				flex: 1;
			}
		}
	}
</style>