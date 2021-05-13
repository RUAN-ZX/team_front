<template>
	<view @touchend.stop="format">
		<view>
			<u-navbar back-text="返回" title="发布组队" :is-fixed="true" :background="background"
				title-color="#f5f5f5" back-icon-color="#f5f5f5" :back-text-style="{color:'#f5f5f5'}"></u-navbar>
		</view>
		
		<view class="back-top">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>



		<view class="footBar" :style="[{display: footBarIsShow?'flex':'none'}]">
			<u-button type="error"
			@click="getBack"
			shape="square" :plain="true" :ripple="true">
				返回</u-button>
			
			<u-button type="error"
			@click="store"
			shape="square" :plain="true" :ripple="true">
				保存</u-button>
				
			<u-button type="error"
			@click="clear"
			shape="square" :plain="true" :ripple="true">
				清空</u-button>
				
			<u-button type="error"
			@click="preview"
			shape="square" :plain="false" :ripple="true">
				预览</u-button>
		</view>

		<view class="toolbar"
			:style="[
			{top: info.top+info.height+10+'px'},
			{backgroundColor:'#ffff'+m_header_opacity},
			{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			
			
			<swiper class="swiper-box" 
				easing-function="easeOutCubic"
				:current="swiperCurrent"
				circular="true"
				@change="change">
				
				
				<swiper-item class="swiper-item">
					
					
					<view class="toolbar-row">
						<view :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header"
						 :data-value="1"></view>
						<view :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')" data-name="header"
						 :data-value="2"></view>
						<view :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')" data-name="header"
						 :data-value="3"></view>
						<view :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')" data-name="header"
						 :data-value="4"></view>
						<view :class="'iconfont icon-format-header-5 ' + (formats.header === 5 ? 'ql-active' : '')" data-name="header"
						 :data-value="5"></view>
						<view :class="'iconfont icon-format-header-6 ' + (formats.header === 6 ? 'ql-active' : '')" data-name="header"
						 :data-value="6"></view>
					</view>
					
					<view class="toolbar-row">
						<view :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></view>
						<view :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></view>
						<view :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></view>
						
						<view :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')" data-name="strike"></view>
						
						<view :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')" data-name="color"
						 :data-value="fontColor" @tap="open"></view>
						<view :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')" data-name="backgroundColor"
						 data-value="#00ff00"></view>
					</view>
					<view class="indicator">{{ swiperCurrent + 1 }}/3 {{swiper_list[swiperCurrent]}}</view> 
				</swiper-item>
				
				<swiper-item class="swiper-item">
					<!-- <view :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')" data-name="fontSize"
					 data-value="24px"></view> -->
					<view class="toolbar-row">
						<!-- 对齐 -->
						<view :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></view>
						<view :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
						 data-value="center"></view>
						<view :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></view>
						<view :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align"
						 data-value="justify"></view>
						 
						 <!-- 排版 -->
						 <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
						 <view :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
						 	 data-value="ordered"></view>
						 <view :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></view>
						 
					</view>
					<view class="toolbar-row">
						
						<!-- 行距 列距 -->
						<view :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop"
						 data-value="20px"></view>
						<view :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')" data-name="marginBottom"
						 data-value="20px"></view>
						<view :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')" data-name="lineHeight" data-value="2"></view>
						
						<!-- 列距 -->
						<view :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing"
						  data-value="2em"></view>
						<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
						<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>		
					</view>
					
					<view class="indicator">{{ swiperCurrent + 1 }}/3 {{swiper_list[swiperCurrent]}}</view> 
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="toolbar-row">
						<!-- 日期 分割线 -->
						<view class="iconfont icon-date" @tap="insertDate"></view>
						<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
						<!-- 上下标 -->
						<view :class="'iconfont icon-zitixiabiao ' + (formats.script === 'sub' ? 'ql-active' : '')" data-name="script"
						 data-value="sub"></view>
						<view :class="'iconfont icon-zitishangbiao ' + (formats.script === 'super' ? 'ql-active' : '')" data-name="script"
						 data-value="super"></view>
						 
						 <view :class="'iconfont icon-direction-rtl ' + (formats.direction === 'rtl' ? 'ql-active' : '')" data-name="direction"
						  data-value="rtl"></view>
					</view>
					<view class="toolbar-row"></view>	
					<view class="indicator">{{ swiperCurrent + 1 }}/3 {{swiper_list[swiperCurrent]}}</view> 
				</swiper-item>
				
			</swiper>
			
		
			<!-- 核心四功能 -->
			<view class="toolbar-solid">
				<view class="iconfont icon-charutupian" @touchend.stop="insertImage"></view>
				
				
				<view class="iconfont icon-undo" @tap="undo"></view>
				<view class="iconfont icon-redo" @tap="redo"></view>
				
				<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
			</view>
		</view>
		
		<view class="container">
			<!-- :style="[{height: containerHeight},
			{top: containerTop}]"> -->
			
			<editor id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
			 :placeholder="placeholder" @statuschange="onStatusChange" @ready="onEditorReady">
			</editor>
		</view>
		
		<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
	
	
	</view>
