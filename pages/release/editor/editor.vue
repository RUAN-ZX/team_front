<template>
	<view @touchend.stop="format">
		<view>
			<u-navbar back-text="返回" title="发布组队" :is-fixed="true" :background="background" :back-text-style="color"
				title-color="#f5f5f5" back-icon-color="#f5f5f5"></u-navbar>
		</view>
		
		<view class="back-top">
				<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>

		<view class="container">
			<editor id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
			 :placeholder="placeholder" @statuschange="onStatusChange" @ready="onEditorReady">
			</editor>
		</view>

		<view class="foot" >
			<i class="foot-item iconfont icon-baocun" @tap="store" id="1">保存</i>
			
			<i class="foot-item iconfont icon-shanchu" @tap="clear">删除</i>
			
			<i class="foot-item iconfont icon-preview" @tap="store" id="2">预览</i>
			
			<!-- <i class="iconfont icon-quanping"></i> -->
			
			
		</view>

		<view class="toolbar"
			:style="[{bottom: (isIOS ? keyboardHeight : 0) + 'px'},
			{top: info.top+info.height+10+'px'},
			{backgroundColor:'#ffff'+m_header_opacity},
			{boxShadow: '6rpx 6rpx 15rpx 3rpx #0000'+m_header_shadow}]">
			
			
			<swiper class="swiper-box" 
				easing-function="easeOutCubic"
				:current="swiperCurrent"
				circular="true"
				@change="change"
				:style="[{height: '100px'},{backgroundColor: '#f3f4f6'}]">
				
				
				<swiper-item class="swiper-item">
					
					
					<view class="toolbar-row">
						<i :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header"
						 :data-value="1"></i>
						<i :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')" data-name="header"
						 :data-value="2"></i>
						<i :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')" data-name="header"
						 :data-value="3"></i>
						<i :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')" data-name="header"
						 :data-value="4"></i>
						<i :class="'iconfont icon-format-header-5 ' + (formats.header === 5 ? 'ql-active' : '')" data-name="header"
						 :data-value="5"></i>
						<i :class="'iconfont icon-format-header-6 ' + (formats.header === 6 ? 'ql-active' : '')" data-name="header"
						 :data-value="6"></i>
					</view>
					
					<view class="toolbar-row">
						<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
						<i :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
						<i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></i>
						
						<i :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')" data-name="strike"></i>
						
						<i :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')" data-name="color"
						 :data-value="fontColor" @tap="open"></i>
						<i :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')" data-name="backgroundColor"
						 data-value="#00ff00"></i>
					</view>
				</swiper-item>
				
				<swiper-item class="swiper-item">
					<!-- <i :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily" data-value="Pacifico"></i>
					<i :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')" data-name="fontSize"
					 data-value="24px"></i> -->
					<view class="toolbar-row">
						<!-- 对齐 -->
						<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
						<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
						 data-value="center"></i>
						<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
						<i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align"
						 data-value="justify"></i>
						 
						 <!-- 排版 -->
						 <i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
						 <i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
						 	 data-value="ordered"></i>
						 <i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
						 
					</view>
					<view class="toolbar-row">
						
						<!-- 行距 列距 -->
						<i :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop"
						 data-value="20px"></i>
						<i :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')" data-name="marginBottom"
						 data-value="20px"></i>
						<i :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')" data-name="lineHeight" data-value="2"></i>
						
						<!-- 列距 -->
						<i :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing"
						  data-value="2em"></i>
						<i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
						<i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>		
					</view>
					
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="toolbar-row">
						<!-- 日期 分割线 -->
						<i class="iconfont icon-date" @tap="insertDate"></i>
						<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
						<!-- 上下标 -->
						<i :class="'iconfont icon-zitixiabiao ' + (formats.script === 'sub' ? 'ql-active' : '')" data-name="script"
						 data-value="sub"></i>
						<i :class="'iconfont icon-zitishangbiao ' + (formats.script === 'super' ? 'ql-active' : '')" data-name="script"
						 data-value="super"></i>
						 
						 <i :class="'iconfont icon-direction-rtl ' + (formats.direction === 'rtl' ? 'ql-active' : '')" data-name="direction"
						  data-value="rtl"></i>
					</view>
					 
				</swiper-item>
				
			</swiper>
			<view class="u-swiper-indicator" :style="{
					top: 'auto',
					bottom: '12rpx',
					justifyContent: 'center',
					padding: '0 24rpx'
				}">
				
				<view class="u-indicator-item-number">{{ swiperCurrent + 1 }}/3 {{swiper_list[swiperCurrent]}}</view>
			</view>
		
		
			<!-- 核心四功能 -->
			<view class="toolbar-solid">
				<i class="iconfont icon-charutupian" @touchend.stop="insertImage"></i>
				
				
				<i class="iconfont icon-undo" @tap="undo"></i>
				<i class="iconfont icon-redo" @tap="redo"></i>
				
				<i class="iconfont icon-clearedformat" @tap="removeFormat"></i>
			</view>
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
		data() {
			return {
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/11.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {
					color: '#f5f5f5'
				},
				// 这里应当与之前的相同 这样更符合主题 比如project就是红色的
				swiper_list: ["字体大小 样式 颜色","字体大小 样式 颜色","字体大小 样式 颜色",],
				swiperCurrent:0,
				scrollTop: 0,
				color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
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
				
				info: {}
			};
		},
		onLoad() {
			this.info = getApp().globalData.info;
			// this.statusHeight = uni.getStorageSync("statusHeight");
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
					success: function(res) {
						e.currentTarget.id == 1 ? console.log('保存内容:', res.html) : uni.navigateTo({
							url: `/pages/release/project/project_preview?customContent=${encodeURIComponent(res.html)}`
						});
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
	page{
		display: flex;
		flex-direction: column;
	}
	.container {
		top: 200px;
		flex: 1;
		position: relative;
		width: 100%;
		height: auto;
		
		.ql-container {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			font-size: 16px;
			line-height: 1.5;
			overflow: auto;
			padding: 20px 10px 20px 10px;
		}
	}
	
	
	
	.ql-active {
		color: $themeColor;
	}
	
	
	.side-toolbar-btn{
		z-index: 99;
		position: absolute;
		width: 20px;
		height: 60px;
		top: 400px;
		right: 0;
		background-color: $themeColor;
		color: $bgColor;
		
	}
	
	
	.toolbar {
		z-index: 99;
		padding: $padding;
		
		
		text-align: left;
		position: fixed;
		// top: 32; // 动态
		left: 0;
		right: 0;
		bottom: 0;
		height: 160px;
		
		width: 100%;
		
		flex-wrap: wrap;
		text-align: center;
		.swiper-item{
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			.toolbar-row{
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: row;
				.iconfont{
					flex: 1;
				}
			}
		}
		
	
	}
	.toolbar-solid{
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-direction: row;
		.iconfont{
			flex: 1;
		}
	}
	
	
	.foot{
		position: fixed;
		width: 100%;
		bottom: 0;
		right: 0;
		left: 0;
		
		background-color: #333333;
		color: #F3F4F6;
		display: flex;
		flex-direction: row;
		height: 30px;
		line-height: 30px;
		.foot-item{
			display: inline-block;
			vertical-align: middle;
			flex: 1;
			font-size: 16px;
			justify-content: center;
			text-align: center;
		}
	}
	
</style>

<style lang="scss" scoped>
	@import "@/uview-ui/libs/css/style.components.scss";
	.u-swiper-indicator {
		@include vue-flex;
		width: 100%;
		z-index: 1;
	}
	.u-indicator-item-number {
		padding: 6rpx 16rpx;
		line-height: 1;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 100rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}
</style>

