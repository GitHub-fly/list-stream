<template>
	<view class="container">
		<view :style="'margin-top:' + statusBarHeight + 'px'">
			<text class="iconfont iconguanbi" @click="closePage()"></text>
			<view class="flex-center" style="height: 350rpx;">
				<text class="text-light" style="font-size: 50rpx">
					{{ this.loginType === 'phone' ? '手机验证码' : '账号密码' }}登录
				</text>
			</view>
			<view class="px-4">
				<view class="flex align-center">
					<text v-show="loginType === 'phone'" class="font-weight">+86</text>
					<input
						type="text"
						v-model="form.username"
						class="px-2 font rounded input text-dark w-100"
						:placeholder="loginType === 'phone' ? '手机号' : '昵称/手机号/邮箱'"
						placeholder-style="color: #212121"
						style="height: 100rpx;"
						@input="checkPhone()"
					/>
				</view>

				<divider class="mb-2"></divider>

				<view class="flex align-center justify-between text-dark">
					<input
						type="number"
						v-model="form.password"
						class="px-2 font rounded input col-7"
						:placeholder="this.loginType === 'phone' ? '请输入验证码' : '请输入密码'"
						placeholder-style="color: #212121"
						style="height: 100rpx;"
					/>
					<button
						v-if="loginType === 'phone'"
						class="p-1 flex-center m-0"
						:disabled="isBtn"
						style="background-color: transparent; height: 60rpx; font-size: 25rpx; border: 1px solid #f1f2f6; color: #ffffff;"
						@click="getCode()"
					>
						{{ codeMsg }}
					</button>
					<text v-else class="font-sm text-light-muted">忘记密码</text>
				</view>
				<divider></divider>
			</view>

			<view class="p-3 flex-center mt-5" @click="submit">
				<view
					class="rounded p-3 flex-center flex-1 rounded-circle "
					:class="form.password === '' ? 'gray' : 'bg-main'"
				>
					<text class="text-white font-md">登 录</text>
				</view>
			</view>

			<view class="flex-center mt-5">
				<text class="font-sm" style="color: #2196f3;" @click="changeLoginType()">
					{{ this.loginType !== 'phone' ? '验证码' : '账号密码' }}登录
				</text>
				<text class="ml-2 mr-2" style="color: #7e57c2;">|</text>
				<text class="font-sm" style="color: #2196f3;">登录遇到问题</text>
			</view>

			<view class="flex-center mt-4">
				<view class="text-light-muted" style="height: 2rpx; width: 85rpx; background-color: #A9A5A0;"></view>
				<text class="font-sm text-light-muted ml-1 mr-1">社交账号登录</text>
				<view class="text-light-muted" style="height: 2rpx; width: 85rpx; background-color: #A9A5A0;"></view>
			</view>

			<view class="flex-center mt-4">
				<image
					v-for="(item, index) in otherLoginList"
					:key="index"
					style="width: 100rpx; height: 110rpx;"
					class="rounded-circle ml-5 mr-5"
					:src="item"
					@click="otherLogin(index)"
				></image>
			</view>

			<view class="mt-4 flex-center">
				<text class="text-light-muted font-sm">注册及代表您同意</text>
				<text class="" style="color: #448aff;">《XXX社区协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
