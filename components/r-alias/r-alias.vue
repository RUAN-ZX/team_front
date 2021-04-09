<template>
	<view
		class="r-alias trans"
		@click="navigate()">
		
		<view class="avatar">
			<image class="avatar-image" 
				:src="avatar"
				mode="widthFix">
			</image>
		</view>
		<view class="alias-block">
			<view class="alias">
				<span class="alias-name">{{alias}}</span>
				<span class="alias-certification">
					<u-tag
						size="mini"
						:text="m_text" 
						:type="m_type"
						shape="square"
						mode="light"
						:closeable="false"
						border-color="transparent"></u-tag>
				</span>
			</view>
			<view class="dis">
				{{discription}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'aliasAvatar',
		props: {
			discription: {
				type: String,
				default: ''
			},
			certification: {
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
		},
		// 获取access以及refresh的逻辑可以封装一下 因为每个页面应该都用得到
		data() {
			return {
				m_type: "",
				m_text: ""
			};
		},
		created() {
			switch(this.certification){
				// 未认证
				case "":{
					this.m_type="";
					this.m_text="";
					break;
				}
				case "1":{
					this.m_type="info";
					this.m_text="在校学生";
					break;
				}
				case "2":{
					this.m_type="warning";
					this.m_text="在职教师";
					break;
				}
				case "3":{
					this.m_type="warning";
					this.m_text="企业任职";
					break;
				}
			}
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

<style lang="scss">
	@import "@/common/uni.scss";
	.r-alias{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		.avatar{
			width: 70rpx;
			height: 70rpx;
			margin-right: $padding;
			.avatar-image{
				width:100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		.alias-block{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: flex-start;
			
			.alias{
				display: flex;
				flex-direction: row;
				justify-content: left;
				align-items: center;
				.alias-name{
					font-size: 30rpx;
					font-weight: bolder;
					color: $labelColor2;
				}
				.alias-certification{
					margin-left: $padding;
				}
			}
			.dis{
				margin-top: 4px;
				color: $labelColor;
				font-size: 20rpx;
			}
		}
	}
</style>