</template>

<script>
	import tColorPicke from '@/components/t-color-picker.vue';

	export default {
		components: {
			't-color-picker': tColorPicke
		},
		computed:{
			containerHeight(){
				let info = this.info;
				// let topFoot = 0;
				// let bottomTool = 0;
				// const query = uni.createSelectorQuery().in(this);
				// query.select('.footBar').boundingClientRect(data => {
				// 	console.log("footBar")
				// 	console.log(data);
				// 	topFoot = data.top;
				// }).exec();
				
				// query.select('.toolbar').boundingClientRect(data => {
				// 	console.log("toolbar")
				// 	console.log(data)
				// 	bottomTool = data.bottom;
				// }).exec();
				// return topFoot-bottomTool;
				
				// return 1000 + 'px';
				// return info.windowHeight - info.top - info.height - 10 - 580/info.ratio +'px';
				
				
			},
			containerTop(){
				let info = this.info;
				// let topFoot = 0;
				// let bottomTool = 0;
				// const query = uni.createSelectorQuery().in(this);
				// query.select('.footBar').boundingClientRect(data => {
				// 	console.log("footBar")
				// 	console.log(data);
				// 	topFoot = data.top;
				// }).exec();
				
				// query.select('.toolbar').boundingClientRect(data => {
				// 	console.log("toolbar")
				// 	console.log(data)
				// 	bottomTool = data.bottom;
				// }).exec();
				// return bottomTool;
				
				return info.top+info.height+info.statusHeight+ 400/info.ratio + 100+'px';
			}
		},
		data() {
			return {
				footBarIsShow: true,
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/11.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {
					color: '#f5f5f5'
				},
				color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
				// 这里应当与之前的相同 这样更符合主题 比如project就是红色的
				swiper_list: ["字体大小 样式 颜色","字体大小 样式 颜色","字体大小 样式 颜色",],
				swiperCurrent:0,
				scrollTop: 0,
				isEdit: false,
				fontColor: '#000',
				formats: {},
				readOnly: false,
				placeholder: '开始输入... 这里 以及标题可以自定义一下 不同的发布内容不一样的自定义页面 ！然后关键是要说明 这玩意会替代之前那种简单的形式的正文 其他地方不会替代！还有就是提交的时候 应当将数据集中在哪里比较好？？？ 之前的页面把数据集中在这里呢 还是公共开一个变量存（好像听起来不错），另外 对于问题 经验 直接在这里编辑即可 无需区分是正式还是简略了！',
				keyboardHeight: 0,
				isIOS: false,
				m_header_shadow: '0000',
				m_header_opacity: '0000',
				m_header_color: 'transparent',
				m_side_toolbar_show: false,
				
				info: {},
				app: {}
			};
		},
		onLoad() {
			this.app = getApp().globalData;
			this.info = getApp().globalData.info;
			
			uni.onWindowResize((res) => {
				console.log(res);
				// footBarIsShow
			})
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop;
			
			if (e.scrollTop == 0) {
				this.m_header_shadow = '0000'
				this.m_header_opacity = '0000'
			} 
			else {
				this.m_header_opacity = 'ffff';
				this.m_header_shadow = '0020';
				this.m_header_color = '#f5f5f5';
			}
		},
		methods: {
			getBack(){
				let info = this.info;
				let topFoot = 0;
				let bottomTool = 0;
				const query = uni.createSelectorQuery().in(this);
				query.select('.footBar').boundingClientRect(data => {
					console.log("footBar")
					console.log(data);
					topFoot = data.top;
				}).exec();
				
				query.select('.toolbar').boundingClientRect(data => {
					console.log("toolbar")
					console.log(data)
					bottomTool = data.bottom;
				}).exec();
			},
			change(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				// 发出change事件，表示当前自动切换的index，从0开始
			},
			cancel() {
				this.isEdit = false;
			},
			open() {
				this.$refs.colorPicker.open();
				this.isEdit = true;
				// uni.hideKeyboard();
			},
			hideKey() {
				uni.hideKeyboard();
			},
			async confirm(e) {
				this.isEdit = false;
				this.fontColor = await e.hex;
				this.onStatusChange({
					detail: {
						color: e.hex
					}
				});
				this.$forceUpdate();
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context;
				}).exec();
			},
			undo() {
				this.editorCtx.undo();
			},

			redo() {
				this.editorCtx.redo();
			},

			blur() {
				this.editorCtx.blur();
			},

			format(e) {
				// this.hideKey();
				let {
					name,
					value
				} = e.target.dataset;
				if (!name) return; // console.log('format', name, value)
				this.editorCtx.format(name, value);
			},

			onStatusChange(e) {
				this.formats = e.detail;
			},

			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success');
					}
				});
			},

			store(e) {
				this.editorCtx.getContents({
					success: (res) => {
						uni.navigateTo({
							url: `/pages/release/project/project_preview?customContent=${encodeURIComponent(res.html)}`
						});
					}
				});
			},
			preview() {
				this.editorCtx.getContents({
					success: (res) => {
						console.log('保存内容:', res.html);
					}
				});
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success");
					}
				});
			},

			removeFormat() {
				this.editorCtx.removeFormat();
			},

			insertDate() {
				
				const date = new Date();
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				this.editorCtx.insertText({
					text: formatDate
				});
			},

			insertImage() {
				// const that = this;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							data: {
								id: 'abcd',
								role: 'god'
							},
							width: '80%',
							success: function() {
								console.log('insert image success');
							}
						});
					}
				});
			}
		}
	};
