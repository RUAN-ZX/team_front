<template>
	<view class="page">
		<r-float :imgLists="imgLists"></r-float>
		<view class="header trans" :style="[{backgroundColor:'#ffff'+m_header_opacity}]">

			<view class="wrapper_search" @click="navigate('/pages/search/index_search/index_search?e=10')"
				:style="[{marginTop:info.top+'px'},{width:info.left-26+'px'}]">
				<search :show-action="false" clearabled="false" disabled="false" placeholder="搜索" shape="round"
					:bg-color="m_header_color" :height="info.height+'px'">
				</search>
			</view>
		</view>

		<view class="uswiper trans" :style="[{height: height_swiper + 'rpx'}]">
			<u-swiper :height="height_swiper" :list="swiperList" mode="round" :effect3d="true" :title="true"
				duration="1000" :circular="true" :autoplay="true">
			</u-swiper>
		</view>


		<view class="wrap" :style="[{top: info.top+info.height+10+'px'},
			{backgroundColor:'#ffff'+m_tab_opacity},
			{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_tab_shadow}]">
			<view class="wrap_title">
				<view :class="title_text_class[0]" @click="changeTitle(0)">
					精选
				</view>
				<view :class="title_text_class[1]" @click="changeTitle(1)">
					最新
				</view>
			</view>

			<u-tabs-swiper :bgColor="m_tab_bgcolor" activeColor="#007aff" ref="tabs" :list="tab_list" :current="current"
				@change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>

		</view>

		<view class="wrapper">
			<swiper class="swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true" @scroll="scroll" scroll-with-animation="true"
						@scrolltolower="reachBottom">
						<view v-for="(projectItem,projectIndex) in index[0]" :key="projectIndex" class="trans"
							:style="[aniStyle]">

							<team-project :projectItem="projectItem" :key="projectIndex">
							</team-project>
						</view>
						<u-loadmore :status="loadStatus[0]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true" @scrolltolower="reachBottom">
						<view v-for="(talentItem,talentIndex) in index[1]" :key="talentIndex" class="trans"
							:style="[aniStyle]">
							<team-talent :talentItem="talentItem">
							</team-talent>
						</view>
						<u-loadmore :status="loadStatus[1]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true" @scrolltolower="reachBottom">
						<view v-for="(qaItem, qaIndex) in index[2]" :key="qaIndex" class="trans" :style="[aniStyle]">
							<team-qa :qaItem="qaItem"></team-qa>
						</view>
						<u-loadmore :status="loadStatus[2]" bgColor="transparent"></u-loadmore>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		index_data_refresh,
		getUserInfo,
		msgTransform,
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
				height_swiper: 200,
				app: {},
				websocketInterval: null,
				imgLists: [
					"https://stea.ryanalexander.cn/float/0.png",
					"https://stea.ryanalexander.cn/float/1.png",
					"https://stea.ryanalexander.cn/float/2.png",
					"https://stea.ryanalexander.cn/float/3.png",
					"https://stea.ryanalexander.cn/float/4.png",
					"https://stea.ryanalexander.cn/float/5.png",
				],
				swiperList: [{
						image: 'https://stea.ryanalexander.cn/psl/hdu1.jpg',
						title: '以清养廉，以廉育人'
					},
					{
						image: 'https://stea.ryanalexander.cn/psl/hdu2.jpg',
						title: '与祖国同行，与科学共进'
					},
					{
						image: 'https://stea.ryanalexander.cn/psl/hdu3.jpg',
						title: '不忘初心，牢记使命'
					}
				],

				title_text_class: ["title_text_selected", "title_text_unselected"],

				scrollTop: "0px",
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],

				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

				tab_list: [{
					name: '项目圈',
					num: 1 // 这个num有啥用？？？？
				}, {
					name: '人才圈',
					num: 1
				}, {
					name: '问答圈',
					num: 1
				}],

				m_header_opacity: '0000',
				m_tab_shadow: '0000',
				m_tab_opacity: '0000',
				m_tab_bgcolor: "transparent",
				m_header_color: '#ffffff',

				index: [
					[],
					[],
					[]
				],
				info: {},
				height_swiper: 0,

				aniStyleIsShow: false,
				aniStyleDuration: 0

			};
		},
		onLoad() {
			this.app = getApp().globalData;
			this.info = getApp().globalData.info;

			this.initUserInfo();


			this.initIndexData();

			this.initMessage();

			this.initWebsocket();

			this.spread();


		},
		computed: {
			aniStyle() {
				let style = {};

				style.transform = `translateY(${this.aniStyleIsShow ? 0 : '-10%'})`
				style['opacity'] = this.aniStyleIsShow ? 1 : 0;
				style['transition-duration'] = this.aniStyleDuration / 1000 + 's';
				return style;
			}
		},
		methods: {
			connectWebSocket() {
				uni.connectSocket({
					url: this.app.wsUrl + "/im?token=" + this.app.token.a + "&platformId=1",
					success: (res) => {
						this.initMessage().then((value) => {
							this.app.dialogData = msgTransform(value.data.data.pageData);
						});
					},
					fail: (res) => {
						console.log("fail" + res)
					}
				});
			},
			initWebsocket() {
				this.connectWebSocket();
				
				let sendHeartBeats = ()=>{
					uni.sendSocketMessage({
						data:JSON.stringify({"type": 0}),
						success() {console.log("HeartBit sended");}
					});
				}
				
				let sendHeartBeatsStart = ()=>{//启动计时器函数
					if(this.websocketInterval!=null){
						clearInterval(this.websocketInterval);
						this.websocketInterval=null;
					}
					this.websocketInterval = setInterval(sendHeartBeats,4000);
				}
				
				let sendHeartBeatsStop = () =>{   
					clearInterval(this.websocketInterval);
					this.websocketInterval = null;
				}
				
				//监听socket打开
				uni.onSocketOpen(() => {
					this.app.isSocketOpen = true;
					
					sendHeartBeatsStart();

					console.log('WebSocket连接已打开！');
				})
				//监听socket关闭
				uni.onSocketClose(() => {
					this.app.isSocketOpen = false;
					sendHeartBeatsStop();
					console.log('WebSocket连接已关闭！');
					
					setTimeout(() => {
						this.connectWebSocket();
					}, 2000);
				})
				//监听socket错误
				uni.onSocketError(() => {
					this.app.isSocketOpen = false;
					sendHeartBeatsStop();
					console.log('WebSocket连接打开失败');
				})

				uni.onSocketMessage((res) => {
					let newDialog = JSON.parse(res.data) //socket信息是字符串，需要先转成json形式再去解析内容

					if(newDialog.type==1){
						let n = this.app.dialogData.length-1;
						for (var i = n; i >= 0; i--) {
							let item = this.app.dialogData[i];
							if(newDialog.data.senderUserId==item.sender.uid){
								item.latestMessage={
									type: newDialog.type,
									contentType: newDialog.data.contentType,
									content: newDialog.data.content,
									sendingTime: dateTransform(new Date(newDialog.time))
								}
								item.unreadCount++;
								break;
							}
						}
					}
				});
			},
			initIndexData() {
				index_data_refresh(0, 4).then((value) => {
					this.aniStyleIsShow = false;
					this.aniStyleDuration = 1;

					this.index[0].push.apply(this.index[0], value);

					setTimeout(() => {
						this.aniStyleIsShow = true;
						this.aniStyleDuration = 300;
					}, 100);
				});
				index_data_refresh(1, 6).then((value) => {
					this.index[1].push.apply(this.index[1], value);
				});
				index_data_refresh(2, 5).then((value) => {
					this.index[2].push.apply(this.index[2], value);
				});
			},
			scroll(e) {
				let temp = e.detail.scrollTop;
				if (temp > 100) {
					this.fold();
				} else {
					this.spread();
				}
			},
			spread() {
				this.height_swiper = 250;
				this.m_header_opacity = '0000'
				this.m_header_color = '#ffffff'
				this.m_tab_shadow = '0000'
				this.m_tab_opacity = '0000'
				setTimeout(() => {
					this.m_tab_bgcolor = "transparent"
				}, 300);

			},
			fold() {
				this.height_swiper = 0;
				this.m_header_color = '#ECF5FE'
				this.m_header_opacity = 'ffff';
				this.m_tab_shadow = '0020'
				this.m_tab_opacity = 'ffff'
				this.m_tab_bgcolor = "#ffffff"
				this.m_header_bgcolor = "#ffffff"
			},
			initMessage() {
				return new Promise((resolute, reject) => {
					uni.request({
						method: 'get',
						url: this.app.url + "/message/session/history",
						data: {
							"pageNum": 1,
							"pageSize": 100
						},
						header: this.app.genHeader(this.app.token.a, ""),
						success: (res) => {
							resolute(res);
						},

						fail: (res) => {
							reject(res);
						}
					});
				});
			},
			initUserInfo() {
				uni.request({
					method: 'get',
					url: this.app.url + "/userInfo/me",
					header: this.app.genHeader(this.app.token.a, this.app.token.r),
					success: (res) => {
						this.app.userInfo = res.data.data;
						this.app.userInfo_ = getUserInfo(res.data.data);
						uni.setStorageSync("i", res.data.data.userId);
					},
					fail: (res) => {
						console.log(res)
					},
				})
			},
			changeTitle(code) {
				this.title_text_class = ["title_text_unselected", "title_text_unselected"];
				this.title_text_class[code] = "title_text_selected";
			},
			reachTop() {

			},
			reachBottom() {
				// let index = [this.index_project,this.index_talent,this.index_qa];
				this.loadStatus.splice(this.current, 1, "loading")
				index_data_refresh(this.current, 2).then((value) => {
					// console.log(index[this.current])
					this.index[this.current].push.apply(this.index[this.current], value);

					this.loadStatus.splice(this.current, 1, "loadmore")
				});

			},
			change(index) {
				this.swiperCurrent = index;
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

	.page {
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom, #ECF5FE 0%, #ffffff 70%);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;

		.header {
			z-index: 4;
			padding-left: $padding;
			padding-bottom: $padding;

			display: flex;
			flex-direction: column;
			text-align: left;
			position: relative;
			top: 0;
			left: 0;
			width: 100vw;

			.wrapper_search {
				opacity: 1;
				width: 100%;
			}

			.wrapper_search:active {
				opacity: 0.1;
			}

		}

		.wrap {

			background-color: $cardColor;
			width: 100%;
			// position: sticky;
			z-index: $zindex_tab;

			.wrap_title {

				margin-left: $padding;
				margin-top: $padding;
				font-weight: bolder;

				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 20vw;

				.title_text_unselected {
					// flex: 1;
					font-weight: normal;
					color: $labelColor;
					font-size: 30rpx;
				}

				.title_text_selected {
					// flex: 1;
					font-weight: bolder;
					color: $labelColor2;
					font-size: 35rpx;
				}
			}

			.tabs-box {
				width: 100vw;
			}
		}

		.wrapper {
			display: flex;
			flex: 1;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					scroll-view {
						height: 100%;
						width: 100%;

					}
				}
			}
		}
	}
</style>
