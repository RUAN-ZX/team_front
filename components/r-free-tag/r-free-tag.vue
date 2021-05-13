<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="tag">
			<view class="tag_item" v-for="(tagItem,tagIndex) in m_tag" :key="tagIndex">
				<u-tag :text="tagItem" shape="square" mode="light" 
					:closeable="true" 
					type="primary"
					@close="tag_close(tagIndex)">
				</u-tag>
			</view>
			<view class="tag_item_ trans"
				:style="[{display: Number(m_tag.length) >= Number(tagMaxLength) ? 'none': 'flex'}]">
				<u-tag :text="addText" shape="square" mode="light" 
					:closeable="false" 
					type="info"
					@click="show = true"></u-tag>
			</view>
		</view>
		<u-popup mode="bottom" v-model="show"
			@close="popClose">
			<view class="pop-content">
				<view class="wrap_search">
					<search :show-action="true"
						:clearabled="true"  
						action-text="添加" :animation="false"
						:placeholder="placeholder" 
						v-model="label_content" 
						shape="square"
						@search="addLabel"
						@custom="addLabel"
						ref="search">
					</search>
				</view>
				
				<view class="pop-tag">
					<!-- 此处应当有关键词推荐！ 但是目前做不到 -->
					<view class="pop-tag-item trans" v-for="(tagPopItem,tagPopIndex) in m_pop_tag" :key="tagPopIndex">
						<u-tag :text="tagPopItem" shape="square" mode="light" 
							:closeable="true" 
							type="primary"
							@close="tag_pop_close(tagPopIndex)"
							@click="tag_pop_click(tagPopItem)">
						</u-tag>
					</view>
				</view>
				<!-- <view class="confrim-btn">
					<u-button @click="show = false;">确定</u-button>
				</view> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"r-free-tag",
		data() {
			return {
				show : false,
				m_tag: [],
				m_pop_tag: [],
				placeholder: "输入你想添加的标签",
				label_content: "",
				
			};
		},
		props:{
			addText: {
				type: String,
				default: "+添加标签"
			},
			NoDuplicate: {
				type: Boolean,
				default: true
			},
			tag: {
				type: Array,
				default: []
			},
			tagMaxLength:{
				type: Number,
				default: 5
			}
		},
		created() {
			this.m_tag = this.tag;
		},
		methods:{
			popClose(){
				this.m_tag.push.apply(this.m_tag,this.m_pop_tag);
				this.m_pop_tag = [];
				this.$emit("pop-tag-result",this.m_tag);
			},
			isDuplicate(key){
				for (let tag of this.m_pop_tag) 
					if(key==tag)
						return true;
				
				return false;
			},
			addLabel(key) {
				if(key==""){
					this.$refs.uToast.show({
						title: '虚空标签？',
						type: 'warning',
						position: "bottom"
					})
				}
				else if(this.m_pop_tag.length+this.m_tag.length>=this.tagMaxLength){
					this.$refs.uToast.show({
						title: '最多添加'+this.tagMaxLength+'个标签~',
						type: 'warning',
						position: "bottom"
					})
				}
				else if(this.NoDuplicate&&this.isDuplicate(key)){
					this.$refs.uToast.show({
						title: '标签重复了哟~',
						type: 'warning',
						position: "bottom"
					})
					
				}
				else{
					this.m_pop_tag.push(key);
				}
				
				this.label_content = "";
			},
			tag_close(tagIndex) {
				this.m_tag.splice(tagIndex, 1);
			},
			
			// tag_pop 关键词推荐！
			// tag_pop_click(tagItem) {
			// 	this.search_content = tagItem;
			// 	this.show_search = true;
			// },
			tag_pop_close(tagIndex) {
				this.m_pop_tag.splice(tagIndex, 1);
			},
		}
	}
</script>

<style lang="scss">
	@import "@/common/uni.scss";
	.tag{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		
		.tag_item{
			margin-top: $padding;
			margin-right: 10px;
			opacity: 0.9;
		}
		.tag_item_{
			margin-top: $padding;
			margin-right: 10px;
			opacity: 0.9;
		}
		.tag_item_:active{
			opacity: 0.1;
		}
	}

	.pop-content{
		height: auto;
		width: 100vw;
		// border-radius: $padding/2;
		padding: $padding;
		display: flex;
		flex-direction: column;
		.pop-tag{
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			
			.pop-tag-item{
				margin-top: $padding;
				margin-right: 10px;
				opacity: 0.9;
			}
		}
	}
</style>
