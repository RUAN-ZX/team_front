<template>
	<view>
		<u-toast ref="uToast" />
		<u-navbar back-text="返回" 
		:title="title"
		:is-fixed="true"
		:background="background"
		:back-text-style="color"
		title-color="#f5f5f5"
		back-icon-color="#f5f5f5"></u-navbar>
		<view class="search">
			<search :show-action="true"
				:clearabled="true"  
				action-text="搜索" :animation="true"
				:placeholder="placeholder" 
				v-model="search_content" 
				shape="square"
				@search="search_action"
				@custom="search_action"
				ref="search">
			</search>
		</view>
		
		<view class="history">
			<view class="first">
				<span class="title">历史搜索</span>
				<span class="history_del trans">删</span>
			</view>
			
			<view class="tag">
				<view class="tag_item trans"
					v-for="(tagItem,tagIndex) in tag"
					:key="tagIndex">
					<u-tag
						:text="tagItem"
						shape="square"
						mode="light"
						:closeable="true"
						@close="tag_close(tagIndex)"
						
						type="info"
						@click="tag_click(tagItem)"
					></u-tag>
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/search/search.vue';
	var m_this;
	export default {
		components:{
			search
		},
		data() {
			return {
				background: {
					backgroundColor: '#007aff',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				color: {color:'#f5f5f5' },
				tag: [],
				title: "",
				placeholder: "",
				search_content: "",
				show_search: false
			};
		},
		methods:{
			tag_click(tagItem) {
				this.search_content = tagItem;
				this.show_search = true;
				this.$refs.search.showEx();
				// console.log(tagItem);
			},
			tag_close(tagIndex) {
				this.tag.splice(tagIndex,1);
			},
			search_action(key) {
				if(key==""){
					this.$refs.uToast.show({
						title: '搜索内容为空',
						type: 'warning'
					})
				}
				else{
					uni.navigateTo({
						url: "/pages/search/search_result/search_result?key="+key,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		},
		onLoad(res) {
			m_this = this;
			this.tag=[
				"大创",
				"省新苗",
				"小挑",
				"大挑",
				"大创",
				"省新苗",
				"小挑",
				"大挑",
				"大创",
				"省新苗",
				"小挑",
				"大挑"
			]
			if(res.e=10){
				this.title="首页搜索";
				this.placeholder="搜索所有匹配的人才 项目 问答 文章";
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	@import "./index_search.scss";
</style>
