<template>
	<view id="qa" class="qa" @click="click($event)">
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
		
		<view class="title">
			<view class="title_text overflow">{{qaItem.title}}</view>
			<view class="iconBtn">
				<r-iconBtn
					text="收藏"
					icon="heart"
					iconFill="heart-fill"
					color="#007aff"
					requestObject=""
				></r-iconBtn>
			</view>
		</view>
		<view class="alias-avatar-org">
			<r-alias-mini
				:alias="qaItem.questioner.alias"
				:avatar="qaItem.questioner.avatar"
				:uid="qaItem.questioner.uid"
				:certification="qaItem.questioner.certification">
			></r-alias-mini>
		</view>
		<view class="content">
			{{qaItem.content}}
		</view>
		<view class="evaluation">
			<span class="viewed margin">
				{{qaItem.evaluation.viewed}}浏览
			</span>
			<span class="answer margin">
				{{qaItem.evaluation.answer}}回答
			</span>
			<span class="like margin">
				{{qaItem.evaluation.like}}赞同
			</span>
			<span class="comment margin">
				{{qaItem.evaluation.comment}}评论
			</span>
			<!-- 1.3w浏览 100回答 100赞同 100评论-->
			
		</view>
	</view>
</template>

<script>
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	
	export default {
		components:{
			uniTagSet
		},
		props:{
			qaItem:{
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
			for (var i in this.qaItem.evaluation) { //for in 会遍历对象的属性，包括实例中和原型中的属性。（需要可访问，可枚举属性）
			    this.qaItem.evaluation[i] = this.transNum(this.qaItem.evaluation[i]);
			}
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
					// this.$emit('click', e);
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/entity/qa/qa?pid='+this.qaItem.qaId,
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
					
					queryInfo.select("#qa").boundingClientRect();
					queryInfo.exec(data => {
						resolve(data);
					});
				});
			},
			transNum:function(num){
				if(num>10000) return Math.round(num/10000)+'w'
				else return num;
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

	.qa{
		border: 0;
		overflow: hidden;
		position: relative; //必须要有
		padding: $padding;
		z-index: $zindex_content;
		height: auto;
		margin: $padding;
		background-color: $cardColor;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);

		border-radius: $padding/2;
		display: flex;
		flex-direction: column;
		color: $labelColor2;
		
		.title{
			display: flex;
			flex-direction: row;
			justify-content: left;
			align-items: center;
			.title_text{
				flex: 1;
				font-size: $height_header*0.5;
				font-weight: bolder;
			}
			.iconBtn{
				margin-left: $padding;
				width: auto;
			}
		}
		.alias-avatar-org{
			
		}
		.content{
			margin-top: $padding/2;
			color: $labelColor2;
			border: none;
			font-size: $height_header*0.4;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.evaluation{
			margin-top: $padding/2;
			white-space: pre;
			color: $labelColor;
			font-size: $height_header*0.4;
			.margin{
				margin-right: $padding/2;
			}
		}
	}
</style>