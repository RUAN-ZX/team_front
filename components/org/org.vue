<template>
	<view class="org trans"
		:style="[{display:m_display},{height:m_height},{lineHeight:m_height}]">
		<span class="org-tag"
			:class="[this.m_icon[type]]">
			企
		</span>	
		<!-- 应当开发这个组件 项目也有归属 很重要 -->
		<span class="org-name">
			{{m_org}}
		</span>
	</view>
</template>

<script>
	export default {
		name: "org",
		props: {
			org:{
				type: [String],
				default: ""
			},
			height:{
				type: String,
				default: "60rpx"
			},
			type:{
				type: String,
				default: "1"
			}
		},
		data() {
			return {
				m_org: '',
				m_display: 'none',
				m_height: '60rpx'
				/* 有多种图标选择再说
					m_icon:[
						
					],
				*/
			};
		},
		created() {
			if(this.type=="0"&&org=="")
				this.m_display="none";
			else{
				this.m_display="inline-block";
				this.m_org=this.org;
				this.m_height=this.height;
			}
		}
		
	}
</script>

<style lang="less">
	@import "@/uni.less";
	.org{
		display: flex;
		flex-direction: row;
		
		height: @height_header; // 根据父组件大小来搞定自己大小 妙啊 否则你需要传参 恶心
		line-height: @height_header; 
		.org-tag{
			color: @labelColor2;
			font-size: @height_header*0.5;
		}
		.org-name{
			margin-left: @padding/3;
			text-align: left;
			color: @labelColor;
			font-size: @height_header*0.4;
			
			word-break: break-all;
			white-space:nowrap; 
			text-overflow: ellipsis;  /* 超出部分省略号 */
			overflow: hidden;  /*超出隐藏*/
		}
	}
	
</style>
