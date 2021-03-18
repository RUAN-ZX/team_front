<template>
	<view class="list-qa"
		@click="navigate_()">
		
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
	
</style>
