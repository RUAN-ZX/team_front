<template>
	<view>
		<view class="background" style="display:none">
		    <image 
		        class="preface" 
		        src="https://stea.ryanalexander.cn/psl/loading.gif"
		        mode="widthFix"
				crossorigin="anonymous"
		    >
		    </image>
		</view>
		
		<image 
			class="background" 
			crossorigin="anonymous"
			src="https://stea.ryanalexander.cn/psl/login_2.jpg"
			mode="widthFix">
		</image>
		
		<view class="login">
		    <view class="user">
		        <span class="login_iconfont psl_font icon-user"></span>
		        <u-input 
					class="user_input"
		            placeholder-class="text" 
		            type="number" 
		            :placeholder="m_login.user"
		            v-model ="Tid"/>
		    </view>
		
		    <view class="psw">
		        <span class="login_iconfont psl_font icon-captcha"></span>
		        <u-input 
					:clearable="false"
					class="psw_input"
		            placeholder-class="password" 
		            type="password" 
		            :placeholder="m_login.psw"
		            v-model = "Tpwd"/>
				
				<u-toast ref="uToast"></u-toast>
				<u-verification-code seconds="30" @end="end" @start="start" ref="uCode" 
				@change="codeChange"
				change-text="X秒后重新获取"
				start-text="点击获取验证码"
				end-text="再次获取验证码"></u-verification-code>
				
				<view class="captcha">
					<u-button 
						ripple="true"
						plain="true"
						size="mini"
						:loading="getCaptchaBtnDisabled"
						:disabled="getCaptchaBtnDisabled"
						:type="getCaptchaBtnStatus" 
						@click="getCaptcha">
						{{getCaptchaHint}}
						
					</u-button>
				</view>
				
				
		    </view>
		
		    <view class="hint">
		        {{hint}}
		    </view>
		
			<u-button @click="login" type="primary"
			:plain="false"
			:ripple="true"
			:custom-style="{fontSize:'18px'}"
			>登录</u-button>
		   
		
		    <view class="others">
		
		        <navigator class="others_email" url="/pages/emailSetting/emailSetting" hover-class="navigator-hover" open-type="navigate">
		            想换邮箱？
		        </navigator>
		        
		        
		        <navigator class="others_psw" url="/pages/pwdSetting/pwdSetting" hover-class="navigator-hover" open-type="navigate">
		            密码忘了？
		        </navigator>
		    </view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				Tid:"",
				Tpwd:"",
				hint:"",
				m_login:{
					user:"请输入职工号",
					psw:"请输入邮箱验证码"
				},
			};
		},
		methods:{
			codeChange(text) {
				this.getCaptchaHint = text;
			},
			end() {
				this.getCaptchaBtnStatus="primary";
				this.getCaptchaBtnDisabled=false;
			},
			start() {
				this.getCaptchaBtnStatus="info";
				this.getCaptchaBtnDisabled=true;
			},
			
			setHint:function (hint_) {
			  this.hint=hint_; 
			},
			
			login: function(){
			  var this_ = this;
			  
			  if(this.Tid==""){
				this_.setHint("您的职工号似乎没输入:)")
			  }
			  else if(this.Tpwd==""){
				this_.setHint("您的验证码似乎没输入:)")
			  }
			  else {
				uni.request({
				  method:'post',
				  url: this_.app.url+"/loginByPwd", 
				  data: {
					"Tid": this_.Tid,
					"Tpwd": this_.Tpwd
				  },
				  header: {
					  'content-type': 'application/x-www-form-urlencoded'
				  },
				  success: (res) => {
					if(res.data.code==0){
						uni.setStorageSync('i', this_.Tid);
						this_.Tpwd = " ";
						this_.toIndex(res);
						this_.setHint("欢迎老师 如果页面长时间没跳转 麻烦老师通知技术人员处理");
					}
					else this_.setHint(res.data.info);
				  }
				})
			  }
			},
			getCaptcha: function(){
			  let this_ = this;
			  if(this.Tid){
					uni.showLoading({
						title: '正在获取验证码'
					})
					
				  
				uni.request({
				  method:'get',
				  url: this_.app.url+"/verification/mail/register", //仅为示例，并非真实的接口地址
				  data: {
					"receiverAddress": this_.Tid
				  },
				  header: {
					  'content-type': 'application/x-www-form-urlencoded'
				  },
				  success: (res) => {
					if(res.data.code==0){
						setTimeout(() => {
							console.log(res.data);
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$refs.uToast.show({title: '验证码已发送'});
							this.setHint(res.data.info);  
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 1000);
						
					}else{
						uni.hideLoading();
						this.$refs.uToast.show({title: res.data.info});
						this.setHint(res.data.info); 
					}
				  },
				  fail:() => {
						uni.hideLoading();
						this.$u.toast('验证码发送失败');
						this.setHint("验证码发送失败");
				  }
				})
			  }
			  else this.setHint("您的职工号似乎没输入:)");
			},
			
			toIndex:function(res){
				try{
					uni.setStorageSync('a', res.data.info.a)
					uni.setStorage({key:'r',data: res.data.info.r});
					this.app.Tid=uni.getStorageSync('i');
					this.app.Tname=res.data.info.Tname;
					
					uni.switchTab({
					  url: '/pages/root/index/index'
					  
					});
				}
				catch(e){console.log(e);}
			}
		},
		
		onLoad: function (options) {
		  let this_ = this;
		  
		  this.app = getApp().globalData;
		  
		  let i = uni.getStorageSync('i');
		  let a = uni.getStorageSync('a');
		  let r = uni.getStorageSync('r');
		  if(r!=""&&i!=""){
			// console.log("2");
			uni.request({
			  method:'post',
			  url: this_.app.url+"/loginByAccess", //仅为示例，并非真实的接口地址
			  data: {
				"Tid": i,
				"access": a
			  },
			  header: {
				  'content-type': 'application/x-www-form-urlencoded'
			  },
			  success: function(res) {
				if(res.data.code==0){
				  this_.toIndex(res);
				}
				else{
				  // console.log("4");
				  uni.request({
					method:'post',
					url: this_.app.url+"/refresh", 
					data: {
					  "Tid": i,
					  "refresh": r
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						if(res.data.code==0){
							this_.toIndex(res);
						}
						else{
							console.log("refresh token failed");
						}
					}
				  })
				}
			  }
			})
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
	.login{
	  position: relative;
	  margin: 20px;
	  z-index: $zindex_content;
	  // color: @themeColor;
	  // width: 100%;
	  // height: 750rpx;
	  .user{
	    position: relative;
	    display: flex;
	    flex-direction: row;
		padding-bottom: 5px;
	    border-bottom: 1px solid $lineColor;
	    .login_iconfont{
			height: 35px;
			line-height: 35px;
			text-align: center;
			font-size: 24px;
			flex: 1;
			color: $themeColor;
			padding-bottom: 5px;
	    }
	    .user_input{
	      flex: 9;
	      font-size: 16px;
	    }
	    .text{
	      color: $labelColor;
	      font-size: 16px;
	    }
	    
	  }
	
	  .psw{
	    margin-top: 20px;
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    padding-bottom: 5px;
	    border-bottom: 1px solid $lineColor;
		.login_iconfont{
			height: 35px;
			line-height: 35px;
			text-align: center;
			font-size: 24px;
			flex: 1;
			margin-bottom: 5px;
			color: $themeColor;
		}
	    .psw_input{
			flex: 5;
			font-size: 16px;
	    }
	    .password{
	      color: $labelColor;
	      font-size: 16px;
	    }
		
	    .captcha{
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
	
	  .hint{
	    margin: 5px 0 5px 0;
	    // margin-left: 5px;
	    font-size: 14px;
	    padding-left: 5px;
	    line-height: 20px;
	    border: 1px solid $themeColor;
	    color: $themeColor;
	    border-radius: 5px;
	    word-wrap:break-word;
	
	  }
	  .loginBtn{
	    // width: 100%;
	    line-height: 40px;
	    height: 40px;
	    font-size: 20px;
	    text-align: center;
	    color: $bgColor;
	    border-radius: 10px;
	    background-color: $themeColor;
	
	  }
	  .others{
	    display: flex;
	    flex-direction: row;
	    height: 20px;
	    font-size: 15px;
	    margin-top: 10px;
	    color: $labelColor;
	    .others_email{
	      
	      text-align: left;
	      
	      flex: 1;
	      line-height: 20px;
	    }
	    .others_psw{
	      text-align: right;
	      flex: 1;
	      line-height: 20px;
	    }
	  }
	}
</style>
