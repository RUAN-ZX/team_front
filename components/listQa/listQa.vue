<template>
	<view class="list-qa"
		@click="navigate_()">
		<lu-button-ripple></lu-button-ripple>
		<view class="title">
			{{title}}
		</view>
		<view class="alias-avatar-org">
			<aliasAvatarQa
			:avatar="questioner.avatar"
			:uid="questioner.uid"
			:alias="questioner.alias"
			:org="questioner.org"
			></aliasAvatarQa>
		</view>
		<view class="content">
			{{content}}
		</view>
		<view class="evaluation">
			<span class="viewed margin">
				{{m_evaluation.viewed}}浏览
			</span>
			<span class="answer margin">
				{{m_evaluation.answer}}回答
			</span>
			<span class="like margin">
				{{m_evaluation.like}}赞同
			</span>
			<span class="comment margin">
				{{m_evaluation.comment}}评论
			</span>
			<!-- 1.3w浏览 100回答 100赞同 100评论-->
		</view>
	</view>
</template>

<script>
	import aliasAvatarQa from '../aliasAvatarQa/aliasAvatarQa.vue'
	import luButtonRipple from '../lu-button-ripple/lu-button-ripple.vue';
	export default {
		name: 'listQa',
		components:{
			luButtonRipple,
			aliasAvatarQa
		},
		props: {
			title: {
				type: String,
				default: '问题'
			},
			qaid: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			questioner:{
				type: Object,
				default: function () {
					return {
							alias:'404',
							avatar:'http://sayhitotheworld.ryanalexander.cn/team/talent/sst.jpg',
							uid: '000404',
							org: '杭电404',
					}
				}
			},
			evaluation:{
				type: Object,
				default: function() {
					return {
							viewed:404,
							answer:404,
							like:404,
							comment:404
					}
				}
			}
			
		},
		// viewed:404,
		// answer:404,
		// like:404,
		// comment:404
		data() {
			return {
				m_evaluation: {
				}
			};
		},
		created() {
			for (var i in this.evaluation) { //for in 会遍历对象的属性，包括实例中和原型中的属性。（需要可访问，可枚举属性）
			    this.m_evaluation[i] = this.transNum(this.evaluation[i]);
			}
		},
		methods:{
			transNum:function(num){
				if(num>10000) return Math.round(num/10000)+'w'
				else return num;
			},
			navigate_:function(){
				uni.navigateTo({
					url: this.navigate,
				});	
			}
		},
	}
</script>

<style lang="less">
	@import "@/uni.less";
	.list-qa{
		margin-bottom: @padding/2;
		display: flex;
		flex-direction: column;
		color: @labelColor;
		border-bottom: 1px solid @lineColor;
		z-index: 0;
		position: relative; // 限定ripple在空间范围内起效果的最佳方法
		height: auto;
		width: auto;
		
		.title{
			font-size: @height_header*0.5;
			font-weight: bolder;
		}
		.alias-avatar-org{
			height: @height_header*0.7;
			line-height: @height_header*0.7;
		}
		.content{
			margin-top: @padding/2;
			color: @labelColor2;
			border: none;
			font-size: @height_header*0.4;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.evaluation{
			white-space: pre;
			color: @labelColor;
			font-size: @height_header*0.4;
			.margin{
				margin-right: @padding/2;
			}
		}
	}
</style>
