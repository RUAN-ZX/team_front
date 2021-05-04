<template>
	<view class="page">
		<u-toast ref="uToast" />
		
		<view class="header trans"
			:style="[
				{opacity:m_header_opacity},
				{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow}]">
			
			<view class="title ellipsis" 
				:style="[{marginTop:info.top+'px'},{width:info.left-26+'px'},
				
				{height:info.height+'px'},
				{lineHeight: info.height+'px'}]">
				{{projectInfo.title}}
			</view>
			
			
			<uni-tag-set :set="projectInfo.projectTag">
			</uni-tag-set>
			
			
		</view>
		
		<view 
		class="content"
		:style="[{marginTop:info.top+info.height+10+'px'}]">
			<view class="title ellipsis-2">
				{{projectInfo.title}}
			</view>
			<uni-tag-set :set="projectInfo.projectTag" size="default">
			</uni-tag-set>
			
			<view class="publisher">
				<view class="header_avatar">
					<image class="header_frame_image" mode="widthFix"
					:src="'https://stea.ryanalexander.cn'+userInfo.grade.img"></image>
					<image class="header_avatar_image" mode="widthFix"
					:src="userInfo.avatar"></image>
				</view>
				<view class="header_right">
					<view class="header_alias ellipsis">
						{{userInfo.alias}}
						
					</view>
					<view class="header_grade">
						<u-tag
						:style="[{marginRight: '10px'}]"
						:bg-color="userInfo.grade.color"
						:text="userInfo.grade.text"
						mode="dark"
						size="mini"
						></u-tag>
						<u-tag
						:type="userInfo.certification.color"
						:text="userInfo.certification.text2"
						mode="dark"
						size="mini"
						></u-tag>
					</view>
				</view>
			</view>
			<view class="info">
				{{projectInfo.info}}
				
			</view>
			<view class="info">
				{{projectInfo.info}}
				
			</view>
			<view class="placeholder">
				
			</view>
		</view>
		<view class="footBar">
			<u-button type="error"
			@click="getBack"
			shape="square" :plain="false" :ripple="true">
				返回</u-button>
			
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
	import {getUserInfo,index_data_refresh} from '@/api/api.js';
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
			
			this.userInfo = getApp().globalData.userInfo_;
			
			
			
			if(res.model){
				this.projectInfo = JSON.parse(res.model);
			}
			else if(res.customContent){
				console.log(customContent)
			}
			
			this.initData();
			// this.projectInfo = requestProjectInfo(res.projectId);
			
			// this.userInfo = this.requestUserInfo(this.projectInfo.creatorUserId);
		},
		onReachBottom() {
			this.$refs.uToast.show({
				title: '已经到底部了哟',
				type: 'primary',
				duration: 500
			})
		},
		onPageScroll(e) {
			let temp = e.scrollTop;
			// console.log(e)
			if(temp>5) this.headerActive();
			else this.headerInactive();
		},
		methods:{
			getBack(){
				uni.navigateBack();
			},
			initData(){
				this.projectInfo = {
					projectId: "000000",  //方便跳转到详情页
					title: "基于树莓派及深度学习的情绪感知调节系统",
					discription: "极客实验室",
					purpose: "比赛项目",
					purposeTag: ["大创","省新苗","电商"],
					projectTag: ["软著1篇","专利3篇","多项省奖"],
					
					info: "菲尔德杯统计调查大赛队友招募团队成员,现已有三名成员，包括19级卓越学院会计专业学生一名，19级外国语学院英语专业学生一名，19级计算机专业学生一名，成员积极上进，多次获优秀学生奖学金，省政府奖学金等，并在浙江省经济管理案例分析大赛，挑战杯，电子商务获得过省一，省三等多项奖项，服务外包大赛进入国赛，且主要成员有统计调查新苗项目的文本撰写经验。指导老师：现任经济学院副院长，竞赛指导经验丰富，有意带团队拿一个好成绩。招募需求：经济学院统计学专业19级或以上同学一位，要求专业基础扎实，绩点保持4以上或者成绩名列专业前矛，认真负责不划水，有统调相关竞赛经验者优先。",
					
					publisher: {
						alias: "ryan_alexander@hzbytecloud.cn",
						avatar: "https://lets-team--public.oss-cn-hangzhou.aliyuncs.com/user/alias/alias (1).jpg",
						
					},
					
					talent: [
						{
							name: "前端",
							num: "3",
							demand: ["有h5基础","会写文档","会使用Vue"],
							//  可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						},
						{
							name: "后端",
							num: "1",
							demand: ["java web","服务器部署","nginx"],
							// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						}
					]
				}
			},
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
		padding-left: $padding-double;
		padding-bottom: $padding;
		position: fixed; 
		text-align: left;
		background-color: $cardColor;
		top: 0;
		left: 0;
		right: 0;
		
		.title{
			font-weight: bold;
			font-size: 30rpx;
			z-index: $zindex_navbar;
			color: $labelColor2;
			
		}
		
	
	}
	.content{
		position: relative; 
		
		z-index: $zindex_content;
		width: 100%;
		padding-left: $padding-double;
		padding-right: $padding-double;
		.title{
			font-weight: bold;
			font-size: 50rpx;
			color: $labelColor2;
			margin-bottom: $padding-half;
		}
		
		.publisher{
			position: relative;
			// border-top: 1px solid $lineColor;
			border-bottom: 1px solid $lineColor;
			height: 200rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			
			.header_avatar{
				// border: 2px $themeColor3 solid;
				width: 120rpx;
				height: 100%;
				border-radius: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				
				padding: $padding;
				
				.header_avatar_image{
					
					width: 90rpx;
					height: 75%;
					position: absolute;
					border-radius: 100%;
					
				}
				.header_frame_image{
					position: absolute;
					z-index: $zindex_tab;
					width: 120rpx;
					height: 100%;
					border-radius: 100%;
				}
			}
			.header_right{
				margin-left: $padding;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;
				
				.header_alias{
					width: 70vw;
					font-weight: bolder;
					font-size: 40rpx;
					color: $labelColor2;
				}
				.header_grade{
					margin-top: $padding-half;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}
		}
		
		.info{
			margin-top: $padding-half;
			font-size: 30rpx;
			color: $labelColor2;
		}
		
		.placeholder{
			// 本来是80rpx 奈何看起来太紧了不好
			height: calc(120rpx + #{$padding-double});
		}
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
