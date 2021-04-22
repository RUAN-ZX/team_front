<template>
	<view>
		<!-- 设置四个tab 分别是 个人简介 背景经历 专业技能 个人成就-->
		<!-- 说明这是简历母本 修改按照tab footbar提供预览功能 -->
		<!-- 此页面可以顺便改造成人才发布 聊天时发布简历等 -->
		<!-- 但是陌生人决不能随便获取到你的简历 -->
		
		<u-navbar back-text="返回"
			title="请修改您的唯一简历母本"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5">
		</u-navbar>
		
		<u-tabs-swiper bgColor="#ffffff" activeColor="#007aff" 
		ref="tabs" :list="tab_list" :current="current"
		 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<view class="wrapper">
			<swiper class="swiper"
				:current="swiperCurrent" 
				@transition="transition"
				@animationfinish="animationfinish"
				>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true"
					scroll-with-animation="true">
						1
						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true"
					scroll-with-animation="true">
						2
						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true"
					scroll-with-animation="true">
						3
						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true"
					scroll-with-animation="true">
						4
						
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import float from "@/components/r-float/r-float.vue";
	export default {
		data() {
			return {
				background: {backgroundColor: '#007aff',},
				color: {color:'#f5f5f5' },
				
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				
				tab_list: [
					{name: '基本介绍'}, 
					{name: '背景经历'}, 
					{name: '专业技能'},
					{name: '个人成就'},
				],
				
			}
		},
		methods: {
			transition({detail: {dx}}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: {current}}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			change(index) {
				this.swiperCurrent = index;
			},
		}
	}
</script>

<style>

</style>
