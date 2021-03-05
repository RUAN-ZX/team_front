<template>
	<scroll-view>
		
		<!-- <hover-menu></hover-menu> -->
		<view class="header"
			:style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			
			
			<view class="alias-avatar"
				:style="[{marginTop:m_top}]">
				
				<aliasAvatar 
					:width="m_left"
					:alias="m_alias"
					:avatar="m_avatar"
					:uid="m_uid"
				></aliasAvatar>
			</view>
			
			<view class="search-bscard trans" @click="search_navigate">
				
				<u-search 
					:show-action="false"
					clearabled="false"
					disabled="false" 
					placeholder="搜索" 
					v-model="m_search" shape="square" :bg-color="m_header_color">
				</u-search>
				<!-- <span class="iconfont icon-search">搜</span>
				<span class="search">搜索</span> -->
			</view>
			
			<view class="header_point">
				<view class="header_point_left">
					<span class="iconfont div-left-icon">
						<u-icon name="tags"></u-icon>
					</span>
					<span class="div-left-text">竞赛一揽</span>
				</view>
				<view class="header_point_middle">
					<span class="div-middle-icon">
						<u-icon name="bell"></u-icon>
					</span>
					<span class="div-middle-text">未读消息</span>	
					<span class="div-middle-red-dot"
					:style="{display:(m_header_middle_msg==0?'none':'inline-block')}">
						{{m_header_middle_msg}}
					</span>
				</view>
				<view class="header_point_right">
					<span class="div-right-icon">
						<u-icon name="scan"></u-icon>
					</span>
					
				</view>
			</view>
		</view>
