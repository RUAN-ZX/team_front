<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "./uview-ui/index.scss";
	@import "./uview-ui/theme.scss";
	
</style>

<script>
	export default {
		onLaunch: function() {
			var data = uni.getMenuButtonBoundingClientRect()
			console.log('菜单按键宽度：',data.width)
			console.log('菜单按键高度：',data.height)
			console.log('菜单按键上边界坐标：',data.top)
			console.log('菜单按键右边界坐标：',data.right)
			console.log('菜单按键下边界坐标：',data.bottom)
			console.log('菜单按键左边界坐标：',data.left)
			console.log(uni.getSystemInfoSync());
			
			uni.setStorageSync("top",data.top);
			uni.setStorageSync("width",data.height);
			uni.setStorageSync("left",data.left);
			
			// this.top = data.top;
			var height = uni.getSystemInfoSync().statusBarHeight;
			uni.setStorageSync("statusHeight",height);
			
			var top = uni.getSystemInfoSync().screenHeight*(1/2);
			uni.setStorageSync("hoverTop",top);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.trans {
		transition: 0.3s opacity ease-out;
	}
	
	/*每个页面公共css */
	scroll-view ::-webkit-scrollbar {  
		display: none !important;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	.overflow{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
