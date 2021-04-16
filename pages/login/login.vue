<template>
	<view>
		<u-toast ref="uToast" />
		<view class="background" style="display:none">
			<image class="preface" src="https://stea.ryanalexander.cn/psl/loading.gif" mode="widthFix"
				crossorigin="anonymous">
			</image>
		</view>

		<image class="background" crossorigin="anonymous" src="https://stea.ryanalexander.cn/psl/login_2.jpg"
			mode="widthFix">
		</image>



		<view class="login">
			<view class="tabs-box">
				<u-tabs-swiper activeColor="#007aff" ref="tabs" :list="tab_list" :current="current" @change="change"
					:is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiperWrap" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="wechat">
							微信登录
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="nonCaptcha">
							<span class="nonCaptcha_iconfont psl_font icon-user"></span>
							<u-input class="nonCaptcha_input" placeholder-class="nonCaptcha_text" type="number"
								:placeholder="m_login[0].user" v-model="Tid" />
						</view>
			
						<view class="withCaptcha">
							<span class="withCaptcha_iconfont psl_font icon-captcha"></span>
							<u-input :clearable="false" class="withCaptcha_input"
								placeholder-class="withCaptcha_text" type="password" :placeholder="m_login[0].psw"
								v-model="Tpwd" />
			
			
							<u-verification-code seconds="30" @end="end" @start="start" ref="uCode"
								@change="codeChange" change-text="X秒后重新获取" start-text="点击获取验证码" end-text="再次获取验证码">
							</u-verification-code>
			
							<view class="captcha">
								<u-button ripple="true" plain="true" size="mini" :loading="getCaptchaBtnDisabled"
									:disabled="getCaptchaBtnDisabled" :type="getCaptchaBtnStatus"
									@click="getCaptcha">
									{{getCaptchaHint}}
			
								</u-button>
							</view>
						</view>
			
						<u-button @click="login(0)" type="primary" :plain="false" :ripple="true"
							:custom-style="{fontSize:'18px'}">登录/注册</u-button>
			
			
						<view class="others">
							<navigator class="others_email" url="/pages/emailSetting/emailSetting"
								hover-class="navigator-hover" open-type="navigate">
								想换邮箱？
							</navigator>
			
			
							<navigator class="others_psw" url="/pages/pwdSetting/pwdSetting"
								hover-class="navigator-hover" open-type="navigate">
								收不到邮箱验证码？
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="nonCaptcha">
							<span class="nonCaptcha_iconfont psl_font icon-user"></span>
							<u-input class="nonCaptcha_input" placeholder-class="nonCaptcha_text" type="number"
								:placeholder="m_login[1].user" v-model="Tid" />
						</view>
			
						<view class="withCaptcha">
							<span class="withCaptcha_iconfont psl_font icon-captcha"></span>
							<u-input :clearable="false" class="withCaptcha_input"
								placeholder-class="withCaptcha_text" type="password" :placeholder="m_login[1].psw"
								v-model="Tpwd" />
			
			
							<u-verification-code seconds="30" @end="end" @start="start" ref="uCode"
								@change="codeChange" change-text="X秒后重新获取" start-text="点击获取验证码" end-text="再次获取验证码">
							</u-verification-code>
			
							<view class="captcha">
								<u-button ripple="true" plain="true" size="mini" :loading="getCaptchaBtnDisabled"
									:disabled="getCaptchaBtnDisabled" :type="getCaptchaBtnStatus"
									@click="getCaptcha">
									{{getCaptchaHint}}
			
								</u-button>
							</view>
						</view>
			
						<u-button @click="login(1)" type="primary" :plain="false" :ripple="true"
							:custom-style="{fontSize:'18px'}">登录/注册</u-button>
			
			
						<view class="others">
							<navigator class="others_email" url="/pages/emailSetting/emailSetting"
								hover-class="navigator-hover" open-type="navigate">
								换绑？
							</navigator>
			
			
							<navigator class="others_psw" url="/pages/pwdSetting/pwdSetting"
								hover-class="navigator-hover" open-type="navigate">
								收不到短信验证码？
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="nonCaptcha">
							<span class="nonCaptcha_iconfont psl_font icon-user"></span>
							<u-input class="nonCaptcha_input" placeholder-class="nonCaptcha_text" type="number"
								:placeholder="m_login[2].user" v-model="Tid" />。
						</view>
			
						<view class="nonCaptcha">
							<span class="nonCaptcha_iconfont psl_font icon-captcha"></span>
							<u-input :clearable="false" class="nonCaptcha_input" placeholder-class="nonCaptcha_text"
								type="password" :placeholder="m_login[2].psw" v-model="Tpwd" />
						</view>
			
						<u-button @click="login(2)" type="primary" :plain="false" :ripple="true"
							:custom-style="{fontSize:'18px'}">登录</u-button>
			
			
						<view class="others">
							<navigator class="others_email" url="/pages/emailSetting/emailSetting"
								hover-class="navigator-hover" open-type="navigate">
								固定密码注册？
							</navigator>
			
			
							<navigator class="others_psw" url="/pages/pwdSetting/pwdSetting"
								hover-class="navigator-hover" open-type="navigate">
								密码忘了？
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="otherLogin">
			<view class="otherLoginItem" v-for="(loginItem,loginIndex) in loginMethods" :key="loginIndex">
				<image mode="scaleToFill" class="otherLoginItemImage"
				:src="loginItem"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginMethods:[
					"https://stea.ryanalexander.cn/login/QQ.png",
					"https://stea.ryanalexander.cn/login/GitHub.png",
					"https://stea.ryanalexander.cn/login/linkedin.png"
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tab_list: [
				{
					name: '微信登录',
					num: 0
				},
				{
					name: '邮箱验证码',
					num: 1
				}, {
					name: '手机验证码',
					num: 2
				}, {
					name: '账号密码',
					num: 3
				}],
				getCaptchaStyle: {
					flex: "3",
					textAlign: "center",
					height: "35px",
					lineHeight: "35px",
					fontSize: "12px"
				},
				getCaptchaBtnDisabled: false,
				getCaptchaBtnStatus: "primary",
				getCaptchaHint: "获取验证码",
				app: {},
				picUrl: "",
				
				Tid: "",
				Tpwd: "",
				
				m_login: [{
						user: "请输入邮箱",
						psw: "请输入邮箱验证码",
						blank:{
							user: "你的邮箱似乎没输入",
							psw: "你的邮箱验证码似乎没输入"
						},
						wrong:{
							user: "这个邮箱似乎不存在",
							psw: "验证码错了哟"
						}
					},
					{
						user: "请输入手机号",
						psw: "请输入短信验证码",
						blank:{
							user: "你的手机号似乎没输入",
							psw: "你的短信验证码似乎没输入"
						},
						wrong:{
							user: "这个手机号似乎不存在",
							psw: "验证码错了哟"
						}
					},
					{
						user: "请输入账号 如手机号 邮箱",
						psw: "请输入相应密码",
						blank:{
							user: "你的账号似乎没输入",
							psw: "你的密码似乎没输入"
						},
						wrong:{
							user: "这个用户似乎不存在",
							psw: "密码错了哟"
						}
					},
				]
			};
		},
		onLoad(options) {
			this.app = getApp().globalData;
			
			let i = uni.getStorageSync('i');
			let a = uni.getStorageSync('a');
			let r = uni.getStorageSync('r');
			if (r != "" && i != "") {
				uni.request({
					method: 'get',
					url: this.app.url + "/loginByToken", //仅为示例，并非真实的接口地址
					data:{
						"userId": i
					},
					header: this.app.genHeader(a,r),
					success: (res) => {
						if (res.data.code == 200) this.toIndex_(res);
						else console.log("refresh token failed");
					},
					complete: (res) => {
						console.log(res);
					}
				})
			}
		},
		methods: {
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
			
			animationfinish({detail: {current}}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			codeChange(text) {
				this.getCaptchaHint = text;
			},
			end() {
				this.getCaptchaBtnStatus = "primary";
				this.getCaptchaBtnDisabled = false;
			},
			start() {
				this.getCaptchaBtnStatus = "info";
				this.getCaptchaBtnDisabled = true;
			},
			setHint(hint) {
				this.$refs.uToast.show({
					title: hint
				});
			},
			login(methods) {
				if(methods>3&&methods<1) console.log("invalid methods code");

				if (this.Tid == "") {
					this.setHint(this.m_login[methods].blank.user)
				} else if (this.Tpwd == "") {
					this.setHint(this.m_login[methods].blank.psw)
				} else {
					switch(methods){
						case 0:{
							uni.request({
								method: 'post',
								url: this.app.url + "/loginRegByCaptcha/mail",
								data: {
									"mail": this.Tid,
									"captcha": this.Tpwd
								},
								header: this.app.genHeader("",""),
								success: (res) => {
									if (res.data.code == 200) {
										this.toIndex(res);
										this.setHint("欢迎您 如果页面长时间没跳转 麻烦老师通知技术人员处理");
									} else this.setHint(res.data.info);
								},
								
								fail: (res)=>{
									console.log(res)
								},
		
								//ryan_alexander@hzbytecloud.cn
							})
							break;
						}
						case 1:{
							this.setHint("道歉 暂时不支持手机登录")
							break;
						}
						case 2:{
							uni.request({
								method: 'post',
								url: this.app.url + "/loginByPwd/mail",
								data: {
									"mail": this.Tid,
									"password": this.Tpwd
								},
								header: this.app.genHeader("",""),
								success: (res) => {
									if (res.data.code == 200) {
										this.toIndex(res);
										this.setHint("欢迎您 如果页面长时间没跳转 麻烦老师通知技术人员处理");
									} else this.setHint(res.data.msg);
								},
								
								fail: (res)=>{
									console.log(res)
								},
									
								//ryan_alexander@hzbytecloud.cn
							})
							break;
						}
					}
				}
			},
			getCaptcha() {
				if (this.Tid) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					uni.request({
						method: 'get',
						url: this.app.url + "/getCaptcha/mail", //仅为示例，并非真实的接口地址
						data: {
							"receiverAddress": this.Tid
						},
						header: this.app.genHeader("",""),
						success: (res) => {
							if (res.data.code == 200) {
								setTimeout(() => {
									uni.hideLoading();
									this.setHint('发送成功');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
								}, 1000);

							} else {
								uni.hideLoading();
								this.setHint(res.data.msg);

							}
						},
						fail: () => {
							uni.hideLoading();
							this.setHint('网络问题');

						}
					})
				} else this.setHint('您的邮箱似乎没输入:)');
			},

			toIndex(res) {
				try {
					uni.setStorageSync("i",res.data.data);
					uni.setStorageSync("r",res.header['x-auth-token']);
					uni.setStorageSync("a",res.header['x-access-token']);
					uni.switchTab({
						url: '/pages/root/index/index'
					});
				} catch (e) {
					console.log(e);
				}
			},
			toIndex_(res) {
				try {
					uni.setStorageSync("r",res.header['x-auth-token']);
					uni.setStorageSync("a",res.header['x-access-token']);
					uni.switchTab({
						url: '/pages/root/index/index'
					});
				} catch (e) {
					console.log(e);
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";

	.background {
		width: 750rpx;
		position: relative;
		z-index: $zindex_bg;
	}


	.login {
		position: relative;
		margin: 20px;
		z-index: $zindex_content;

		.tabs-box {
			position: relative;
		}

		.swiperWrap {
			height: 200px;
			
			.swiper-item{
				height: 200px;
				.nonCaptcha {
					margin-top: $padding;
					position: relative;
					display: flex;
					flex-direction: row;
					padding-bottom: 5px;
					border-bottom: 1px solid $lineColor;
				
					.nonCaptcha_iconfont {
						height: 35px;
						line-height: 35px;
						text-align: center;
						font-size: 24px;
						width: 35px;
						color: $themeColor;
						padding-bottom: 5px;
					}
				
					.nonCaptcha_input {
						flex: 1;
						font-size: 16px;
					}
				
					.nonCaptcha_text {
						color: $labelColor;
						font-size: 16px;
					}
				
				}
				
				.withCaptcha {
					margin-top: $padding;
					position: relative;
					display: flex;
					flex-direction: row;
					padding-bottom: 5px;
					border-bottom: 1px solid $lineColor;
				
					.withCaptcha_iconfont {
						height: 35px;
						line-height: 35px;
						text-align: center;
						font-size: 24px;
						width: 35px;
						margin-bottom: 5px;
						color: $themeColor;
					}
				
					.withCaptcha_input {
						flex: 5;
						font-size: 16px;
					}
				
					.withCaptcha_text {
						color: $labelColor;
						font-size: 16px;
					}
				
					.captcha {
						flex: 4;
						// margin: 0 0 0 @padding;
						// text-align: center;
						// height: 35px;
						// line-height: 35px;
						// font-size: 12px;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 5px;
					}
				}
				
				.loginBtn {
					// width: 100%;
					line-height: 40px;
					height: 40px;
					font-size: 20px;
					text-align: center;
					color: $bgColor;
					border-radius: 10px;
					background-color: $themeColor;
				
				}
				
				.others {
					display: flex;
					flex-direction: row;
					height: 20px;
					font-size: 15px;
					margin-top: 10px;
					color: $labelColor;
				
					.others_email {
				
						text-align: left;
				
						flex: 1;
						line-height: 20px;
					}
				
					.others_psw {
						text-align: right;
						flex: 1;
						line-height: 20px;
					}
				}
			}
		}
	}
	.otherLogin{
		height: auto;
		width: 100vw;
		padding: $padding;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.otherLoginItem{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			.otherLoginItemImage{
				border-radius: 100%;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
