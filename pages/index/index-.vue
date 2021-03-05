<template>
<view>
	<view class="header" :style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
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
		<view class="u-tabs-box">
			<u-tabs-swiper 
			:bgColor="m_tab_bgcolor"
			activeColor="#f29100" ref="uTabs" :list="tab_list" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
		</view>

		<swiper id="swiper" :indicator-dots="false" :autoplay="false"
		 :interval="5000" :duration="500" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item item-id="0" class="item" :style="{height:scrollHeight+'px'}">
				
				<scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" :id="'project-'+projectIndex" class="card project" v-for="(projectItem,projectIndex) in index_project" :key="projectIndex">
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
						<lu-button-ripple></lu-button-ripple>

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
				</scroll-view>
				
			</swiper-item>

			<swiper-item item-id="1" class="item" :style="{height:scrollHeight+'px'}">
				<!-- <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}"> -->
				<view :id="'talent-'+talentIndex" class="card talent" v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
					<view class="talent-alias-org">
						<aliasAvatar class="talent-aliasAvatar" :alias="talentItem.alias" :avatar="talentItem.avatar" :uid="talentItem.uid"
						 :access="m_access" font_size="28rpx"></aliasAvatar>
						<org class="talent-org" :org="talentItem.org">

						</org>
					</view>

					<view class="wrapper">
						<lu-button-ripple></lu-button-ripple>
						<uni-tag-set :set="talentItem.label" class="talent-label">
						</uni-tag-set>

						<view class="talent-item-content overflow">
							{{talentItem.content}}
						</view>
					</view>
				</view>
				<!-- </scroll-view> -->
			</swiper-item>

			<swiper-item item-id="2" class="item" :style="{height:scrollHeight+'px'}">
				<!-- <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}"> -->
				<view :id="'qa-'+qaIndex" class="card qa" v-for="(qaItem, qaIndex) in index_qa" :key="qaIndex">
					<list-qa class="qa-item" :title="qaItem.title" :content="qaItem.content" :questioner="qaItem.questioner"
					 :evaluation="qaItem.evaluation">
					</list-qa>
				</view>
				<!-- </scroll-view> -->
			</swiper-item>
		</swiper>

	</view>
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

	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
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
			hoverMenu
		},

		data() {
			return {
				m_tab_bgcolor: "transparent",
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				
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
				}, ]
			}
		},
		onLoad: function() {
			// 获取胶囊位置
			var this_ = this;
			this.m_height = uni.getSystemInfoSync().windowHeight

			this.m_left = (uni.getStorageSync("left") - 26) + 'px';

			this.m_width = uni.getStorageSync("width");

			this.m_top = (uni.getStorageSync("top") - this.m_width / 2) + 'px';

			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			
			// 刷新初始数据
			// this.upCallback()
			// this.upDateScroll();
			
		},
		methods: {
			reachTop(){
				this.m_tab_bgcolor = 'transparent';
				console.log(this.m_tab_bgcolor)
			},
			reachBottom() {
				this.m_tab_bgcolor = '#ffffff';
				console.log(this.m_tab_bgcolor)
				// 此tab为空数据
				if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
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
		},
		onPageScroll: function(e) {
			if (e.scrollTop == 0) {
				this.m_header_opacity = '0000';
				this.m_header_shadow = '0000';
				this.m_header_color = '#ffffff'
			} else {
				this.m_header_opacity = 'ffff';
				this.m_header_shadow = '0020';
				this.m_header_color = '#f5f5f5'
			}
		},

	}
</script>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
</style>
