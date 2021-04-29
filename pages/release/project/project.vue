<template>
	<view>
		<view>
			<u-navbar back-text="返回" title="发布组队" :is-fixed="true" :background="background" :back-text-style="color"
				title-color="#f5f5f5" back-icon-color="#f5f5f5"></u-navbar>

		</view>

		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item prop="title">
					<u-input :border="border" placeholder="项目标题" v-model="model.title" type="text"></u-input>
				</u-form-item>
				<u-form-item prop="purpose">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.purpose"
						placeholder="组队目的" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				
				<u-form-item prop="projectTag" :label-position="labelPosition" label="项目标签">
					<u-input type="textarea" :border="false" :placeholder="labelInfo[purposeNum]" disabled="true"> 
					</u-input>
					<r-free-tag v-model="model.projectTag" tagMaxLength="5" @pop-tag-result="(data)=>{model.projectTag=data}"></r-free-tag>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="项目简介" prop="intro">
					<u-input type="textarea" :border="border" placeholder="请填写简介" v-model="model.intro" />
				</u-form-item>
				
				<view class="varible_form_wrapper">
					<view class="varible_form" :style="{'display':(purposeNum==0)?'':'none'}">
						<u-form-item prop="otherTag" label="目标比赛" :label-position="labelPosition">
							<u-input :border="false" :disabled="true" placeholder="参加的竞技比赛" type="text"></u-input>
							<r-free-tag v-model="model.otherTag" tagMaxLength="5" @pop-tag-result="(data)=>{model.otherTag=data}"></r-free-tag>
						</u-form-item>
					</view>
					
					<view class="varible_form" :style="{'display':(purposeNum==1)?'':'none'}">
						<u-form-item prop="otherTag" label="目标比赛" :label-position="labelPosition">
							<u-input :border="border" :disabled="true" placeholder="拟参加的项目比赛" type="text"></u-input>
							<r-free-tag v-model="model.otherTag" tagMaxLength="5" @pop-tag-result="(data)=>{model.otherTag=data}"></r-free-tag>
						</u-form-item>
					</view>
					<view class="varible_form" :style="{'display':(purposeNum==2)?'':'none'}">
						<u-form-item prop="otherInfo" label="社会价值" :label-position="labelPosition">
							<u-input :border="border" placeholder="项目预期 社会价值" v-model="model.otherInfo" type="text"></u-input>
						</u-form-item>
					</view>
					
					<view class="varible_form" :style="{'display':(purposeNum==3)?'':'none'}">
						<u-form-item prop="contest" label="福利说明" :label-position="labelPosition">
							<u-input :border="border" placeholder="福利说明 可以不填" v-model="model.otherInfo" type="text"></u-input>
						</u-form-item>
					</view>
					
					<view class="varible_form" :style="{'display':(purposeNum==4)?'':'none'}">
						<u-form-item prop="contest" label="预期成果" :label-position="labelPosition">
							<u-input :border="border" placeholder="预期科研目标 科研成果" v-model="model.otherInfo" type="text"></u-input>
						</u-form-item>
					</view>
					
					
					<view class="varible_form" :style="{'display':(purposeNum==4)?'':'none'}">
						<u-form-item prop="contest" label="前景福利" :label-position="labelPosition">
							<u-input :border="border" placeholder="项目前景？队员福利？" v-model="model.otherInfo" type="text"></u-input>
						</u-form-item>
					</view>
				</view>
				
				
				<u-form-item prop="contest" label="队友需求" :label-position="labelPosition">
					<view class="talentDemand">
						+添加招聘人才需求
					</view>
				</u-form-item>
				
				<u-form-item>
					<u-button type="error"
						@click="preview"
						shape="square" :plain="true" :ripple="true">
						预览</u-button>
				</u-form-item>
				
				<u-form-item>
					<u-button type="error"
					@click="commit"
					shape="square" :plain="false" :ripple="true">
						提交</u-button>
				</u-form-item>	
				
			</u-form>
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
				purposeNum: 0,
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/11.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {
					color: '#f5f5f5'
				},
				model: {
					title: '',
					purpose: '',
					intro: '',
					projectTag: [],
					otherInfo: '',
					otherTag: []
				},
				rules: {
					title: [{
							required: true,
							message: '请输入项目名称',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 20,
							message: '项目名称长度在3到20个字符',
							trigger: ['change'],
						}
					],
					purpose: [{
						required: true,
						message: '请选择比赛目的',
						trigger: 'change'
					}, ],
					intro: [{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change',
						}
					],
					projectTag: [{
							required: true,
							message: '请填写项目标签'
						},
						{
							trigger: ['change'],
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.model.projectTag.length>0;
							},
							message: '至少有一个标签',
						}
						
					],
					otherInfo:[{
							required: false,
							message: '你这里似乎没填哟'
						},
					],
					otherTag:[
						{
							required: false,
							message: '请填写相关标签'
						},
						{
							trigger: ['change'],
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.model.otherTag.length>0;
							},
							message: '至少有一个标签',
						},
					],
			
				},
				border: false,
				check: false,
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
				
				labelPosition: 'left',
				
				errorType: ['message'],
			};
		},
		onLoad() {
			this.purposeChange(this.purposeNum);
			this.border = true;
			this.labelPosition = 'top';
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			preview(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.navigateTo({
							url: '/pages/release/project/project_preview?model='+JSON.stringify(this.model),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else {
						console.log('验证失败');
					}
				});
				
			},
			purposeChange(index){
				this.purposeNum = index;
				this.model.purpose = this.actionSheetList[index].text;
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.purposeChange(index);
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

		.varible_form_wrapper {}
		
		.talentDemand{
			border: 2px dashed $lineColor;
			height: 140rpx;
			line-height: 140rpx;
			
			border-radius: 10rpx;
			text-align: center;
			font-size: 50rpx;
			font-weight: bolder;
			color: $labelColor;
		}
		
		
	}
</style>
