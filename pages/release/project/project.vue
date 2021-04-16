<template>
	<view>
		<view>
			<u-navbar back-text="返回" title="发布组队" :is-fixed="true" :background="background" :back-text-style="color"
				title-color="#f5f5f5" back-icon-color="#f5f5f5"></u-navbar>

		</view>

		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item prop="name">
					<u-input :border="border" placeholder="项目标题" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item prop="purpose">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.purpose"
						placeholder="组队目的" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="项目标签">
					<u-input type="textarea" :border="false" :placeholder="labelInfo[purposeNum]" disabled="true"> 
					</u-input>
					<r-free-tag v-model="tag" tagMaxLength="5" @pop-tag-result="getTag"></r-free-tag>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="项目简介" prop="intro">
					<u-input type="textarea" :border="border" placeholder="请填写简介" v-model="model.intro" />
				</u-form-item>
				
				<!-- 
					 text: '比赛组队——拿奖保研 提升自我'
					 },
					 {
						text: '情怀项目——心有情怀 为爱发电'
					 },
					 {
						text: '商业项目——利益相关 成熟商务'
					 },
					 {
						text: '科研项目——刨根问底 志在根源'
				 }
				 -->
				<view class="varible_form" :style="{'display':(purposeNum==0)?'':'none'}">
					<u-form-item prop="contest" label="目标比赛" :label-position="labelPosition">
						<u-input :border="false" :disabled="true" placeholder="参加的竞技比赛" v-model="model.name" type="text"></u-input>
						<r-free-tag v-model="tag_contest" tagMaxLength="5" @pop-tag-result="(data)=>{tag_contest=data}"></r-free-tag>
					</u-form-item>
				</view>

				<view class="varible_form" :style="{'display':(purposeNum==1)?'':'none'}">
					<u-form-item prop="contest" label="目标比赛" :label-position="labelPosition">
						<u-input :border="border" :disabled="true" placeholder="拟参加的项目比赛" v-model="model.name" type="text"></u-input>
						<r-free-tag v-model="tag_contest" tagMaxLength="5" @pop-tag-result="(data)=>{tag_contest=data}"></r-free-tag>
					</u-form-item>
				</view>
				<view class="varible_form" :style="{'display':(purposeNum==2)?'':'none'}">
					<u-form-item prop="contest" label="社会价值" :label-position="labelPosition">
						<u-input :border="border" placeholder="项目预期 社会价值" v-model="model.name" type="text"></u-input>
					</u-form-item>
				</view>

				<view class="varible_form" :style="{'display':(purposeNum==3)?'':'none'}">
					<u-form-item prop="contest" label="福利说明" :label-position="labelPosition">
						<u-input :border="border" placeholder="福利说明 可以不填" v-model="model.name" type="text"></u-input>
					</u-form-item>
				</view>

				<view class="varible_form" :style="{'display':(purposeNum==4)?'':'none'}">
					<u-form-item prop="contest" label="预期成果" :label-position="labelPosition">
						<u-input :border="border" placeholder="预期科研目标 科研成果" v-model="model.name" type="text"></u-input>
					</u-form-item>
				</view>


				<view class="varible_form" :style="{'display':(purposeNum==4)?'':'none'}">
					<u-form-item prop="contest" label="前景福利" :label-position="labelPosition">
						<u-input :border="border" placeholder="项目前景？队员福利？" v-model="model.name" type="text"></u-input>
					</u-form-item>
				</view>
				
				<u-form-item prop="contest" label="队友需求" :label-position="labelPosition">
					<view class="talentDemand">
						+添加招聘人才需求
					</view>
				</u-form-item>
				

				<u-form-item :label-position="labelPosition" label="密码" prop="password">
					<u-input :password-icon="true" :border="border" type="password" v-model="model.password"
						placeholder="请输入密码"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
					<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="水果品种" label-width="150" prop="likeFruit">
					<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index"
							:name="item.name">{{ item.name }}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="结算方式" prop="payType" label-width="150">
					<u-radio-group v-model="radio" @change="radioGroupChange" :width="radioCheckWidth"
						:wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region"
						placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="商品类型" prop="goodsType" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType"
						placeholder="请选择商品类型" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai"
					:label-position="labelPosition" label="手机号码" prop="phone" label-width="150">
					<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="验证码" prop="code" label-width="150">
					<u-input :border="border" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
					<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
				</u-form-item>
				<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->
				<u-form-item :label-position="labelPosition" label="记住密码" prop="remember" label-width="150">
					<u-switch v-model="model.remember" slot="right"></u-switch>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
					<u-upload width="160" height="160"></u-upload>
				</u-form-item>
			</u-form>
			
			<u-button @click="submit">提交</u-button>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback">
			</u-action-sheet>
			
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
			<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
			
			<view class="u-config-wrap">
				
				<view class="u-config-item">
					<view class="u-item-title">radio、checkbox样式</view>
					<u-subsection :list="['自适应', '换行', '50%宽度']" @change="radioCheckboxChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">错误提示方式</view>
					<u-subsection :list="['message', 'toast', '下划线', '输入框']" @change="errorChange"></u-subsection>
				</view>
			</view>
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
				tag: [],
				tag_contest: [],
				background: {
					background: 'url(https://stea.ryanalexander.cn/navbar/11.jpg) no-repeat',
					backgroundSize: '100% 100%'
				},
				color: {
					color: '#f5f5f5'
				},
				model: {
					name: '',
					purpose: '',
					likeFruit: '',
					intro: '',
					payType: '支付宝',
					agreement: false,
					region: '',
					goodsType: '',
					phone: '',
					code: '',
					password: '',
					rePassword: '',
					remember: false,
					photo: ''
				},
				selectList: [{
						value: '电子产品',
						label: '电子产品'
					},
					{
						value: '服装',
						label: '服装'
					},
					{
						value: '工艺品',
						label: '工艺品'
					}
				],
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 5,
							message: '姓名长度在3到5个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
						// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
						// {
						// 	trigger: ['blur'],
						// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
						// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
						// 	asyncValidator: (rule, value, callback) => {
						// 		this.$u.post('/ebapi/public_api/index').then(res => {
						// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
						// 			if(res.error) {
						// 				callback(new Error('姓名重复'));
						// 			} else {
						// 				// 如果没有错误，也要执行callback()回调
						// 				callback();
						// 			}
						// 		})
						// 	},
						// }
					],
					purpose: [{
						required: true,
						message: '请选择性别',
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
						},
						// 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
						{
							pattern: /^[\u4e00-\u9fa5]+$/gi,
							message: '简介只能为中文',
							trigger: 'change',
						},
					],
					likeFruit: [{
						required: true,
						message: '请选择您喜欢的水果',
						trigger: 'change',
						type: 'array',
					}],
					payType: [{
						required: true,
						message: '请选择任意一种支付方式',
						trigger: 'change',
					}],
					region: [{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}],
					goodsType: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'change',
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: false,
				check: false,
				selectStatus: 'close',
				checkboxList: [{
						name: '荔枝',
						checked: false,
						disabled: false
					},
					{
						name: '香蕉',
						checked: false,
						disabled: false
					},
					{
						name: '橙子',
						checked: false,
						disabled: false
					},
					{
						name: '草莓',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '支付宝',
						checked: true,
						disabled: false
					},
					{
						name: '微信',
						checked: false,
						disabled: false
					},
					{
						name: '银联',
						checked: false,
						disabled: false
					},
					{
						name: '现金',
						checked: false,
						disabled: false
					}
				],
				radio: '支付宝',
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
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],
			};
		},
		onLoad() {
			this.purposeChange(this.purposeNum);
			this.border = true;
			this.labelPosition = 'top';
		},
		computed: {
			borderCurrent() {
				return this.border ? 0 : 1;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			purposeChange(index){
				this.purposeNum = index;
				this.model.purpose = this.actionSheetList[index].text;
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.purposeChange(index);
			},
			getTag(data) {
				// console.log(data);
				this.tag = data;
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.likeFruit = e;
			},
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 选择商品类型回调
			selectConfirm(e) {
				this.model.goodsType = '';
				e.map((val, index) => {
					this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
				})
			},
			radioCheckboxChange(index) {
				if (index == 0) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = 'auto';
				} else if (index == 1) {
					this.radioCheckWrap = true;
					this.radioCheckWidth = 'auto';
				} else if (index == 2) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = '50%';
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			errorChange(index) {
				if (index == 0) this.errorType = ['message'];
				if (index == 1) this.errorType = ['toast'];
				if (index == 2) this.errorType = ['border-bottom'];
				if (index == 3) this.errorType = ['border'];
			}
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

		.variable_form {}
		
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

	// .agreement {
	// 	display: flex;
	// 	align-items: center;
	// 	margin: 40rpx 0;

	// 	.agreement-text {
	// 		padding-left: 8rpx;
	// 		color: $u-tips-color;
	// 	}
	// }
</style>
