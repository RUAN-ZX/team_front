<template>
	<view>
		<view class="header"
		:style="{paddingTop:top+'px'}">
			<uni-icons
				:style="{width: width*0.96+'px'}"
				class="sidebar-btn"
				type="search" 
				size="60" 
				color="#ffffff"
				:hover-start-time="20" 
				:hover-stay-time="70" 
				@click="showDrawer('showLeft')"
			/>
			
			<view 
				class="input-view"
				:style="[{height:width*0.94+'px'},{borderRadius: width/2+'px'}]"
			>
				<uni-icons type="search" size="40" color="#666666" />
				<view 
					class="input"
					:style="[{height: width*0.8+'px'}, {lineHeight: width*0.8+'px'},{fontSize: width*0.6+'px'}]">
					<view class="input-text">
						点我搜索
					</view>
				</view>
			</view>
		</view>
		
		<view class="sidebar">
			<uni-drawer ref="showLeft" mode="left" :width="left" @change="change($event,'showLeft')">
				<view class="side-header">
					<view class="avatar-alias">
						<view class="avatar">
							<image
								class="avatarimg"
								:src="avatar" mode="widthFix"></image>
						</view>
						<view class="alias">
							{{alias}}
						</view>
					</view>
					
					<view class="scan">
						扫
					</view>
					<view class="bscard">
						名
					</view>
				</view>
				<view class="scroll-view">
					<scroll-view class="scroll-view-box" scroll-y="true">
						
						<view class="side-card side-card-first">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
						<view class="side-card">
							side-card
						</view>
					</scroll-view>
				</view>
			</uni-drawer>
		</view>
		<view class="content">
			<view class="card project">
				
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showLeft: false,
				alias: 'Ryaninnerpeace11',
				avatar: 'http://sayhitotheworld.ryanalexander.cn/images/404-img.png',
				top: 0,
				width: 0,
				left: 250
			}
		},
		onLoad(){
			
			this.top = uni.getStorageSync("top");
			this.width = uni.getStorageSync("width");
			this.left = uni.getStorageSync("left");
			console.log(uni.getStorageSync("left")-10);
		},
		methods: {
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	}
</script>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
	
</style>