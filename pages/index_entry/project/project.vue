<template>
	<view>
		<u-navbar back-text="返回"
			title="项目圈"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5">
			
			<view class="wrapper_search trans"
				@click="navigate('/pages/search/search')">
				<u-search :show-action="false" 
					clearabled="false" disabled="false" 
					placeholder="项目圈搜索"
					v-model="m_search" shape="round"
					bg-color="#f5f5f5">
				</u-search>
			</view>
		</u-navbar>
		<view class="header_search_result boxShadow">
			
			<u-popup v-model="popup_show" mode="right" length="60%">
				<view>
					骊山语罢清宵半，泪雨霖铃终不怨
				</view>
			</u-popup>

			<r-dropdown>
				<u-dropdown-item v-model="value1" title="距离" :options="option1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="温度" :options="option1"></u-dropdown-item>
			</r-dropdown>
		</view>
		
		
		<view class="wrap">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltoupper="reachTop" @scrolltolower="reachBottom">
				<view
					v-for="(projectItem,projectIndex) in index_project"
					:key="projectIndex">
					<team-project :projectItem="projectItem">
					</team-project>
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
	
	import teamProject from "@/components/team-project/team-project.vue";
	import rDropdown from "@/components/r-dropdown/r-dropdown.vue";
	export default {
		components: {
			teamProject,
			rDropdown
		},
		data() {
			return {
				popup_show: false,
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
				
				index_project: []
			};
		},
		onLoad(res) {
			m_this = this;
			// console.log(res)
			
			globalData = getApp().globalData;
			
			index_data_refresh(0,3).then(function(value){
				m_this.index_project=value;
			});
		},
		methods: {
			reachTop() {
				
			},
			reachBottom() {
				m_this.loadStatus="loading";
				index_data_refresh(0,2).then(function(value){
					m_this.index_project.push.apply(m_this.index_project,value);
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
