<template>
	<view>
		<view class="header"
		:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			<view class="alias-avatar" :style="[{marginTop:m_top}]">
				<aliasAvatar :width="m_left" :alias="m_alias" :avatar="m_avatar" :uid="m_uid"></aliasAvatar>
			</view>
			
			<view class="wrapper_search trans" @click="search_navigate">
				<u-search :show-action="false" clearabled="false" disabled="false" placeholder="搜索" v-model="m_search" shape="square"
				 :bg-color="m_header_color"></u-search>
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
						<view
							v-for="(projectItem,projectIndex) in index_project"
							:key="projectIndex">
							<team-project :projectItem="projectItem">
							</team-project>
						</view>
						<u-loadmore :status="loadStatus[0]" bgColor="#ECF5FE"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">

							<view v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
								<team-talent :talentItem="talentItem">
									
								</team-talent>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#ECF5FE"></u-loadmore>
						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view v-for="(qaItem, qaIndex) in index_qa" :key="qaIndex">
							<team-qa :qaItem="qaItem"></team-qa>
						</view>
						<u-loadmore :status="loadStatus[2]" bgColor="#ECF5FE"></u-loadmore>
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
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	
	import {
		index_data_refresh
	} from "@/api1/mock.js";
	
	import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";
	import teamQa from "@/components/team-qa/team-qa.vue";
	export default {
		components: {
			uniTagSet,
			aliasAvatar,
			listBtn,
			listQa,
			hoverMenu,
			teamProject,
			teamTalent,
			teamQa
		},
		data() {
			return {
				
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
				this.m_header_color = '#ffffff'
				this.m_tab_shadow = '0000'
				this.m_tab_opacity =  '0000'
				this.m_tab_bgcolor =  "transparent"
				
			} 
			else if(e.scrollTop >= 124){
				this.m_header_shadow = '0000'
				this.m_header_opacity = 'ffff';
				this.m_tab_shadow = '0020'
				this.m_tab_opacity = 'ffff'
				this.m_tab_bgcolor = "#ffffff"
			}
			else {
				this.m_header_opacity = 'ffff';
				this.m_header_shadow = '0020';
				this.m_header_color = '#F8FAFC';
				this.m_tab_shadow = '0020'
				this.m_tab_opacity = 'ffff'
				this.m_tab_bgcolor = "#ffffff"
			}
		},

		methods: {
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
		/* background-color: #ECF5FE; */
		background: linear-gradient(to bottom,  #ECF5FE 0%,#ffffff 30%);
	}
</style>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
</style>


<style lang="scss" scoped>
	$heightHeader: 120px;
	.u-tabs-box {
		z-index:99;
		top: $heightHeader;
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

	.wrap {
		margin-top: $heightHeader;
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
