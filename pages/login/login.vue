<template>
	<view class="container">
		<view class="flex-center" style="height: 350rpx;">
			<text class="text-light" style="font-size: 50rpx">LIVE-SHOW</text>
		</view>
		<view class="px-3">
			<input
				type="text"
				v-model="form.username"
				class="bg-light px-3 mb-4 font rounded"
				placeholder="请输入用户名"
				style="height: 100rpx;"
			/>
			<input
				type="text"
				v-model="form.password"
				class="bg-light px-3 mb-4 font rounded"
				placeholder="请输入密码"
				style="height: 100rpx;"
			/>
			<input
				v-if="type != 'login'"
				type="text"
				v-model="form.repassword"
				class="bg-light px-3 mb-4 font rounded"
				placeholder="请确认密码"
				style="height: 100rpx;"
			/>
		</view>

		<view class="p-3 flex-center" @click="submit">
			<view class="bg-main rounded p-3 flex-center flex-1" hover-class="bg-main-hover">
				<text class="text-white font-md">{{ type === 'login' ? '登 录' : '注 册' }}</text>
			</view>
		</view>

		<view class="flex-center">
			<text class="text-light-muted font p-2" @click="changeType">
				{{ type === 'login' ? '注册账号' : '去登录' }}
			</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'login',
			form: {
				username: '',
				password: '',
				repassword: ''
			}
		};
	},
	methods: {
		changeType() {
			this.type = this.type === 'login' ? 'red' : 'login';
		},
		submit() {
			uni.switchTab({
				url: '../index/index'
			});
		}
	}
};
</script>

<style scoped>
.container {
	width: 750rpx;
	height: 100vh;
	margin: 0;
	padding: 100rpx 0 0 0;
	background-size: cover;
	background-image: linear-gradient(to bottom, #ba7ace 0%, #8745ff 100%);
}
</style>
