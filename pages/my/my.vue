<template>
	<view>
		<view class="top flex-center"></view>
		<view class="flex align-center">
			<view class="flex-center position-relative" style="width: 180rpx; height: 160rpx;">
				<image
					src="/static/62.jpg"
					class="rounded-circle"
					style="width: 145rpx; height: 145rpx; position: absolute; top: -60rpx;"
				></image>
			</view>
			<view class="flex-column">
				<text class="font-md">小可爱</text>
				<text class="font text-muted">开开心心</text>
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex-center p-2" hover-class="bg-light">
					<text class="text-main font">编辑资料</text>
				</view>
			</view>
		</view>
		<view class="f-divider"></view>
		<f-list-item icon="iconbizhongguanli" title="我的金币" :showRight="false">
			<text class="text-muted font">50金币 立即充值</text>
		</f-list-item>
		<f-list-item icon="iconzhengzaizhibo" title="我的直播"><text class="text-muted font">0</text></f-list-item>
		<f-list-item icon="iconfaxian" title="我的关注"><text class="text-muted font">0</text></f-list-item>
		<f-list-item icon="iconmore" title="历史记录"></f-list-item>
		<f-list-item icon="iconmore" title="退出登录" @click="logout()"></f-list-item>
	</view>
</template>

<script>
import fListItem from '../../components/common/f-list-item.vue';
export default {
	components: {
		fListItem
	},
	data() {
		return {
			statusBarHeight: 0
		};
	},
	onLoad() {
		let res = uni.getSystemInfoSync();
		this.statusBarHeight = res.statusBarHeight;
	},
	methods: {
		logout() {
			// 调用 Vuex 的 logout，不需要直接在这里调用接口，在 Vuex 里异步调用即可
			this.$store.dispatch('logout').then(res => {
				uni.showToast({
					title: '退 出 成 功',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style scoped>
.top {
	width: 750rpx;
	height: 260rpx;
	background-image: url(../../static/62.jpg);
	background-size: cover;
	background-image: linear-gradient(to right, #ba7ace 0%, #8745ff 100%);
}
</style>
