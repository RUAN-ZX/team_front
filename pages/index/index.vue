<template>
	<view>
<!-- 		<view class="background"
		:style="[{height:screenHeight}]"> 
			
		</view> -->
		<view class="header"
		:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			
			
			<view class="alias-avatar"
				:style="[{marginTop:m_top}]">
				
				<aliasAvatar 
					:width="m_left"
					:alias="m_alias"
					:avatar="m_avatar"
					:uid="m_uid"
					:access="m_access"
					
				></aliasAvatar>
			</view>
			
			<view class="search-bscard"
			:style="[{backgroundColor: m_header_search}]">
				<span class="iconfont icon-search">淦</span>
				<span class="search">搜索</span>
			</view>
			
			<view class="div">
				<view class="left">
					<span class="iconfont div-left-icon">竞</span>
					<span class="div-left-text">竞赛一揽</span>
				</view>
				<view class="right">
					<span class="iconfont div-right-icon">消</span>
					<span class="div-right-text">未读消息</span>	
					<span class="div-right-red-dot"
					:style="{display:(m_header_right_msg==0?'none':'inline-block')}">
						{{m_header_right_msg}}
					</span>
				</view>
			</view>
		</view>
		
		<view class="card msg first-card">
			<view class="title">
				消息圈
			</view>
			
		</view>
		<view class="card project">
			<view class="title">
				项目圈
			</view>
			<view class="project-content"
				v-for="(projectItem,projectIndex) in index_project"
				:key="projectIndex">
				<view class="project-title-org">
					<view class="project-title">
						{{projectItem.title}}
					</view>
					<org class="project-org"
						:org="projectItem.org">
					</org>
				</view>
				<view class="type-detail">
					{{projectItem.type+projectItem.type_detail}}
				</view>
				<uni-tag-set
					class="foundation-label"
					:set="projectItem.foundation">
				</uni-tag-set>
				
				<view class="project-talent"
					v-for="(ptItem,ptIndex) in projectItem.talent"
					:key="ptIndex">
						<view class="project-talent-name">
							<span class="project-talent-name-num">
								{{ptItem.name}}
								<span class="project-talent-num">
									{{ptItem.num}}
								</span>
								人
							</span>
							
						</view>
						<uni-tag-set
							class="project-talent-demand"
							:set="ptItem.demand">
						</uni-tag-set>
				</view>
			</view>
		</view>
		
		<view class="card talent">
			<view class="title">
				人才圈
			</view>
			<!-- 人才圈这里想办法让用户觉得这个可以点击！ -->
			<view 
				class="talent-content"
				v-for="(talentItem,talentIndex) in index_talent"
				:key="talentIndex"
			>
				<view class="talent-alias-org">
					<aliasAvatar
						class="talent-aliasAvatar trans"
						:alias="talentItem.t_alias"
						:avatar="talentItem.t_avatar"
						:uid="talentItem.t_uid"
						:access="m_access"
						font_size="28rpx"
					></aliasAvatar>
					<org class="talent-org trans"
					:org="talentItem.t_org">
						
					</org>
				</view>
				
				<view class="wrapper trans">
					<uni-tag-set
						:set="talentItem.t_label"
						class="talent-label">
					</uni-tag-set>
								
					<view class="talent-content">
						{{talentItem.t_content}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="card qa">
			<view class="title">
				问答圈
			</view>
			
			
		</view>
		
	
	</view>
</template>
<script>
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	import org from '@/components/org/org.vue';
	export default {
		
		components: {
			uniTagSet,
			aliasAvatar,
			org
		},
		data() {
			return {
				
				m_alias: 'RyanAlexanderInnerpeaceAllIsWell',
				m_avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
				m_top: 0,
				m_width: 0,
				m_left: 0,
				m_height_header: 30,
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_header_search: '#ffffff',
				m_header_right_msg: 9,
				
				m_uid: 0, 
				m_access: '',
				index_project:[
					{
						title: "HDU智慧食堂",
						org: "杭州字节云网络科技有限公司",
						type: "比赛项目",
						type_detail: ["大创","省新苗","电商"],
						foundation: ["软著1篇","专利3篇","多项省奖"],
						//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
						// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
						talent: [
							{
								name: "前端",
								num: "3",
								demand: ["有h5基础","会写文档","会使用Vue"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							},
							{
								name: "后端",
								num: "1",
								demand: ["java web","服务器部署","nginx"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							}
						]
					},
					{
						title: "HDU智慧食堂",
						type: "比赛项目",
						type_detail: ["大创","省新苗","电商"],
						foundation: ["软著1篇","专利3篇","多项省奖"],
						//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
						// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
						talent: [
							{
								name: "前端",
								num: "3",
								demand: ["有h5基础","会写文档","会使用Vue"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							},
							{
								name: "后端",
								num: "1",
								demand: ["java web","服务器部署","nginx"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							}
						]
					},
					{
						title: "HDU智慧食堂",
						type: "比赛项目",
						type_detail: ["大创","省新苗","电商"],
						foundation: ["软著1篇","专利3篇","多项省奖"],
						//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
						// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
						talent: [
							{
								name: "前端",
								num: "3",
								demand: ["有h5基础","会写文档","会使用Vue"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							},
							{
								name: "后端",
								num: "1",
								demand: ["java web","服务器部署","nginx"],
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							}
						]
					},
				],
				index_talent:[
					{
						t_alias:'姚懿',
						t_avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/yy.jpg',
						t_uid:'000000',
						t_label: ["java后端","java","大数据","运维","容器"],
						t_org: '杭州字节云网络科技有限公司',
						t_content: "燕子一般指燕。燕（Swallow）是雀形目燕科74种鸟类的统称。形小，翅尖窄，凹尾短喙，足弱小，羽毛不算太多。羽衣单色，或有带金属光泽的蓝或绿色；大多数种类两性都很相似。燕子消耗大量时间在空中捕捉害虫，是最灵活的雀形类之一，主要以蚊、蝇等昆虫为主食"
					},
					{
						t_alias:'闪闪兔',
						t_avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
						t_uid:'000000',
						t_label: ["安卓","spring","卖萌"],
						t_org: '杭电324',
						t_content:"想找个兄弟一起摸鱼哇"
					},
					{
						t_alias:'阮智祥',
						t_avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
						t_uid:'000000',
						t_label: ["烫烫烫烫烫烫","烫烫烫烫","烫烫烫烫","烫烫烫烫","烫烫烫烫"],
						t_org: '杭州字节云网络科技有限公司',
						t_content: "每个菜鸡都有雄鹰的梦想，而梦想，在这里起航 Confront your weakness To be who you are And raise up in the world."
					},
					
				]
				
			}
		},
		onLoad: function(){
			this.m_left = (uni.getStorageSync("left")-26)+'px';
			// console.log(this.m_left);
			this.m_width = uni.getStorageSync("width");
			
			this.m_top = (uni.getStorageSync("top")-this.m_width/2)+'px';
			
			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			
			
		},
		methods: {
		},
		onPageScroll: function(e){
			if(e.scrollTop==0){
				this.m_header_opacity='0000';
				this.m_header_shadow='0000';
				this.m_header_search='#ffffff'
			} 
			else{
				this.m_header_opacity='ffff';
				this.m_header_shadow='0020';
				this.m_header_search='#f5f5f5'
			} 
		}
	}
</script>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
	
</style>