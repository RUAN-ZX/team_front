<template>
	<view>
		<u-toast ref="uToast" />
		
		<view class="header trans"
			:style="[
				{opacity:m_header_opacity},
				{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow}]">
			
			<view class="title" 
				:style="[{marginTop:info.top+'px'},{width:info.left-26+'px'},
				
				{height:info.height+'px'},
				{lineHeight: info.height+'px'}]">
				{{projectInfo.title}}
			</view>
			
		</view>
		
		<view class="content"
		
		:style="[{marginTop:info.top+info.height+10+'px'}]">
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
			<view>1000</view>
		</view>
		<view class="footBar">
			<u-button type="error"
			@click="customize"
			shape="square" :plain="true" :ripple="true">
				自定义页面</u-button>
				
			<u-button type="error"
			@click="commit"
			shape="square" :plain="false" :ripple="true">
				提交</u-button>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '@/api/api.js';
	export default {
		data() {
			return {
				info:{},
				m_header_opacity: '',
				m_title_opacity: '',
				m_tab_shadow: '',
				userInfo: {},
				projectInfo: {}
			};
		},
		onLoad(res) {
			this.info = getApp().globalData.info;
			this.headerInactive();
			
			if(res.model){
				this.projectInfo = JSON.parse(res.model);
			}
			else if(res.customContent){
				console.log(customContent)
			}
			
			// this.projectInfo = requestProjectInfo(res.projectId);
			
			// this.userInfo = this.requestUserInfo(this.projectInfo.creatorUserId);
		},
		onPageScroll(e) {
			let temp = e.scrollTop;
			// console.log(e)
			if(temp>5) this.headerActive();
			else this.headerInactive();
		},
		methods:{
			headerActive(){
				this.m_header_opacity = 'ffff'
				this.m_title_opacity = '0000'
				this.m_tab_shadow = '0020'
			},
			headerInactive(){
				this.m_header_opacity = '0000'
				this.m_title_opacity= 'ffff'
				this.m_tab_shadow = '0000'
			},
			commit(){
				// 请求
				
				this.$refs.uToast.show({
					title: '项目发布成功~',
					type: 'success',
					position: "bottom"
				})
				
				uni.navigateTo({
					url: '/pages/root/index/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			customize(){
				uni.navigateTo({
					url: '/pages/release/editor/editor',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			requestProjectInfo(projectId){
				uni.request({
					method: 'get',
					url: this.app.url + "/recruiting/"+this.projectId,
					header: this.app.genHeader(this.app.token.a,this.app.token.r),
					success: (res) => {
						return res.data.data;
					},
					fail: (res)=>{console.log(res)},
				})
			},
			requestUserInfo(){
				uni.request({
					method: 'get',
					url: this.app.url + "/userInfo/"+this.userId,
					header: this.app.genHeader(this.app.token.a,this.app.token.r),
					success: (res) => {
						return res.data.data;
					},
					fail: (res)=>{console.log(res)},
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	
	.header {
		z-index: $zindex_navbar;
		padding-left: $padding;
		padding-bottom: $padding;
		
		text-align: left;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		
		.title{
			font-weight: bold;
			font-size: 30rpx;
			text-align: center;
			color: $labelColor2;
		}
	
	}
	.content{
		z-index: $zindex_content;
		width: 100%;
	}
	
	.footBar{
		
		padding: $padding;
		width: 100vw;
		z-index: $zindex_navbar;
		
		position: fixed; 
		bottom: 0;
		left: 0;
		right: 0;
		
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		
		background-color: $cardColor;
		
		box-shadow: 15rpx 3rpx 6rpx 6rpx rgba(0,0,0,0.125);
		
	}
	
</style>
