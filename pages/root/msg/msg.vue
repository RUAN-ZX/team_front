<template>
	<view>
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
				<u-tabs-swiper 
				:is-scroll="false" 
				activeColor="#007aff" 
				ref="tabs" :list="tab_list" :current="current"
				@change="change" swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>
		
		<view :style="{marginTop:info.bottom+100/info.ratio+10+'px'}">
				
			<view :class="current==0?'wrap':'wrap-none'">
				<u-swipe-action
					v-for="(item, index) in dialogData"
					:show="item.show" 
					:index="index" 
					:key="item.sender.uid"
					@click="click" 
					@content-click="contentClick"
					@open="open" :options="options"
					@close="close"
				>
					<view class="dialog">
						<image class="dialog-left" mode="aspectFill" :src="item.sender.avatar" />
					
						
						<view class="dialog-right">
							<view class="dialog-top">
								<text class="title ellipsis">{{ item.sender.alias }}</text>
								<text class="time">{{item.latestMessage.sendingTime}}</text>
							</view>
							
							<view class="dialog-bottom">
								<text class="last-message">{{ item.latestMessage.content }}</text>
								<view class="unread red-dot">{{item.unreadCount}}</view>
							</view>
						</view>
					</view>
				</u-swipe-action>
				
				<u-loadmore :status="loadStatus[0]" bgColor="transparent"></u-loadmore>
			</view>
			
			<view :class="current==1?'wrap':'wrap-none'">	
				<u-swipe-action
					v-for="(item, index) in noticeData"
					:show="item.show" 
					:index="index" 
					:key="item.id"
					@click="click" 
					@content-click="contentClick"
					@open="open" :options="options"
					@close="close"
				>
					<view class="dialog">
						<image class="dialog-left" mode="aspectFill" :src="avatar_default" />
					
						
						<view class="dialog-right">
							<view class="dialog-top">
								<text class="title ellipsis">{{ item.title }}</text>
								<text class="time">{{item.sendingTime}}</text>
							</view>
							
							<view class="dialog-bottom">
								<text class="last-message">{{ item.content }}</text>
								<view class="unread red-dot">未读</view>
							</view>
						</view>
					</view>
				</u-swipe-action>
				
				
				<u-loadmore :status="loadStatus[1]" bgColor="transparent"></u-loadmore>
			</view>	
		</view>
	</view>
</template>

<script>
	import {
		index_data_refresh,
		getDialogData,
		getNoticeData,
		dateTransform
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
				options: [
					{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				dialogData: [],
				dialogPage: 0,
				noticeData: [],
				noticePage: 0,
				
				loadStatus: ['loadmore', 'loadmore'],

				current: 0, // tabs组件的current值，表示当前活动的tab选项
				
				tab_list: [{
					name: '交流',
					num: 1
				}, {
					name: '通知',
					num: 2
				}],
				
				info: {},
				app: {},
				avatar_default: "https://lets-team--public.oss-cn-hangzhou.aliyuncs.com/user/alias/alias%20(4).jpg",
				
			};
		},
		onLoad() {
			this.info = getApp().globalData.info;
			this.app = getApp().globalData;
			
			this.initMsgData();
			
			
			
		},
		
		methods: {
			initMsgData(){
				getDialogData(0,9).then((value)=>{
					for (var i = 0; i < value.length; i++) {
						value[i].show = false;
						value[i].latestMessage.sendingTime = dateTransform(value[i].latestMessage.sendingTime)
					}
					// 一定要在这里添加show属性 否则无用！！！
					this.dialogData.push.apply(this.dialogData,value);
					
				})
				
				getNoticeData(0,9).then((value)=>{
					for (var i = 0; i < value.length; i++) {
						value[i].sendingTime = dateTransform(value[i].sendingTime)
						value[i].show = false;
					}
					this.noticeData.push.apply(this.noticeData,value);
				})
			},
			close(index) {
				this.dialogData[index].show = false;
			},
			open(index) {
				console.log(index)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.dialogData[index].show = true;
				this.dialogData.map((val, idx) => {
					if(index != idx) this.dialogData[idx].show = false;
				})
			},
			contentClick(index){
				let targetUserId = this.dialogData[index].sender.uid;
				uni.navigateTo({
					url: '/pages/root/msg/dialog/dialog?userId='+targetUserId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			click(index, index_side) {
				console.log(index,index_side)
				if(index_side == 1) {
					this.dialogData[index].show = false;
					this.dialogData.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.dialogData[index].show = false;
					this.info = {};
					this.$u.toast(`收藏成功`);
					
				}
			},
			
			change(index) {
				this.current = index;
			},
			reachTop() {
			},
			reachBottom() {
				let index = [this.dialogData,this.noticeData];
				this.loadStatus.splice(this.current,1,"loading")
				if(this.current==1){
					getDialogData(dialogPage++,6).then((value)=>{
						for (var i = 0; i < value.length; i++) {
							value[i].show = false;
						}
						this.dialogData.push.apply(this.dialogData,value);
					})
				}
				else{
					getNoticeData(noticePage++,6).then((value)=>{
						for (var i = 0; i < value.length; i++) {
							value[i].show = false;
						}
						this.noticeData.push.apply(this.noticeData,value);
					})
				}
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
			z-index:$zindex_navbar;
			width: 100vw;
			position: relative;
		}
		
	}
	
	.wrap {
		position: relative;
		background-color: $cardColor;
		z-index: $zindex_content;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: $padding-half;
		transition: all 0.3s ease-out;
	}
	.wrap-none{
		display: none;
	}
	
	.dialog {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: $padding;
		width: 100vw;
		.dialog-left {
			width: 100rpx;
			flex: 0 0 100rpx;
			// 可以 0 0 指代收放的量 而80rpx指代基础 意味着其他部分可以自由缩放！
			height: 100rpx;
			margin-right: $padding;
			border-radius: 100%;
		}
		.dialog-right{
			// 没办法 因为这个组件实际宽度超过屏幕宽度 你不限定死就出屏幕了
			width: calc(100vw - 100rpx - 3*#{$padding});
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: left;
			
			.dialog-top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: $padding-half;
				.title {
					flex: 1;
					font-size: 32rpx;
					color: $labelColor2;
					font-weight: bold;
				}
				.time{
					flex: 0 0 auto;
					color: $labelColor;
					font-size: 24rpx;
					margin-left: $padding;
				}
			}
			.dialog-bottom{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				
				.last-message{
					flex: 1;
					color: $labelColor;
					font-size: 28rpx;
					
					word-break: break-all;
					white-space:nowrap; 
					text-overflow: ellipsis;  /* 超出部分省略号 */
					
					overflow: hidden;  /*超出隐藏*/
				}
				.unread{
					flex: 0 0 auto;
					width: auto;
					margin-left: $padding;
				}
			}
			
		}
	}
	
	
</style>
