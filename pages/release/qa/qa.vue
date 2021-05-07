<template>
	<view> 
		<u-navbar back-text="返回" 
			title="提问题"
			:is-fixed="true"
			:background="background"
			:back-text-style="color"
			title-color="#f5f5f5"
			back-icon-color="#f5f5f5"></u-navbar>
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item prop="title">
					<u-input border="true" v-model="model.title" 
					placeholder="问题标题 一个好的标题能够吸引更多的人来帮助" type="text"/>
				</u-form-item>
				
				<u-form-item prop="qaTag" :label-position="labelPosition" label="问题标签">
					<u-input type="text" :border="false" 
					placeholder="通过标签分类 让大家能够专业对口 解答你的疑惑" disabled="true"> 
					</u-input>
					<r-free-tag v-model="model.qaTag" tagMaxLength="5" @pop-tag-result="(data)=>{model.projectTag=data}"></r-free-tag>
				</u-form-item>
				
				<u-form-item prop="intro" label="问题详情" :label-position="labelPosition">
					<u-button type="success"
					@click="customize"
					shape="square" :plain="true" :ripple="true">
						点击进入编辑界面</u-button>
				</u-form-item>
				<!-- 暂时先 基本信息编辑 -> 正文编辑 预览 提交 所以前面的简单内容传送到后面？数据太多了啊 还是全局为好 还可以保存草稿之类的  -->
				
			</u-form>
		
		</view>
	</view>
</template>

<script>
	import rFreeTag from "@/components/r-free-tag/r-free-tag.vue";
	
	export default {
		components: {
			rFreeTag
		},
		
		data() {
			return {
				errorType: ['message'],
				labelPosition: 'top',
				background: {
					backgroundSize: '100% 100%',
					background: 'url(https://stea.ryanalexander.cn/navbar/33.jpg) no-repeat'
				},
				color: {color:'#f5f5f5' },
				model: {
					title: '',
					qaTag: []
				},
				rules: {
					title: [
						{
							required: true,
							message: '请输入问题标题',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'change'
						},
						{
							min: 3,
							max: 20,
							message: '问题标签长度在3到20个字符',
							trigger: ['change'],
						}
					],
					qaTag: [{
							required: true,
							message: '请输入问题标签',
							trigger: 'change'
						},
						{
							trigger: ['change'],
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.model.qaTag.length>0;
							},
							message: '至少有一个标签',
						}
					],
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		method: {
			
		},
		onLoad() {
			
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
