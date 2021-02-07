<template>
	<view class="org trans"
		:style="{display:m_display}">
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
			}
		},
		data() {
			return {
				m_org: '',
				m_display: 'none',
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
			}
		}
		
	}
</script>

<style lang="less">
	@import "@/uni.less";
	.org{
		display: flex;
		flex-direction: row;
		height: @height_header;
		line-height:@height_header;
		vertical-align: middle;
		.org-tag{
			
			color: @labelColor2;
			// overflow: hidden;
			vertical-align: middle;
			height: @height_header*0.45;
			font-size: @height_header*0.45;
		}
		.org-name{
			margin-left: @padding/3;
			text-align: left;
			color: @labelColor;
			font-size: @height_header*0.45;
			vertical-align: middle;
			
			word-break: break-all;
			white-space:nowrap; 
			text-overflow: ellipsis;  /* 超出部分省略号 */
			overflow: hidden;  /*超出隐藏*/
		}
	}
	
	.org:active{
		opacity: 0.1;
	}
	
	.trans {
		transition: 0.3s opacity ease-out;
	}
</style>
