<template>
	<view class="border-top border-light-secondary p-3">
		<view class="rounded py-4 flex-center flex-column bg-main">
			<text class="text-white font-sm mb-2">当前金币</text>
			<text class="font-weight-bold text-white" style="font-size: 60rpx;">50</text>
		</view>

		<view class="border-top border-light-secondary my-3"></view>
		<view><text class="font-sm text-muted">请选择充值金币</text></view>
		<view class="flex flex-wrap" style="marigin-left: -20rpx; margin-right: -20rpx;">
			<view class="p-2" style="width: 33.3%; box-sizing: border-box;" v-for="i in 6">
				<view class="border rounded flex-center flex-column">
					<view class="flex align-center">
						<text class="iconfont text-warning mr-1">&#xe633;</text>
						<text class="font-md font-weight-bold">10</text>
					</view>
					<text class="font text-light-muted">￥10</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
