<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view>
			<u-navbar back-text="返回" title="招贤纳士" :is-fixed="true" :background="background" :back-text-style="color"
				title-color="#f5f5f5" back-icon-color="#f5f5f5"></u-navbar>

		</view>

		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item prop="title">
					<u-input :border="border" placeholder="项目标题 标题朗朗上口 项目事事顺利" v-model="model.title" type="text"></u-input>
				</u-form-item>
				<u-form-item prop="type">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="type_string"
						placeholder="项目类型" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				
				<u-form-item prop="projectTag" :label-position="labelPosition" label="项目标签">
					<u-input type="textarea" :border="false" :placeholder="labelInfo[model.type]" disabled="true"> 
					</u-input>
					<r-free-tag v-model="model.projectTag" tagMaxLength="5" @pop-tag-result="(data)=>{model.projectTag=data}"></r-free-tag>
				</u-form-item>
				
				<u-form-item prop="talentDemand" label="人才要求" :label-position="labelPosition">
					<view class="talentDemand" :key="demandIndex" v-for="(demandItem,demandIndex) in model.talentDemandList">
						<u-form-item label="人才职责" :label-position="labelPosition">
							
							<!-- <u-input type="textarea" :border="false" 
								placeholder="人才职责 比如 前端后端 产品经理等" disabled="true">
							</u-input> -->
							<r-free-tag v-model="model.talentDemandList[demandIndex].demandDuty" addText="+人才职责"
							tagMaxLength="1" @pop-tag-result="(data)=>{model.talentDemandList[demandIndex].demandDuty=data}"></r-free-tag>
						</u-form-item>
						
						<u-form-item label="需求标签" :label-position="labelPosition">
							<!-- <u-input type="textarea" :border="false" 
							placeholder="需求标签 可以是具体的技术点 比如SpringBoot 也可以是抽象的 文案能力" disabled="true">
							</u-input> -->
							<r-free-tag v-model="model.talentDemandList[demandIndex].demandtag" addText="+需求标签"
							tagMaxLength="5" @pop-tag-result="(data)=>{model.talentDemandList[demandIndex].demandTag=data}"></r-free-tag>
						</u-form-item>
						
					</view>
					<view class="talentDemand-last" @click="addTalentDemand">
						+添加招聘人才要求
					</view>
				</u-form-item>
				
			</u-form>
			<view class="bottomBlock">
				
			</view>
			<view class="footBar">
				<u-button type="error"
				@click="getBack"
				shape="square" :plain="true" :ripple="true">
					返回</u-button>
				
					
				<u-button type="error"
				@click="preview"
				shape="square" :plain="false" :ripple="true">
					详情页编辑</u-button>
			</view>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback">
			</u-action-sheet>
		</view>
	</view>
</template>

<script>
	import rFreeTag from "@/components/r-free-tag/r-free-tag.vue";
	export default {
		components: {
			rFreeTag
		},
		data() {
			return {
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/11.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {
					color: '#f5f5f5'
				},
				model: {
					title: '',
					type: 0,
					projectTag: [],
					talentDemandList: []
				},
				rules: {
					title: [{
							message: '请输入项目名称'
						},
						{
							min: 3,
							max: 20,
							message: '项目名称长度在3到20个字符',
							trigger: ['change'],
						}
					],
					projectTag: [{
							message: '至少有一个标签',
							trigger: ['change'],
							validator: (rule, value, callback) => {
								return this.model.projectTag.length>0;
							},
						}
					],
					talentDemand: [{
							message: '至少有一个人才要求',
							validator: (rule, value, callback) => {
								return this.model.talentDemandList.length>0;
							}
						}, {
							trigger: ['change'],
							validator: (rule, value, callback) => {
								let list = this.model.talentDemandList;
								let n = this.model.talentDemandList.length;
								while(n--){
									if(list[n].demandDuty.length<1&&list[n].demandTag.length<1){
										
										return false;
									}	
								}
								return true;
							},
							
							message: '您填写的人才需求不够完整 麻烦检查一下',
						},
					],
				},
				border: false,
				labelInfo:[
					"数模 电设 智能车之类竞技性的比赛 可以直接设置比赛名为标签 这样您的组队消息 会更容易被推荐到志同道合的兄弟手中",
					"项目类比赛注重项目本身的现有基础 包含软件基础——队员才能 硬件基础——现有成果",
					"情怀项目 可能已经厌倦比赛 想做造福大家 造福社会的事嘛？",
					"商业项目 自然要讲清楚福利好处啦~",
					"科研项目 更加注重 身处项目之人能力上的锻炼？"
				],
				actionSheetList: [{
						text: '竞技比赛组队——艰苦卓绝 百炼成钢'
					},
					{
						text: '项目比赛组队——纵观全局 格局致胜'
					},
					{
						text: '公益项目组队——心有情怀 为爱发电'
					},
					{
						text: '商业项目组队——利益相关 成熟商务'
					},
					{
						text: '科研项目组队——刨根问底 志在根源'
					},
					{
						text: '综合项目组队——雨露均沾 我全都要'
					}
				],
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				
				type_string: "",
				
				labelPosition: 'left',
				
				errorType: ['message'],
			};
		},
		onLoad() {
			this.typeChange(this.model.type);
			this.border = true;
			this.labelPosition = 'top';
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			addTalentDemand(){
				let list = this.model.talentDemandList;
				if(list.length<=5){
					list.push({
						demandDuty: [],
						demandTag: []
					});
				}
				else{
					this.$refs.uToast.show({
						title: '最多五个人才需求哟',
						type: 'warning',
						position: "bottom"
					})
				}
			},
			deleteTalentDemand(index){
				this.model.talentDemandList.splice(index,1);
			},
			getBack(){
				uni.navigateBack();
			},
			preview(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.navigateTo({
							url: '/pages/release/editor/editor',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						
					} else {
						console.log('验证失败');
					}
				});
				
			},
			typeChange(index){
				this.model.type = index;
				this.type_string = this.actionSheetList[index].text;
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.typeChange(index);
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
		}
	};
</script>

<style scoped lang="scss">
	@import "@/common/uni.scss";

	.content {
		border: 0;
		overflow: hidden;

		padding: $padding;
		z-index: $zindex_content;
		margin: $padding;
		background-color: $cardColor;
		position: relative;
		height: auto;
		display: flex;
		flex-direction: column;

		
		.talentDemand{
			margin-bottom: $padding;
			border: 2px solid $lineColor;
			height: auto;
			
			border-radius: $padding;
			color: $labelColor;
			
			padding: $padding;
		}
		.talentDemand-last{
			margin-bottom: $padding;
			border: 2px dashed $lineColor;
			height: 200rpx;
			line-height: 200rpx;
			
			border-radius: $padding;
			text-align: center;
			font-size: 50rpx;
			font-weight: bolder;
			color: $labelColor;
		}
		
	}
	.bottomBlock{
		position: relative;
		height: 140rpx;
	}
	.footBar{
		padding: $padding;
		width: 100vw;
		z-index: $zindex_navbar;
		
		position: fixed; 
		bottom: 0;
		left: 0;
		right: 0;
		
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		
		background-color: $cardColor;
		
		box-shadow: 15rpx 3rpx 6rpx 6rpx rgba(0,0,0,0.125);
		
	}
</style>
