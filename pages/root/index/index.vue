<template>
	<view>
		<view class="header"
		:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			
			<view class="wrapper_search trans" 
				@click="navigate('/pages/search/index_search/index_search?e=10')"
				:style="[{marginTop:info.top+'px'},{width:info.left-26+'px'}]">
				<search :show-action="false" 
					clearabled="false" disabled="false" 
					placeholder="搜索" 
					v-model="m_search" shape="round"
					:bg-color="m_header_color"
					:height="info.height+'px'">
				</search>
			</view>
		</view>
		<view :style="{marginTop: info.top+info.height+20+'px'}">
			<u-swiper
				
				:list="swiperList" mode="round"
				:effect3d="true"
				:title="true"
				duration="1000" :circular="true" :autoplay="true"
			>	
			</u-swiper>
		</view>
		
		<view class="wrap" id="target"
		:style="{height: scrollTop}">
			<view class="wrap_title">
				<view :class="title_text_class[0]" @click="changeTitle(0)">
					精选
				</view>
				<view :class="title_text_class[1]" @click="changeTitle(1)">
					最新
				</view>
			</view>
			
			<view class="u-tabs-box" 
			:style="[{backgroundColor:'#ffff'+m_tab_opacity},
			{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow},
			{top: info.top+info.height+10+'px'}]">
				
				<u-tabs-swiper :bgColor="m_tab_bgcolor" activeColor="#007aff" ref="tabs" :list="tab_list" :current="current"
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
	
	import {
		index_data_refresh
	} from "@/api/mock.js";
	
	import search from "@/components/search/search.vue";
	import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";
	import teamQa from "@/components/team-qa/team-qa.vue";
	export default {
		components: {
			teamProject,
			teamTalent,
			teamQa,
			search
		},
		data() {
			return {
				swiperList: [{
						image: 'https://stea.ryanalexander.cn/psl/hdu1.jpg',
						title: '以清养廉，以廉育人'
					},
					{
						image: 'https://stea.ryanalexander.cn/psl/hdu2.jpg',
						title: '与祖国同行，与科学共进'
					},
					{
						image: 'https://stea.ryanalexander.cn/psl/hdu3.jpg',
						title: '不忘初心，牢记使命'
					}
				],
				title_text_class: ["title_text_selected","title_text_unselected"],
				scrollTop: "0px",
				entry:[
					{entry:"项目圈",icon:"icon-emailChange",navigation:"/pages/index_entry/project/project"},
					{entry:"人才圈",icon:"icon-emailChange",navigation:"/pages/index_entry/talent/talent"},
					{entry:"问答圈",icon:"icon-emailChange",navigation:"/pages/index_entry/qa/qa"},
					{entry:"经验圈",icon:"icon-emailChange",navigation:"/pages/index_entry/experience/experience"},
					
					
				],
				imgLists:[
					"https://stea.ryanalexander.cn/release/0.png",
					"https://stea.ryanalexander.cn/release/1.png",
					"https://stea.ryanalexander.cn/release/2.png",
					"https://stea.ryanalexander.cn/release/3.png",
					"https://stea.ryanalexander.cn/release/4.png",
					"https://stea.ryanalexander.cn/release/5.png",
				],
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

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
				
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_tab_shadow: '0000',
				m_tab_opacity: '0000',
				m_tab_bgcolor: "transparent",
				m_header_color: '#ffffff',
				m_header_middle_msg: 9,

				m_news_navigate: '/pages/news/news?',

				index_project: [],

				index_talent: [],
				// 首先  可以选择是否展示自己头像和组织等等 有些名人需要用自己的名人效应来增加问题被回答的可能性
				// 另外  高分回答也是为了抛砖引玉 至于显示不显示回答者的头像那些 也由他们选择 默认是有的 
				// 注意  两者最好区分一下 否则会造成意义不明 到底是提问者还是回答者
				index_qa: [],
				info: {}
			};
		},
		onLoad() {
			m_this = this;
			this.info = getApp().globalData.info;
			
			index_data_refresh(0,3).then(function(value){
				m_this.index_project=value;
			});
			
			index_data_refresh(1,4).then(function(value){
				m_this.index_talent=value;
			});
			index_data_refresh(2,4).then(function(value){
				m_this.index_qa=value;
			});
			
			this.getHeight();
			
		},
		
		onPageScroll: function(e) {
			this.getHeight();
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
			changeTitle(code){
				this.title_text_class = ["title_text_unselected","title_text_unselected"];
				this.title_text_class[code] = "title_text_selected";
			},
			getHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#target').boundingClientRect(data => {
					// console.log(data.top)
					// console.log(m_this.info.windowHeight);
					m_this.scrollTop = m_this.info.windowHeight-data.top+'px';
				}).exec();
				// m_this.scrollTop = "600px"
				
				
			},
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
			animationfinish({detail: {current}}) {
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
<style>
	page {
		height: calc(200vh);
		background: linear-gradient(to bottom,  #ECF5FE 0%,#ffffff 70%);
	}
</style>
<style lang="scss" scoped>
	@import "@/common/uni.scss";

	// $heightHeader: 200rpx;
	.header {
		z-index: 4;
		padding-left: $padding;
		padding-bottom: $padding;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		text-align: left;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		
		.wrapper_search{
			opacity: 1;
			width: 100%;
		}
		.wrapper_search:active{
			opacity: 0.1;
		}
	
	}
	
	
	.panel{
		margin: 0 $padding $padding $padding;
		
		position: relative;
		padding: $variableGap 0 $variableGap 0;
		
		flex-direction: row;
		display: flex;
		justify-content: space-around;
		align-items: center; // 交叉轴居中对齐！
		.entry{
			display: flex;
			flex-direction: column;
			align-content: center;
			.entry_icon{
				font-size: 100rpx;
				color: $themeColor;
			}
			.entry{
				color: $labelColor2;
				text-align: center;
				line-height: 40rpx;
				font-size: 26rpx;
				height: 40rpx;
			}
		}
		.entry:active{
			opacity: 0.1;
		}
		
	}
	
	
	.wrap {
		background-color: $cardColor;
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.wrap_title{
			
			margin-left: $padding;
			margin-top: $padding;
			font-weight: bolder;
			
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 20vw;
			.title_text_unselected{
				// flex: 1;
				font-weight: normal;
				color: $labelColor;
				font-size: 30rpx;
			}
			.title_text_selected{
				// flex: 1;
				font-weight: bolder;
				color: $labelColor2;
				font-size: 35rpx;
			}
		}
		.u-tabs-box {
			z-index:2;
			width: 100vw;
			position: sticky;
			
		}
		.swiper-box {
			flex: 1;
			.swiper-item {
				height: 100%;
			}
		}
	}
</style>
