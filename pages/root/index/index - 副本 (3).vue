<template>
	<view>
	  <view class='swiper-tab'>
	    <view :class="'swiper-tab-item'+ currentTab==0?'active':''" data-current="0" bindtap="clickTab">待付款</view>
	    <view :class="'swiper-tab-item'+ currentTab==0?'active':''" data-current="1" bindtap="clickTab">待发货</view>
	    <view :class="'swiper-tab-item'+ currentTab==0?'active':''" data-current="2" bindtap="clickTab">待收货</view>
	    <view :class="'swiper-tab-item'+ currentTab==0?'active':''" data-current="3" bindtap="clickTab">已完成</view>
	  </view>
	 
	  <swiper class='swiper' :current='currentTab'  duration="300" bindchange="bindchange">
	    <view >
	      <swiper-item>
	          <scroll-view scroll-y="true">
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
	            <view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
				<view class='gaodu'>第一页</view>
	            <view class='gaodu'>显示</view>
	          </scroll-view>
	        </swiper-item>
	      </view>
	    <swiper-item>
	      <scroll-view scroll-y="true">
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	        <view class='gaodu'>第二页</view>
	      </scroll-view>
	    </swiper-item>
	    <swiper-item>
	      <scroll-view scroll-y="true">
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	        <view class='gaodu'>第三页</view>
	      </scroll-view>
	    </swiper-item>
	    <swiper-item>
	      <scroll-view scroll-y="true">
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>第四页</view>
	        <view class='gaodu'>1第四页</view>
	        <view class='gaodu'>0</view>
	      </scroll-view>
	    </swiper-item>
	  </swiper>
	</view>
</template>

<script>
	import {
		index_data_refresh
	} from "@/api/mock.js";
	import gmyFloatTouch from "@/components/gmy-float-touch/gmy-float-touch.vue";
	import search from "@/components/search/search.vue";
	import teamProject from "@/components/team-project/team-project.vue";
	import teamTalent from "@/components/team-talent/team-talent.vue";
	import teamQa from "@/components/team-qa/team-qa.vue";
	export default {
		components: {
			teamProject,
			teamTalent,
			teamQa,
			gmyFloatTouch,
			search
		},
		data() {
			return {
				currentTab: 0 //预定的位置
				
			};
		},
		methods: {
			bindchange (e) {
			      this.currentTab= e.detail.current;
			  },
			  //点击切换，滑块index赋值
			  clickTab (e) {
			    if (this.data.currentTab === e.currentTarget.dataset.current) {
			      return false;
			    } else {this.currentTab= e.currentTarget.dataset.current }
			}
		}
	};
</script>
<style>
	page {
		background: linear-gradient(to bottom,  #ECF5FE 0%,#ffffff 70%);
	}
</style>
<style lang="scss" scoped>
	@import "@/common/uni.scss";

	
	.swiper{
	  width: 100%;
	  height: 100%;
	  display: flex;
	  position: fixed;
	  top:80rpx;
	}
	scroll-view{
	  width: 100%;
	  height: 93%;/*动态高度*/
	}
	
	
	.gaodu{
	  height: 100rpx;
	  background: rgb(196, 248, 255);
	  text-align: center;
	  line-height: 100rpx;
	  border-bottom: 1rpx solid #4675F9;
	}
</style>
