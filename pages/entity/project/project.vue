<template>
	<view>
		<u-toast ref="uToast" />
		<u-navbar back-text="返回"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5">
				<view class="title" @click="navigate('/pages/root/me/me_external/me_external')">
					{{projectInfo.title}}
				</view>
		</u-navbar>
	</view>
</template>

<script>
	import {getUserInfo} from '@/api/api.js';
	export default {
		data() {
			return {
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/22.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {color:'#f5f5f5' },
				userInfo: {},
				projectInfo: {}
			};
		},
		onLoad(res) {
			console.log(res.projectId);
			
			this.projectInfo = requestProjectInfo(res.projectId);
			
			this.userInfo = this.requestUserInfo(this.projectInfo.creatorUserId);
		},
		methods:{
			requestProjectInfo(projectId){
				uni.request({
					method: 'get',
					url: this.app.url + "/recruiting/"+this.projectId,
					header: this.app.genHeader(this.app.token.a,this.app.token.r),
					success: (res) => {
						return res.data.data;
					},
					fail: (res)=>{console.log(res)},
				})
			},
			requestUserInfo(){
				uni.request({
					method: 'get',
					url: this.app.url + "/userInfo/"+this.userId,
					header: this.app.genHeader(this.app.token.a,this.app.token.r),
					success: (res) => {
						return res.data.data;
					},
					fail: (res)=>{console.log(res)},
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	.title{
		color: $cardColor;
		font-weight: bolder;
		text-align: center;
		
	}
</style>
