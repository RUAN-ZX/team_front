<template>
	<view>
		<view v-for="(item, index) in dialogList" >
			<u-swipe-action :show="item.show" :index="index" 
				:key="item.id" :vibrate-short="true"
				@click="click" 
				@content-click="contentClick"
				@open="open" :options="options"
			>
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.sender.avatar" />
					
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.sender.alias }}</text>
						<text class="title u-line-2">{{ item.latestMessage.content }}</text>
					</view>
				</view>
			</u-swipe-action>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"r-dialog-entry-set",
		props:{
			dialogList:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
				dialogListIsShow: [],
				options: [
					{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		created() {
			for (let i = 0; i < this.dialogList.length; i++) {
				dialogListIsShow.push(false);
			}
		},
		methods: {
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.dialogListIsShow[index] = true;
				this.dialogListIsShow.map((val, idx) => {
					if(index != idx) this.dialogListIsShow[idx] = false;
				})
			},
			contentClick(index){
				let targetUserId = this.dialogList[index].sender.uid;
				uni.navigateTo({
					url: '/pages/root/msg/dialog/dialog?userId='+targetUserId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			click(index, index_side) {
				
				if(index_side == 1) {
					this.dialogList.splice(index, 1);
					this.dialogListIsShow.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.dialogList[index] = false;
					this.$u.toast(`收藏成功`);
					
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