</script>
<style>
	@import "./assets/iconfont.css";
	
	
	.iconfont {
		display: inline-block;
		width: 32px;
		height: 30px;
		cursor: pointer;
		font-size: 20px;
	}
	
	
	
</style>
<style lang="scss">
	@import "@/common/uni.scss";
	@import "@/uview-ui/libs/css/style.components.scss";
	// page{
	// 	display: flex;
	// 	flex-direction: column;
	// }
	.footBar{
		padding: $padding;
		width: 100vw;
		z-index: $zindex_navbar;
		
		// height: 180rpx;
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
	.container {
		position: absolute;
		left: 0;
		width: 100%;
		top: 300px;
		.ql-container {
			width: 100%;
			
			box-sizing: border-box;
			height: 100%;
			font-size: 16px;
			line-height: 1.5;
			overflow: auto;
			padding: 0 $padding;
		}
	}
	
	
	
	.ql-active {
		color: $themeColor;
	}
	
	
	
	.toolbar {
		box-sizing: border-box;
		z-index: $zindex_navbar;
		padding: $padding;
		
		position: fixed;
		
		left: 0;
		right: 0;
		bottom: 0;
		height: 400rpx;
		.swiper-box{
			height: 240rpx;
			background-color: #f3f4f6;
			padding: $padding;
			.swiper-item{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				.toolbar-row{
					width: 100%;
					
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					
					.iconfont{
						width: auto;
						height: auto;
					}
				}
				.indicator {
					text-align: center;
					padding: 6rpx 16rpx;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 30rpx;
					font-size: 26rpx;
					color: rgba(255, 255, 255, 0.8);
				}
			}
		}
		.toolbar-solid{
			height: 80rpx;
			padding: $padding;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.iconfont{
				width: auto;
				height: auto;
			}
		}
	}
	
	
</style>