import divider from '../../components/common/divider.vue';
export default {
	components: {
		divider
	},
	data() {
		return {
			loginType: 'phone',
			type: 'login',
			form: {
				username: '',
				password: ''
			},
			isBtn: false,
			codeMsg: '获取验证码',
			timer: null,
			countDown: 60,
			/* 第三方登录 */
			otherLoginList: [
				'../../static/banner/wechat.png',
				'../../static/banner/qq.png',
				'../../static/banner/weibo.png'
			],
			otherLoginType: '',
			statusBarHeight: ''
		};
	},
	watch: {
		/**
		 * 监听登录方式的改变来控制计时器的显示效果
		 */
		loginType: function() {
			console.log(this.loginType);
			if (this.loginType !== 'phone') {
				clearInterval(this.timer);
				this.isBtn = false;
				this.codeMsg = '获取验证码';
				this.countDown = 60;
				this.timer = null;
			}
		}
	},
	onLoad() {
		let res = uni.getSystemInfoSync();
		this.statusBarHeight = res.statusBarHeight;
	},
	methods: {
		/* 第三方登录操作 */
		/**
		 * 登录方法
		 * @param {Object} i
		 */
		otherLogin(i) {
			switch (i) {
				case 0:
					this.otherLoginType = 'weixin';
					break;
				case 1:
					this.otherLoginType = 'qq';
					break;
				case 2:
					this.otherLoginType = 'sinaweibo';
					break;
			}
			console.log('>>>>>>>>>>>' + this.otherLoginType + '登录' + '<<<<<<<<<<<<<');
			this.appLogin(this.otherLoginType);
		},

		/**
		 * 第三方登录
		 * @param {Object} type
		 */
		appLogin(type) {
			// 不同第三方登录，只需要更改 provider 的值即可
			uni.login({
				provider: type,
				success: loginRes => {
					uni.getUserInfo({
						provider: type,
						success: infoRes => {
							// 统一的登录请求参数
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>请求得到的数据：');
							console.log(infoRes);
							// this.loginDTO.openId = infoRes.userInfo.openId;
							let user = {
								username: infoRes.userInfo.nickName,
								avatar: infoRes.userInfo.avatarUrl
							};
							//统一调用登录方法
							this.userLogin(user);
						},
						fail() {
							console.log('请求失败');
						}
					});
				}
			});
		},

		/**
		 * 统一登录的方法
		 * @param {Object} loginDTO
		 */
		async userLogin(user) {
			uni.showLoading({
				title: '登录中'
			});
			/**
			 * 此处调用第三方登录接口
			 */
			this.$H.post('/otherlogin', user).then(res => {
				if (res.id) {
					this.$store.dispatch('login', res);
					uni.showToast({
						title: '登录成功'
					});
					setTimeout(() => {
						uni.switchTab({
							url: '../index/index'
						});
						uni.hideLoading();
					}, 2000);
				} else {
					uni.showToast({
						title: '登录失败'
					});
				}
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>接口返回得到的数据：');
				console.log(res);
			});
		},

		/**
		 * 退出按钮的监听事件
		 */
		closePage() {
			uni.switchTab({
				url: '../index/index'
			});
		},

		/**
		 * 获取验证码
		 */
		getCode() {
			if (!this.timer) {
				this.timer = setInterval(() => {
					if (this.countDown > 0 && this.countDown <= 60) {
						this.isBtn = true;
						this.countDown--;
						if (this.countDown != 0) {
							this.codeMsg = `重新发送(${this.countDown})`;
						} else {
							clearInterval(this.timer);
							this.isBtn = false;
							this.codeMsg = '获取验证码';
							this.countDown = 60;
							this.timer = null;
						}
					}
				}, 1000);
			}
		},
		/**
		 * 验证手机号码是否符合正常逻辑
		 */
		checkPhone() {
			if (this.loginType === 'phone') {
				var phone = this.form.username;
				if (!/^1[3456789]\d{9}$/.test(phone)) {
					return '手机号格式错误';
					// this.mobileTip = '手机号格式错误';
				} else {
					// this.mobilecode = true;
					return '';
				}
			}
		},
		changeLoginType() {
			this.loginType = this.loginType === 'phone' ? 'account' : 'phone';
		},
		changeType() {
			this.type = this.type === 'login' ? 'reg' : 'login';
		},
		submit() {
			this.$H.post('/login', this.form).then(res => {
				this.$store.dispatch('login', res);
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				uni.switchTab({
					url: '../index/index'
				});
			});
		}
	}
};
</script>

<style scoped>
* {
	box-sizing: border-box;
}
.container {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-size: cover;
	background-image: linear-gradient(to bottom, #ba7ace 0%, #8745ff 100%);
}

.input {
	border: none;
	background-color: transparent;
}
.gray {
	background-color: #ba68c8;
}
</style>
