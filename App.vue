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
			// uni.setStorageSync("sidebar",uni.getSystemInfoSync().screenWidth-100);
			
			// this.top = data.top;
			// uni.getSystemInfoSync().statusBarHeight;
			// this.width = data.height;
			// this.left = data.left;
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
	/*每个页面公共css */
	scroll-view ::-webkit-scrollbar {  
		    display: none !important;  
		    width: 0 !important;  
		    height: 0 !important;  
		    -webkit-appearance: none;  
		    background: transparent;  
		}
</style>
