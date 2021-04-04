<template>
	<view>
		<u-navbar back-text="返回"
			title="人才圈"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5">
			<view class="wrapper_search trans"
				@click="navigate('/pages/search/search')">
				<u-search :show-action="false" 
					clearabled="false" disabled="false" 
					placeholder="人才圈搜索"
					v-model="m_search" shape="round"
					bg-color="#f5f5f5">
				</u-search>
			</view>
		</u-navbar>
		<view class="header_search_result boxShadow">
			<u-dropdown>
				<u-dropdown-item v-model="value1" title="距离" :options="option1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="温度" :options="option1"></u-dropdown-item>
			</u-dropdown>
		</view>
		
		
		<view class="wrap">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
				<view v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
					<team-talent :talentItem="talentItem">
					</team-talent>
				</view>
				<u-loadmore :status="loadStatus" bgColor="transparent"></u-loadmore>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var m_this;
	var globalData;
	import {
		index_data_refresh
	} from "@/api/mock.js";
	
	// import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";

	export default {
		components: {
			teamTalent,
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
				background: {
					backgroundColor: '#007aff',
				},
				color: {color:'#f5f5f5' },
				loadStatus: 'loadmore',
				
				index_talent: []
			};
		},
		onLoad(res) {
			m_this = this;
			// console.log(res)
			
			globalData = getApp().globalData;
			
			index_data_refresh(1,5).then(function(value){
				m_this.index_talent=value;
			});
		},
		methods: {
			reachTop() {
				
			},
			reachBottom() {
				m_this.loadStatus="loading";
				index_data_refresh(1,3).then(function(value){
					m_this.index_talent.push.apply(m_this.index_talent,value);
					m_this.loadStatus="";
				});
				
			},
			change(index) {
				
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
		width: 100vw;
		margin-bottom: 15rpx;
	}
	.wrap {
		z-index:10;
		position: relative;
		background-color: transparent;
		
		display: flex;
		flex-direction: column;
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
