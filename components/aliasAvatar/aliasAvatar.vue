<template>
	<view
		class="alias-avatar trans"
		:style="[{width:m_width}]"
		@click="navigate()">
		
		<view class="avatar">
			<image 
				:src="m_avatar" class="avatar-image" mode="scaleToFill">
			</image>
		</view>
		
		<view class="alias"
			:style="{fontSize:m_font_size}">
			{{m_alias}}
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'aliasAvatar',
		props: {
			font_size: {
				type: String,
				default: '36rpx'
			},
			width: {
				type: String,
				default: ''
			},
			alias: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			},
			uid: {
				type: String,
				default: ''
			},
			access: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				m_alias: '',
				m_avatar: '',
				m_width: '',
				m_font_size: ''
			};
		},
		created() {
			this.m_font_size = this.font_size;
			this.m_avatar = this.avatar;
			this.m_alias = this.alias;
			setTimeout(() => {
			    this.m_width = this.width;
			},10);// 实测效果可以 避免Onload获取不到 数据未更新
			
			// var timesRun = 0;
			// var interval = setInterval(function(){
			// 	timesRun += 1;
			// 	if(this.width != 0||this.width != ''){
			// 		clearInterval(interval);
			// 		this.m_width = this.width;
			// 	}
			// 	else if(timesRun==10){
			// 		clearInterval(interval);
			// 		this.m_width = '200px';
			// 	}
				
			// }, 10);
			
		},
		methods:{
			navigate() {
				uni.navigateTo({
					url: '/pages/resume/resume?uid='+this.uid,
					
				});	
				/* 有接口了再考虑 其实客户一般不会使用错误的access token
				uni.request({
					url: 'http://localhost/myUniApp/php/login.php', 
					data: {
						access: this.token,
						uid: this.uid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
							
					},
					method:'POST',
					success: res => {
						uni.navigateTo({
							url: '/pages/resume/resume',
						});	
					}),
					fail:res =>{
						console.log("fail")
						// toast
					},
				})
				*/
			}
		}
	}
</script>

<style lang="less">
	@import "./aliasAvatar.less";
	@import "@/uni.less";
</style>
