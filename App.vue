<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "./uview-ui/index.scss";
	@import "./uview-ui/theme.scss";
</style>
  
<script>
	export default {
		globalData: {
			dialogData: [],
			isSocketOpen: false,
			userInfo: {},
			userInfo_: {},
			// url :"http://localhost:8080",
			// url :"https://www.hzbytecloud.cn",
			// wsUrl: "ws://www.hzbytecloud.cn/team",
			// url :"https://www.hzbytecloud.cn/team",
			
			url: "http://krakens.tpddns.cn:12001",
			wsUrl: "ws://krakens.tpddns.cn:12001",
			imgUrl: "https://lets-team--public.oss-cn-hangzhou.aliyuncs.com",
			token: {
				r: "",
				a: ""
			},
			info: {},
			
			genHeader: (access,refresh)=>{
				return {
					'x-auth-token': refresh,
					'x-access-token': access,
					'Content-Type': 'application/json',
					'x-platform-id': 1,
					
				}
			},
		}, 
		onLaunch: function() {
			let other = this.$u.sys();
			let menuButton = uni.getMenuButtonBoundingClientRect();
			
			
			
			this.globalData.info = {
				height : menuButton.height,
				width : menuButton.width,
				right : menuButton.right,
				left : menuButton.left,
				top : menuButton.top,
				bottom : menuButton.bottom,
				ratio: other.pixelRatio,
				statusHeight: other.statusBarHeight,
				windowHeight: other.windowHeight,
				windowWidth: other.windowWidth
			};
			
			
			
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
	@import "@/common/psl_font.css";
	@import "@/common/animate.css";
	.trans {
		transition: all 0.3s ease-out;
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
		/* display: -webkit-box;
		-webkit-box-orient: vertical;
		word-break: normal; */
		white-space:nowrap; 
	}
</style>
