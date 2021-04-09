<template>
	<view>
		<u-navbar back-text="返回" 
			title="发布人才简历"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5"></u-navbar>
		<view class="content">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="简介" prop="intro">
					<u-input v-model="form.intro" />
				</u-form-item>
			</u-form>
		
		</view>
	</view>
</template>

<script>
	export default {
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		data() {
			return {
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/22.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {color:'#f5f5f5' },
				form: {
					name: '',
					intro: ''
				},
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					],
					intro: [
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change'
						}
					]
				}
			};
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	.content{
		border: 0;
		overflow: hidden;
		border-radius: $padding/2;
		
		padding: $padding;
		z-index: $zindex_content;
		margin: $padding;
		background-color: $cardColor;
		position: relative;
		height: auto;// 根据内容自适应高度
		// min-height: 200rpx;
		box-shadow: 6rpx 6rpx 15rpx 3rpx rgba(0,0,0,0.21);
		
		display: flex;
		flex-direction: column;
		
	}
</style>
