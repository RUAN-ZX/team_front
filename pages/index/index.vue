<template>
	<view>
		<view class="header"
		:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			<view class="alias-avatar" :style="[{marginTop:m_top}]">
				<aliasAvatar :width="m_left" :alias="m_alias" :avatar="m_avatar" :uid="m_uid"></aliasAvatar>
			</view>
		
			<view class="search-bscard trans" @click="search_navigate">
				<u-search :show-action="false" clearabled="false" disabled="false" placeholder="搜索" v-model="m_search" shape="square"
				 :bg-color="m_header_color">
				</u-search>
			</view>
		
			<view class="header_point">
				<view class="header_point_left">
					<span class="iconfont div-left-icon">
						<u-icon name="tags"></u-icon>
					</span>
					<span class="div-left-text">竞赛一揽</span>
				</view>
				<view class="header_point_middle">
					<span class="div-middle-icon">
						<u-icon name="bell"></u-icon>
					</span>
					<span class="div-middle-text">未读消息</span>
					<span class="div-middle-red-dot" :style="{display:(m_header_middle_msg==0?'none':'inline-block')}">
						{{m_header_middle_msg}}
					</span>
				</view>
				<view class="header_point_right">
					<span class="div-right-icon">
						<u-icon name="scan"></u-icon>
					</span>
				</view>
			</view>
		</view>
		<view class="wrap">
			<view class="panel"></view>
			<view class="u-tabs-box"
			:style="[{backgroundColor:'#ffff'+m_tab_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow}]">
				<u-tabs-swiper :bgColor="m_tab_bgcolor" activeColor="#298FFE" ref="tabs" :list="tab_list" :current="current"
				 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltoupper="reachTop" @scrolltolower="reachBottom">
						<view>
							<view 
								class="card project" 
								v-for="(projectItem,projectIndex) in index_project"
								:key="projectIndex"
								@click="click($event)"
								:id="'project-'+projectIndex" 
								 >
							
							
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
										<view class="project-org">
											<org :org="projectItem.org">
											</org>
										</view>

									</view>
									<view class="type-detail">
										{{projectItem.type+projectItem.type_detail}}
									</view>
									<uni-tag-set class="foundation-label" :set="projectItem.foundation">
									</uni-tag-set>
									<view class="project-talent" v-for="(ptItem,ptIndex) in projectItem.talent" :key="ptIndex">
										<view class="project-talent-name">
											<span class="project-talent-name-num">
												{{ptItem.name}}
												<span class="project-talent-num">
													{{ptItem.num}}
												</span>
												人
											</span>

										</view>
										<uni-tag-set class="project-talent-demand" :set="ptItem.demand">
										</uni-tag-set>
									</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view :id="'talent-'+talentIndex" class="card talent" v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
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
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view :id="'qa-'+qaIndex" class="card qa" v-for="(qaItem, qaIndex) in index_qa" :key="qaIndex">
								<list-qa class="qa-item" :title="qaItem.title" :content="qaItem.content" :questioner="qaItem.questioner"
								 :evaluation="qaItem.evaluation">
								</list-qa>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>

						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import hoverMenu from '../../components/hoverMenu/hoverMenu.vue'
	import listQa from '../../components/listQa/listQa.vue'
	import listBtn from '@/components/listBtn/listBtn.vue'
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	import org from '@/components/org/org.vue';
	import ripple from "@/components/ripple.vue";
	import {
		index_data_refresh
	} from "@/api1/mock.js"
	export default {
		components: {
			uniTagSet,
			aliasAvatar,
			org,
			luButtonRipple,
			listBtn,
			listQa,
			hoverMenu,
			ripple
		},
		data() {
			return {
				rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
				rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
				fields: {}, // 波纹按钮节点信息
				waveActive: false, // 激活水波纹
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

				m_height: "100px",
				scrollHeight: 0,

				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tab_list: [{
					name: '项目圈',
					num: 1
				}, {
					name: '人才圈',
					num: 1
				}, {
					name: '问答圈',
					num: 1
				}],
				m_search: "",
				m_alias: 'RyanAlexander',
				m_avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
				m_top: 0,
				m_width: 0,
				m_left: 0,
				m_height_header: 30,
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_tab_shadow: '0000',
				m_tab_opacity: '0000',
				m_tab_bgcolor: "transparent",
				m_header_color: '#ffffff',
				m_header_middle_msg: 9,

				m_uid: 0,
				m_access: '',
				m_news_navigate: '/pages/news/news?',

				index_project: [{
					projectId: "000000", //方便跳转到详情页
					title: "基于树莓派及深度学习的情绪感知调节系统",
					org: "极客实验室",
					type: "比赛项目",
					type_detail: ["大创", "省新苗", "电商"],
					foundation: ["软著1篇", "专利3篇", "多项省奖"],
					//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
					// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
					talent: [{
							name: "前端",
							num: "3",
							demand: ["有h5基础", "会写文档", "会使用Vue"],
							//  可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						},
						{
							name: "后端",
							num: "1",
							demand: ["java web", "服务器部署", "nginx"],
							// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						}
					]
				}, ],

				index_talent: [{
					tid: "000000",
					talent: {
						uid: '000000',
						alias: '姚懿',
						avatar: 'alias (1).jpg'
					},
					label: ["java后端", "java", "大数据", "运维", "容器"],
					org: '杭州字节云网络科技有限公司',
					content: "燕子一般指燕。燕（Swallow）是雀形目燕科74种鸟类的统称。形小，翅尖窄，凹尾短喙，足弱小，羽毛不算太多。羽衣单色，或有带金属光泽的蓝或绿色；大多数种类两性都很相似。燕子消耗大量时间在空中捕捉害虫，是最灵活的雀形类之一，主要以蚊、蝇等昆虫为主食"
				}, ],
				// 首先  可以选择是否展示自己头像和组织等等 有些名人需要用自己的名人效应来增加问题被回答的可能性
				// 另外  高分回答也是为了抛砖引玉 至于显示不显示回答者的头像那些 也由他们选择 默认是有的 
				// 注意  两者最好区分一下 否则会造成意义不明 到底是提问者还是回答者
				index_qa: [{
					title: '为什么真正有落地能力的项目往往不受评委欣赏?',
					qaid: '000000',
					content: "很容易发现，往往评选出来的项目华而不实，真正落地的很少，而实际上能够赢利的往往评委看不上，各位大佬怎么说？",
					questioner: {
						alias: 'sst',
						avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
						uid: '000000',
						org: '杭电324',
					},
					evaluation: {
						viewed: 10001,
						answer: 20,
						like: 302,
						comment: 670
					}
				}],
				m_tab_bgcolor: "transparent",
				orderList: [
					[],
					[],
					[],
					[]
				],
				
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			var this_ = this;
			this.m_height = uni.getSystemInfoSync().windowHeight

			this.m_left = (uni.getStorageSync("left") - 26) + 'px';

			this.m_width = uni.getStorageSync("width");

			this.m_top = (uni.getStorageSync("top") - this.m_width / 2) + 'px';

			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			index_data_refresh(0,2).then(function(value){
				this_.index_project=value;
			});
			
			index_data_refresh(1,4).then(function(value){
				this_.index_talent=value;
			});
			index_data_refresh(2,4).then(function(value){
				this_.index_qa=value;
			});
			
			// this.getOrderList(0);
			// this.getOrderList(1);
			// this.getOrderList(3);
		},
		onPageScroll: function(e) {
			console.log(e.scrollTop)
			
			if (e.scrollTop == 0) {
				this.m_header_shadow = '0000'
				this.m_header_opacity = '0000'
				this.m_tab_shadow = '0000'
				this.m_tab_opacity =  '0000'
				this.m_tab_bgcolor =  "transparent"
				this.m_header_color = '#ffffff'
			} 
			else if(e.scrollTop == 180){
				this.m_header_shadow = '0000'
				this.m_header_opacity = 'ffff';
				this.m_tab_shadow = '0020'
				this.m_tab_opacity = 'ffff'
				this.m_tab_bgcolor = "#ffffff"
			}
			else {
				this.m_header_opacity = 'ffff';
				this.m_header_shadow = '0020';
				this.m_header_color = '#f5f5f5';
			}
		},

		methods: {
			// 查询按钮的节点信息
			getWaveQuery(e) {
				this.getElQuery(e).then(res => {
					// console.log(res)
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
			// 获取节点信息
			getElQuery(e) {
				return new Promise(resolve => {
					let queryInfo = '';
					// 获取元素节点信息，请查看uniapp相关文档
					// https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
					queryInfo = uni.createSelectorQuery().in(this);
					
					queryInfo.select("#"+e.currentTarget.id).boundingClientRect();
					queryInfo.exec(data => {
						resolve(data);
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
							url: '/pages/search/search',
							animationType: 'fade-in',
							animationDuration: 300
						});
					}, 300);
					
				}, this.throttleTime);
			},
			reachTop() {
				// this.m_tab_bgcolor = 'transparent';
				// console.log(this.m_tab_bgcolor)
			},
			reachBottom() {
				// this.m_tab_bgcolor = '#ffffff';
				// console.log(this.m_tab_bgcolor)
				// 此tab为空数据
				// if (this.current != 2) {
				// 	this.loadStatus.splice(this.current, 1, "loading")
					
				// }
				let this_ = this;
				let index = [this.index_project,this.index_talent,this.index_qa];
				this.loadStatus.splice(this.current,1,"loading")
				index_data_refresh(this.current,2).then(function(value){
					index[this_.current].push.apply(index[this_.current],value);
					console.log(index[this_.current])
					console.log(this_.current)
					this_.loadStatus.splice(this_.current,1,"loadmore")
				});
				
			},
			
			// swiper-item左右移动，通知tabs的滑块跟随移动

			// transition(e) {
			// 	let dx = e.detail.dx;
			// 	this.$refs.uTabs.setDx(dx);
			// },

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// this.current = index;
				// 这个不能加 否则有bug
				
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			search_navigate() {
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}


		}
	};
</script>

<style>
	page {
		height: 100vh;
		background: linear-gradient(to bottom,  #ECF5FE 0%,#ffffff 20%);
	}
</style>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
</style>

<style scoped lang="scss">
@import '@/uview-ui/libs/css/style.components.scss';
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
	
	&--bold-border {
		border: 1px solid #ffffff;
	}
	
	&--default {
		color: $u-content-color;
		border-color: #c0c4cc;
		background-color: #ffffff;
	}
	
	&--primary {
		color: #ffffff;
		border-color: $u-type-primary;
		background-color: $u-type-primary;
	}
	
	&--success {
		color: #ffffff;
		border-color: $u-type-success;
		background-color: $u-type-success;
	}
	
	&--error {
		color: #ffffff;
		border-color: $u-type-error;
		background-color: $u-type-error;
	}
	
	&--warning {
		color: #ffffff;
		border-color: $u-type-warning;
		background-color: $u-type-warning;
	}
	
	&--default--disabled {
		color: #ffffff;
		border-color: #e4e7ed;
		background-color: #ffffff;
	}
	
	&--primary--disabled {
		color: #ffffff!important;
		border-color: $u-type-primary-disabled!important;
		background-color: $u-type-primary-disabled!important;
	}
	
	&--success--disabled {
		color: #ffffff!important;
		border-color: $u-type-success-disabled!important;
		background-color: $u-type-success-disabled!important;
	}
	
	&--error--disabled {
		color: #ffffff!important;
		border-color: $u-type-error-disabled!important;
		background-color: $u-type-error-disabled!important;
	}
	
	&--warning--disabled {
		color: #ffffff!important;
		border-color: $u-type-warning-disabled!important;
		background-color: $u-type-warning-disabled!important;
	}
	
	&--primary--plain {
		color: $u-type-primary!important;
		border-color: $u-type-primary-disabled!important;
		background-color: $u-type-primary-light!important;
	}
	
	&--success--plain {
		color: $u-type-success!important;
		border-color: $u-type-success-disabled!important;
		background-color: $u-type-success-light!important;
	}
	
	&--error--plain {
		color: $u-type-error!important;
		border-color: $u-type-error-disabled!important;
		background-color: $u-type-error-light!important;
	}
	
	&--warning--plain {
		color: $u-type-warning!important;
		border-color: $u-type-warning-disabled!important;
		background-color: $u-type-warning-light!important;
	}
}

.u-hairline-border:after {
	content: ' ';
	position: absolute;
	pointer-events: none;
	// 设置为border-box，意味着下面的scale缩小为0.5，实际上缩小的是伪元素的内容（border-box意味着内容不含border）
	box-sizing: border-box;
	// 中心点作为变形(scale())的原点
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	left: 0;
	top: 0;
	width: 199.8%;
	height: 199.7%;
	-webkit-transform: scale(0.5, 0.5);
	transform: scale(0.5, 0.5);
	border: 1px solid currentColor;
	z-index: 1;
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
	transition: opacity 1s linear, transform 0.4s linear;
}

.u-round-circle {
	border-radius: 100rpx;
}

.u-round-circle::after {
	border-radius: 100rpx;
}

.u-loading::after {
	background-color: hsla(0, 0%, 100%, 0.35);
}

.u-size-default {
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}

.u-size-medium {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	width: auto;
	font-size: 26rpx;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 80rpx;
}

.u-size-mini {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	width: auto;
	font-size: 22rpx;
	padding-top: 1px;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 20rpx;
}

.u-primary-plain-hover {
	color: #ffffff !important;
	background: $u-type-primary-dark !important;
}

.u-default-plain-hover {
	color: $u-type-primary-dark !important;
	background: $u-type-primary-light !important;
}

.u-success-plain-hover {
	color: #ffffff !important;
	background: $u-type-success-dark !important;
}

.u-warning-plain-hover {
	color: #ffffff !important;
	background: $u-type-warning-dark !important;
}

.u-error-plain-hover {
	color: #ffffff !important;
	background: $u-type-error-dark !important;
}

.u-info-plain-hover {
	color: #ffffff !important;
	background: $u-type-info-dark !important;
}

.u-default-hover {
	color: $u-type-primary-dark !important;
	border-color: $u-type-primary-dark !important;
	background-color: $u-type-primary-light !important;
}

.u-primary-hover {
	background: $u-type-primary-dark !important;
	color: #fff;
}

.u-success-hover {
	background: $u-type-success-dark !important;
	color: #fff;
}

.u-info-hover {
	background: $u-type-info-dark !important;
	color: #fff;
}

.u-warning-hover {
	background: $u-type-warning-dark !important;
	color: #fff;
}

.u-error-hover {
	background: $u-type-error-dark !important;
	color: #fff;
}
</style>

<style lang="scss" scoped>
	.u-tabs-box {
		z-index:99;
		top: 160px;
		width: 100vw;
		/* #ifndef APP-PLUS-NVUE */
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		margin-top: 180px;
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
