<template name='up-image'>
	<view class="up-image_list">
		<view class="up-image_item" v-for="(item, index) in imagelist" :key="index">
			<image :src="item" mode="aspectFill"></image>
			<view class="up-image_progress" :data-index="index" @tap="pImage"></view>
			<text class='del' @tap='deleteImg' :data-index="index"></text>
		</view>
		<view class='up-image_item' v-if="imagelist.length < count" @tap='upyImg(count)'>
			<image class="image" src="./static/icon-photo.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
    import {UploadPictures} from './upImage.js'
	export default {
		data() {
			return {
				imagelist: [],
				param: {
					"storageURL":'https://stea.ryanalexander.cn',
					"uploadURL":"https://v0.api.upyun.com/",
					"bucketname":"lets-team",
					"operator":"ryan",
					"pathNameFormat":"/{year}-{mon}-{day}/upload_{random32}{.suffix}",
					"quality":"80",
					"expiration":"315360000"
				},
			};
		},
		name: 'up-image',
		props: {
            // 选择多少张
			count: {
				type: Number,
				default: 1
			}
		},
		methods: {
            // 预览图片
            pImage(e) {
            	let self = this;
            	uni.previewImage({
            		current: self.imagelist[e.currentTarget.dataset.index],
            		urls: self.imagelist
            	})
            },
            //删除图片
            deleteImg(e) {
				let self = this;
				self.imagelist.splice(e.currentTarget.dataset.index, 1);
            },
            upyImg(){
                // 使用方法
                let self = this
                UploadPictures(self.param,self.count).then(function(value) {
                    console.log(value)
                    self.imagelist = value.concat(self.imagelist)
                });
            }
		}
	}
	
</script>

<style lang="css" type="text/css" scoped>
	.up-image_list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: center;
		flex-direction: row;
		justify-content: flex-start;
		flex: 1;
		max-width: 570upx;
	}

	.up-image_item {
		margin: 22upx;
		position: relative;
		width: 140upx;
		height:140upx;
		margin-right: 0;
	}
   .up-image_item .image {
		width: 140upx;
		height:140upx;
		/* margin: 10upx; */
		background-image: url('./static/icon-photo.png');
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
	 }
	.up-image_item .del {
		position: absolute;
		top: -10upx;
		right: -10upx;
		color: #fff;
		border-radius: 4upx;
		width: 40upx;
		height: 40upx;
		z-index: 2;
		text-align: center;
		border-radius: 5upx;
		/* background-color: #E54D42; */
		background-image: url('./static/imgDelete.png');
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	text {
		line-height: 1.2 !important;
		font-size: 24upx;
	}

	.up-image_item image {
		width: 140upx;
		height: 140upx;
		border-radius: 8upx;
	}
    .up-image_progress{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
