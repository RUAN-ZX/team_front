<template>
	<view>
		<view class="header" :style="[{backgroundColor:'#ffff'+m_header_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			<view class="alias-avatar" :style="[{marginTop:m_top}]">
				<aliasAvatar :width="m_left" :alias="m_alias" :avatar="m_avatar" :uid="m_uid"></aliasAvatar>
			</view>
		
			<view class="search-bscard trans" @click="search_navigate">
				<u-search :show-action="false" clearabled="false" disabled="false" placeholder="搜索" v-model="m_search" shape="square"
				 :bg-color="m_header_color">
				</u-search>
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
					<span class="div-middle-red-dot" :style="{display:(m_header_middle_msg==0?'none':'inline-block')}">
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
		<view class="wrap">
			<view class="panel"></view>
			<view class="u-tabs-box"
			:style="[{backgroundColor:'#ffff'+m_tab_opacity},{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow}]">
				<u-tabs-swiper :bgColor="m_tab_bgcolor" activeColor="#f29100" ref="tabs" :list="tab_list" :current="current"
				 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltoupper="reachTop" @scrolltolower="reachBottom">
						<view class="page-box">
							<view :id="'project-'+projectIndex" class="card project" v-for="(projectItem,projectIndex) in index_project"
							 :key="projectIndex">
								<view class="project-title-org">
									<view class="project-title overflow">
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
								<uni-tag-set class="foundation-label" :set="projectItem.foundation">
								</uni-tag-set>
								<view class="project-talent" v-for="(ptItem,ptIndex) in projectItem.talent" :key="ptIndex">
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
									<uni-tag-set class="project-talent-demand" :set="ptItem.demand">
									</uni-tag-set>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view :id="'talent-'+talentIndex" class="card talent" v-for="(talentItem,talentIndex) in index_talent" :key="talentIndex">
								<view class="talent-alias-org">
									<aliasAvatar class="talent-aliasAvatar" :alias="talentItem.alias" :avatar="talentItem.avatar" :uid="talentItem.uid"
									 :access="m_access" font_size="28rpx"></aliasAvatar>
									<org class="talent-org" :org="talentItem.org">

									</org>
								</view>

								<view class="wrapper">
									<lu-button-ripple></lu-button-ripple>
									<uni-tag-set :set="talentItem.label" class="talent-label">
									</uni-tag-set>

									<view class="talent-item-content overflow">
										{{talentItem.content}}
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view :id="'qa-'+qaIndex" class="card qa" v-for="(qaItem, qaIndex) in index_qa" :key="qaIndex">
								<list-qa class="qa-item" :title="qaItem.title" :content="qaItem.content" :questioner="qaItem.questioner"
								 :evaluation="qaItem.evaluation">
								</list-qa>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>

						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<!-- <view class="order" v-for="(res, index) in  orderList[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view> -->
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import hoverMenu from '../../components/hoverMenu/hoverMenu.vue'
	import listQa from '../../components/listQa/listQa.vue'
	import listBtn from '@/components/listBtn/listBtn.vue'
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	import uniTagSet from "@/components/uni-tag-set/uni-tag-set.vue"
	import aliasAvatar from "@/components/aliasAvatar/aliasAvatar.vue"
	import org from '@/components/org/org.vue';

	import {
		index_data_refresh
	} from "@/api1/mock.js"
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
				
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

				m_height: "100px",
				scrollHeight: 0,

				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tab_list: [{
					name: '项目圈',
					num: 1
				}, {
					name: '人才圈',
					num: 1
				}, {
					name: '问答圈',
					num: 1
				}],
				m_search: "",
				m_alias: 'RyanAlexander',
				m_avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/ryan.jpg',
				m_top: 0,
				m_width: 0,
				m_left: 0,
				m_height_header: 30,
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_tab_shadow: '0000',
				m_tab_opacity: '0000',
				m_tab_bgcolor: "transparent",
				m_header_color: '#ffffff',
				m_header_middle_msg: 9,

				m_uid: 0,
				m_access: '',
				m_news_navigate: '/pages/news/news?',

				index_project: [{
					projectId: "000000", //方便跳转到详情页
					title: "基于树莓派及深度学习的情绪感知调节系统",
					org: "极客实验室",
					type: "比赛项目",
					type_detail: ["大创", "省新苗", "电商"],
					foundation: ["软著1篇", "专利3篇", "多项省奖"],
					//真正详情页 可以给他们一个模板参考 在富文本编辑器里面 他们自定义也行
					// 这里 可以标签+不超过n个字的简介（不超过两行） 可以两者皆有！
					talent: [{
							name: "前端",
							num: "3",
							demand: ["有h5基础", "会写文档", "会使用Vue"],
							//  可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						},
						{
							name: "后端",
							num: "1",
							demand: ["java web", "服务器部署", "nginx"],
							// 可以在工作内容 能力要求 上提取关键词写上去 也可以是某种技术形式
						}
					]
				}, ],

				index_talent: [{
					tid: "000000",
					talent: {
						uid: '000000',
						alias: '姚懿',
						avatar: 'alias (1).jpg'
					},
					label: ["java后端", "java", "大数据", "运维", "容器"],
					org: '杭州字节云网络科技有限公司',
					content: "燕子一般指燕。燕（Swallow）是雀形目燕科74种鸟类的统称。形小，翅尖窄，凹尾短喙，足弱小，羽毛不算太多。羽衣单色，或有带金属光泽的蓝或绿色；大多数种类两性都很相似。燕子消耗大量时间在空中捕捉害虫，是最灵活的雀形类之一，主要以蚊、蝇等昆虫为主食"
				}, ],
				// 首先  可以选择是否展示自己头像和组织等等 有些名人需要用自己的名人效应来增加问题被回答的可能性
				// 另外  高分回答也是为了抛砖引玉 至于显示不显示回答者的头像那些 也由他们选择 默认是有的 
				// 注意  两者最好区分一下 否则会造成意义不明 到底是提问者还是回答者
				index_qa: [{
					title: '为什么真正有落地能力的项目往往不受评委欣赏?',
					qaid: '000000',
					content: "很容易发现，往往评选出来的项目华而不实，真正落地的很少，而实际上能够赢利的往往评委看不上，各位大佬怎么说？",
					questioner: {
						alias: 'sst',
						avatar: 'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
						uid: '000000',
						org: '杭电324',
					},
					evaluation: {
						viewed: 10001,
						answer: 20,
						like: 302,
						comment: 670
					}
				}],
				m_tab_bgcolor: "transparent",
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: [{
						id: 1,
						store: '夏日流星限定贩卖',
						deal: '交易成功',
						goodsList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
					{
						id: 2,
						store: '江南皮革厂',
						deal: '交易失败',
						goodsList: [{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}]
					},
					{
						id: 3,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
								title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
								type: '4K，广色域',
								deliveryTime: '保质5年',
								price: '1998',
								number: 3
							},
							{
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								number: 1
							}
						]
					},
					{
						id: 4,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								number: 3
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								number: 1
							}
						]
					},
					{
						id: 5,
						store: '三星旗舰店',
						deal: '交易成功',
						goodsList: [{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}]
					}
				],

				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			var this_ = this;
			this.m_height = uni.getSystemInfoSync().windowHeight

			this.m_left = (uni.getStorageSync("left") - 26) + 'px';

			this.m_width = uni.getStorageSync("width");

			this.m_top = (uni.getStorageSync("top") - this.m_width / 2) + 'px';

			this.m_uid = uni.getStorageSync("uid");
			this.m_access = uni.getStorageSync("a");
			index_data_refresh(0,2).then(function(value){
				this_.index_project=value;
			});
			
			index_data_refresh(1,4).then(function(value){
				this_.index_talent=value;
			});
			index_data_refresh(2,4).then(function(value){
				this_.index_qa=value;
			});
			
			// this.getOrderList(0);
			// this.getOrderList(1);
			// this.getOrderList(3);
		},
		onPageScroll: function(e) {
			console.log(e.scrollTop)
			
			if (e.scrollTop == 0) {
				this.m_header_shadow = '0000'
				this.m_header_opacity = '0000'
				this.m_tab_shadow = '0000'
				this.m_tab_opacity =  '0000'
				this.m_tab_bgcolor =  "transparent"
				this.m_header_color = '#ffffff'
			} 
			else if(e.scrollTop == 180){
				this.m_header_shadow = '0000'
				this.m_header_opacity = 'ffff';
				this.m_tab_shadow = '0020'
				this.m_tab_opacity = 'ffff'
				this.m_tab_bgcolor = "#ffffff"
			}
			else {
				this.m_header_opacity = 'ffff';
				this.m_header_shadow = '0020';
				this.m_header_color = '#f5f5f5';
			}
		},

		methods: {
			reachTop() {
				// this.m_tab_bgcolor = 'transparent';
				// console.log(this.m_tab_bgcolor)
			},
			reachBottom() {
				// this.m_tab_bgcolor = '#ffffff';
				// console.log(this.m_tab_bgcolor)
				// 此tab为空数据
				// if (this.current != 2) {
				// 	this.loadStatus.splice(this.current, 1, "loading")
					
				// }
				let this_ = this;
				let index = [this.index_project,this.index_talent,this.index_qa];
				this.loadStatus.splice(this.current,1,"loading")
				index_data_refresh(this.current,2).then(function(value){
					index[this_.current].push.apply(index[this_.current],value);
					console.log(index[this_.current])
					console.log(this_.current)
					this_.loadStatus.splice(this_.current,1,"loadmore")
				});
				
			},
			
			// swiper-item左右移动，通知tabs的滑块跟随移动

			// transition(e) {
			// 	let dx = e.detail.dx;
			// 	this.$refs.uTabs.setDx(dx);
			// },

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// this.current = index;
				// 这个不能加 否则有bug
				
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			search_navigate() {
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}


		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="less">
	@import "@/uni.less";
	@import "./index.less";
</style>


<style lang="scss" scoped>
	.u-tabs-box {
		top: 160px;
		width: 100vw;
		/* #ifndef APP-PLUS-NVUE */
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		margin-top: 180px;
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