<!-- 		
		<view class="card news first-card">
			<view class="title">
				消息圈
			</view>
			<view class="news-content">
				<view class="news-item"
					v-for="(newsItem, newsIndex) in index_news"
					:key="newsIndex">
						<list-btn
							:title="newsItem.title"
							:navigate="m_news_navigate+newsItem.newsId">
							
						</list-btn>
				</view>
				
			</view>
		</view> -->
		
		<view class="card project first-card">
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
					<view class="project-org">
						<org :org="projectItem.org">
						</org>
					</view>
					
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
						<lu-button-ripple></lu-button-ripple>
						
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
			<view 
				class="talent-content"
				v-for="(talentItem,talentIndex) in index_talent"
				:key="talentIndex"
			>
			
				<view class="talent-alias-org">
					<aliasAvatar
						class="talent-aliasAvatar"
						:alias="talentItem.alias"
						:avatar="talentItem.avatar"
						:uid="talentItem.uid"
						:access="m_access"
						font_size="28rpx"
					></aliasAvatar>
					<org class="talent-org"
					:org="talentItem.org">
						
					</org>
				</view>
				
				<view class="wrapper">
					<lu-button-ripple></lu-button-ripple>
					<uni-tag-set
						:set="talentItem.label"
						class="talent-label">
					</uni-tag-set>
								
					<view class="talent-item-content">
						{{talentItem.content}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="card qa">
			<view class="title">
				问答圈
			</view>
	
			<view class="qa-content"
				v-for="(qaItem, qaIndex) in index_qa"
				:key="qaIndex">
				<list-qa
					class="qa-item"
					:title="qaItem.title"
					:content="qaItem.content"
					:questioner="qaItem.questioner"
					:evaluation="qaItem.evaluation"
					>
				</list-qa>
			</view>
		</view>		
		<view class="card">
			<u-image 
			width="200px"
			height="200px"
			src="https://stea.ryanalexander.cn/2021-02-25/upload_2bvg7g08aethufok8kxowx7c5taagoxw.jpg" :fade="true" duration="450"></u-image>
		</view>
		
	</scroll-view>
</template>
<script>
	import hoverMenu from '../../components/hoverMenu/hoverMenu.vue'
	import listQa from '../../components/listQa/listQa.vue'
	import listBtn from '@/components/listBtn/listBtn.vue'
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	import org from '@/components/org/org.vue';
	export default {
		
		components: {
			uniTagSet,
			aliasAvatar,
			org,
			luButtonRipple,
			listBtn,
			listQa,
			hoverMenu
		},
		data() {
			return {
				m_search: "",
				m_alias: 'RyanAlexander',
				m_avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
				m_top: 0,
				m_width: 0,
				m_left: 0,
				m_height_header: 30,
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_header_color: '#ffffff',
				m_header_middle_msg: 9,
				
				m_uid: 0, 
				m_access: '',
				m_news_navigate: '/pages/news/news?',
				index_news:[
					{
						// 消息来源还没想好 估计创业学院嫖一下为上
						"title":"[学生处]2019-2020学年杭州电子科技大学先进班集体、十佳优良学风班公示",
						"newsId": "000000"
					},
					{
						"title":"[学生处]2019-2020学年杭州电子科技大学先进班集体、十佳优良学风班公示",
						"newsId": "000001"
					},
					{
						"title":"[学生处]2020年尚德奖学金推荐名单公示",
						"newsId":"000002"
					},
					{
						"title":"[学生处]关于我校拟推荐2020年浙江省普通本科高校本科生秋季学期国家助学金人选的公示",
						"newsId":"000003"
					},
					{
						"title":"[组织部、统战部]关于公开选拔挂（兼）职共青团干部的通知",
						"newsId":"000004"
					}
				],
				index_project:[
					{
						projectId: "000000",  //方便跳转到详情页
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
								//  可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
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
						projectId: "000000",  //方便跳转到详情页
						title: "HDU智慧食堂",
						type: "比赛项目",
						org: "杭州字节云网络科技有限公司",
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
						projectId: "000000",  //方便跳转到详情页
						title: "HDU智慧食堂",
						type: "比赛项目",
						org: "杭州字节云网络科技有限公司",
						type_detail: ["大创","省新苗","电商"],
						foundation: ["软著1篇","专利3篇","多项省奖"],
						//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
						// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
						talent: [
							{
								name: "前端",
								num: "3",
								demand: ["有h5基础","会写文档","会使用Vue"]
								// 可以在工作内容 能力要求 上提取	
							},
							{
								name: "后端",
								num: "1",
								demand: ["java web","服务器部署","nginx"]
								// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
							}
						]
					},
				],
				index_talent:[
					{
						tid: "000000",
						talent: {
							uid: '000000',
							alias:'姚懿',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/yy.jpg'
						},
						label: ["java后端","java","大数据","运维","容器"],
						org: '杭州字节云网络科技有限公司',
						content: "燕子一般指燕。燕（Swallow）是雀形目燕科74种鸟类的统称。形小，翅尖窄，凹尾短喙，足弱小，羽毛不算太多。羽衣单色，或有带金属光泽的蓝或绿色；大多数种类两性都很相似。燕子消耗大量时间在空中捕捉害虫，是最灵活的雀形类之一，主要以蚊、蝇等昆虫为主食"
					},
					{
						tid: "000000",
						talent:{
							alias:'闪闪兔',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
							uid:'000000'
						},
						label: ["安卓","spring","卖萌"],
						org: '杭电324',
						content:"想找个兄弟一起摸鱼哇"
					},
					{
						tid: "000000",
						talent:{
							alias:'阮智祥',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
							uid:'000000'
						},
						label: ["烫烫烫烫烫烫","烫烫烫烫","烫烫烫烫","烫烫烫烫","烫烫烫烫"],
						org: '杭州字节云网络科技有限公司',
						content: "每个菜鸡都有雄鹰的梦想，而梦想，在这里起航 Confront your weakness To be who you are And raise up in the world."
					},
					
				],
				// 首先  可以选择是否展示自己头像和组织等等 有些名人需要用自己的名人效应来增加问题被回答的可能性
				// 另外  高分回答也是为了抛砖引玉 至于显示不显示回答者的头像那些 也由他们选择 默认是有的 
				// 注意  两者最好区分一下 否则会造成意义不明 到底是提问者还是回答者
				index_qa:[
					{
						title: '各位大佬 大创有什么经验可以分享嘛？',
						qaid: '000000',
						content: "如题，萌新刚刚知道大创 想要尝试一下 希望各位大佬能指点一下萌新 萌新感激不尽",
						questioner:{
							alias:'sst',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
							uid: '000000',
							org: '杭电324',
						},
						evaluation:{
							viewed:10001,
							answer:20,
							like:302,
							comment:670
						}
					},
					{
						title: '为什么真正有落地能力的项目往往不受评委欣赏?',
						qaid: '000000',
						content: "很容易发现，往往评选出来的项目华而不实，真正落地的很少，而实际上能够赢利的往往评委看不上，各位大佬怎么说？",
						questioner:{
							alias:'sst',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
							uid: '000000',
							org: '杭电324',
						},
						evaluation:{
							viewed:10001,
							answer:20,
							like:302,
							comment:670
						}
					},
					{
						title: '有没有可能电子的实验室联合起来做项目?',
						qaid: '000000',
						content: "自动化学院感觉更加资源集中，因此自动化科协也成果不少，我在想如果电子学院的实验室能够联合起来，或许可以做到更好的资源整合？",
						questioner:{
							alias:'sst',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
							uid: '000000',
							org: '杭电324',
						},
						evaluation:{
							viewed:10001,
							answer:20,
							like:302,
							comment:670
						}
					},					
					
				]
			}
		},
		onLoad: function(){
			this.m_left = (uni.getStorageSync("left")-26)+'px';
			
			this.m_width = uni.getStorageSync("width");
			
			this.m_top = (uni.getStorageSync("top")-this.m_width/2)+'px';
			
			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			
			
		},
		methods: {
			search_navigate(){
				
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onPageScroll: function(e){
			if(e.scrollTop==0){
				this.m_header_opacity='0000';
				this.m_header_shadow='0000';
				this.m_header_color='#ffffff'
			} 
			else{
				this.m_header_opacity='ffff';
				this.m_header_shadow='0020';
				this.m_header_color='#f5f5f5'
			} 
		}
	}
</script>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
	
</style>