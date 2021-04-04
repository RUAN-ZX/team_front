<template>
	<view>
		<u-navbar back-text="返回"
			:title="'关键词：'+title"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5">
		</u-navbar>
		<view class="header_search_result"
		:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #00000020'}]">
		
			
			<u-tabs-swiper
				:bgColor="m_tab_bgcolor" 
				activeColor="#007aff" ref="tabs" :list="tab_list" 
				:current="current"
				@change="change" :is-scroll="false" swiperWidth="750">
			</u-tabs-swiper>
			<u-dropdown>
				<u-dropdown-item v-model="value1" title="距离" :options="option1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="温度" :options="option1"></u-dropdown-item>
			</u-dropdown>
			
			
		</view>
		
		
		<view class="wrap">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltoupper="reachTop" @scrolltolower="reachBottom">
						<view
							v-for="(projectItem,projectIndex) in index_project"
							:key="projectIndex">
							<team-project :projectItem="projectItem">
							</team-project>
						</view>
						<u-loadmore :status="loadStatus[0]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
							<team-talent :talentItem="talentItem">
							</team-talent>
						</view>
						<u-loadmore :status="loadStatus[1]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view v-for="(qaItem, qaIndex) in index_qa" :key="qaIndex">
							<team-qa :qaItem="qaItem"></team-qa>
						</view>
						<u-loadmore :status="loadStatus[2]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	var m_this;
	var globalData;
	import {
		index_data_refresh
	} from "@/api/mock.js";
	
	import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";
	import teamQa from "@/components/team-qa/team-qa.vue";
	export default {
		components: {
			teamProject,
			teamTalent,
			teamQa
		},
		data() {
			return {
				value1:1,
				value2:2,
				option1: [
					{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				title: "",
				background: {
					backgroundColor: '#007aff',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				color: {color:'#f5f5f5' },
				entry:[
					{entry:"项目圈",icon:"icon-emailChange",navigation:"/pages/index_entry/project/project"},
					{entry:"人才圈",icon:"icon-emailChange",navigation:"/pages/index_entry/talent/talent"},
					{entry:"问答圈",icon:"icon-emailChange",navigation:"/pages/index_entry/qa/qa"},
					{entry:"竞赛圈",icon:"icon-emailChange",navigation:"/pages/index_entry/contest/contest"},
					
				],
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

				index_project: [],

				index_talent: [],
				// 首先  可以选择是否展示自己头像和组织等等 有些名人需要用自己的名人效应来增加问题被回答的可能性
				// 另外  高分回答也是为了抛砖引玉 至于显示不显示回答者的头像那些 也由他们选择 默认是有的 
				// 注意  两者最好区分一下 否则会造成意义不明 到底是提问者还是回答者
				index_qa: [],
			};
		},
		onLoad(res) {
			m_this = this;
			console.log(res)
			this.title = res.key;
			
			globalData = getApp().globalData;
			let info = globalData.cap_info;

			this.m_left = (info.left - 26) + 'px';
			
			this.m_top = (info.top - info.height / 2) + 'px';

			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			
			
			this.m_header_opacity = 'ffff';
			this.m_header_shadow = '0020';
			this.m_header_color = '#F8FAFC';
			
			index_data_refresh(0,3).then(function(value){
				m_this.index_project=value;
			});
			
			index_data_refresh(1,4).then(function(value){
				m_this.index_talent=value;
			});
			index_data_refresh(2,4).then(function(value){
				m_this.index_qa=value;
			});
			
		},

		methods: {
			reachTop() {
			},
			reachBottom() {
				
				let index = [this.index_project,this.index_talent,this.index_qa];
				this.loadStatus.splice(this.current,1,"loading")
				index_data_refresh(this.current,2).then(function(value){
					index[m_this.current].push.apply(index[m_this.current],value);

					m_this.loadStatus.splice(m_this.current,1,"loadmore")
				});
				
			},
			change(index) {
				this.swiperCurrent = index;
			},
			transition({detail: {dx}}) {
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
			navigate(navigation) {
				uni.navigateTo({
					url: navigation,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	};
</script>





<style lang="scss" scoped>
	@import "@/common/uni.scss";

	.header_search_result{
		position: relative;
		background-color:$cardColor;
		// box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.14);
		width: 100vw;
		margin-bottom: 15rpx;
	}
	.wrap {
		z-index:10;
		position: relative;
		background-color: transparent;
		
		display: flex;
		flex-direction: column;
		// height: calc(100vh - var(--window-top));
		height: 78vh;
		
		width: 100%;
		
		.swiper-box {
			flex: 1;
			.swiper-item {
				height: 100%;
			}
		}
	}

	

	
</style>
