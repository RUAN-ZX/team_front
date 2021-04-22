<template>
	<view>
		<r-float :imgLists="imgLists"></r-float>
		<view class="header">
			
			<view class="wrapper_search trans" 
				@click="navigate('/pages/search/index_search/index_search?e=10')"
				:style="[{marginTop:info.top+'px'},{width:info.left-26+'px'}]">
				<search :show-action="false" 
					clearabled="false" disabled="false" 
					placeholder="搜索"
					shape="round"
					:height="info.height+'px'">
				</search>
			</view>
			
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#007aff" ref="tabs" :list="tab_list" :current="current"
				 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>
		
		<view class="wrap" id="target" 
			:style="{marginTop:info.bottom+100/info.ratio+10+'px',height: info.windowHeight+'px'}">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view :style="[{marginTop: '20px'}]"></view>
						<u-button type="primary" @click="navigate('/pages/im/dialog/dialog?userId=11')">Dialog</u-button>
						
						<u-loadmore :status="loadStatus[0]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						
						<u-loadmore :status="loadStatus[1]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						
						<u-loadmore :status="loadStatus[2]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
			</swiper>
			
		</view>
	</view>
</template>

<script>
	import {
		index_data_refresh
	} from "@/api/api.js";
	import float from "@/components/r-float/r-float.vue";
	import search from "@/components/search/search.vue";
	import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";
	import teamQa from "@/components/team-qa/team-qa.vue";
	export default {
		components: {
			teamProject,
			teamTalent,
			teamQa,
			float,
			search
		},
		data() {
			return {
				imgLists:[
					"https://stea.ryanalexander.cn/float/0.png",
					"https://stea.ryanalexander.cn/float/1.png",
					"https://stea.ryanalexander.cn/float/2.png",
					"https://stea.ryanalexander.cn/float/3.png",
					"https://stea.ryanalexander.cn/float/4.png",
					"https://stea.ryanalexander.cn/float/5.png",
				],
				title_text_class: ["title_text_selected","title_text_unselected"],
				scrollTop: "0px",
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tab_list: [{
					name: '通知',
					num: 1
				}, {
					name: '交流',
					num: 2
				}],
				
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
			this.info = getApp().globalData.info;
			
			// index_data_refresh(0,4).then((value)=>{
			// 	this.index_project=value;
			// });
		},
		
		methods: {
			changeTitle(code){
				this.title_text_class = ["title_text_unselected","title_text_unselected"];
				this.title_text_class[code] = "title_text_selected";
			},
			reachTop() {
			},
			reachBottom() {
				
				let index = [this.index_project,this.index_talent,this.index_qa];
				this.loadStatus.splice(this.current,1,"loading")
				index_data_refresh(this.current,2).then((value)=>{
					index[this.current].push.apply(index[this.current],value);

					this.loadStatus.splice(this.current,1,"loadmore")
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
		background-color: $cardColor;
		// box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.14);
		z-index: 4;
		padding-left: $padding;
		// padding-bottom: $padding;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		text-align: left;
		
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		
		height: auto;
		.wrapper_search{
			position: relative;
			opacity: 1;
			width: 100%;
		}
		.wrapper_search:active{
			opacity: 0.1;
		}
		.u-tabs-box {
			margin-top: 20rpx;
			
			background-color: $cardColor;
			z-index:2;
			width: 100vw;
			position: relative;
		}
		
	}
	
	.wrap {
		// scrollTop?
		position: relative;
		background-color: $cardColor;
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.swiper-box {
			flex: 1;
			.swiper-item {
				height: 100%;
			}
		}
	}
</style>
