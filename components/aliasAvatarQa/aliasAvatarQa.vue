<template>
	<view class="qa">
		<view
			class="alias-avatar"
			@click="navigate()">
			
			<view class="avatar">
				<image 
					:src="avatar" class="avatar-image" mode="scaleToFill">
				</image>
			</view>
			
			<view class="alias"
				:style="{fontSize:font_size}">
				{{alias}}
			</view>
			
		</view>
		<view class="org">
			<org :org="org"
			height="36rpx"></org>
		</view>
		
	</view>
	
</template>

<script>
	import org from '../org/org.vue'
	export default {
		name: 'aliasAvatarQa',
		components:{
			org
		},
		props: {
			font_size: {
				type: String,
				default: '36rpx'
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
			org: {
				type: String,
				default: ''
			}
			
		},
		// 获取access以及refresh的逻辑可以封装一下 因为每个页面应该都用得到
		data() {
			return {
				// m_alias: '',
				// m_avatar: '',
				// m_font_size: ''
			};
		},
		created() {
			// this.m_font_size = this.font_size;
			// this.m_avatar = this.avatar;
			// this.m_alias = this.alias;
			// this.m_org = this.org;
			
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
	@import "./aliasAvatarQa.less";
	@import "@/uni.less";
</style>
