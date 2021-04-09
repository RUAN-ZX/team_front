<template>
	<view
		class="alias-avatar trans"
		:style="[{width:m_width}]"
		@click="navigate()">
		
		<view class="avatar">
			<image class="avatar-image" 
				:src="talentItem.talent.avatar"
				mode="widthFix">
			</image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'aliasAvatar',
		props: {
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
			// access: {
			// 	type: String,
			// 	default: ''
			// }
			// 等到进入resume页面 onload再利用access进行request 而不是这里传 传的话意义不大
		},
		// 获取access以及refresh的逻辑可以封装一下 因为每个页面应该都用得到
		data() {
			return {
				m_alias: '',
				m_avatar: '',
				m_width: ''
			};
		},
		created() {
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
	// @import "./aliasAvatar.less";
	// @import "@/uni.less";
</style>
