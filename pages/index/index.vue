<template>
	<view class="flex-column align-center">
		<!-- 轮播图 -->
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="200"
			style="width: 100%; height: 250rpx;"
		>
			<swiper-item>
				<image src="../../static/banner/1.jpg" style="width: 750rpx;height: 750rpx;"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner/2.jpg" style="width: 750rpx;height: 750rpx;"></image>
			</swiper-item>
		</swiper>
		<!-- 搜索框 -->
		<view class="top flex-center">
			<input
				type="text"
				style="width: 600rpx; height: 70rpx; background-color: #eeeeee;"
				class="rounded-circle mx-1 pl-5"
				placeholder="搜索直播间"
				placeholder-style="color: #616161"
			/>
		</view>
		<!-- 列表 -->
		<view class="flex flex-wrap">
			<view class="list-item" v-for="(item, index) in list" :key="index">
				<f-card :item="item" :index="index" @click="openLive(item)"></f-card>
			</view>
		</view>
		<view class="f-divider"></view>
		<view class="flex-center py-3">
			<text class="font-md text-secondary">{{ loadText }}</text>
		</view>
	</view>
</template>

<script>
import fCard from '../../components/common/f-card.vue';
export default {
	data() {
		return {
			list: [],
			page: 1,
			loadText: '上拉加载更多'
		};
	},
	onLoad() {},
	components: {
		fCard
	},
	onLoad() {
		this.getData();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getData()
			.then(res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh();
			})
			.catch(err => {
				uni.stopPullDownRefresh(); 
			});
	},
	onReachBottom() {
		if (this.loadText !== '上拉加载更多') {
			return;
		}
		this.loadText = '加载中...';
		this.page++;
		this.getData();
	},
	methods: {
		getData() {
			let page = this.page;
			return this.$H
				.get('/live/list/' + page)
				.then(res => {
					this.list = page === 1 ? res : [...this.list, ...res];
					this.loadText = res.length < 6 ? '没有更多了' : '上拉加载更多';
				})
				.catch(err => {
					if (this.page > 1) {
						this.page--;
						this.loadText = '上拉加载更多';
					}
				});
		},
		openLive(item) {
			uni.navigateTo({
				url: `../live/live?url=${item.url}`
			});
		}
	}
};
</script>

<style scoped>
.top {
	width: 100%;
	height: 150rpx;
	/* background-image: url(../); */
	background-size: cover;
	/* background-image: linear-gradient(to right, #ba7ace 0%, #8745ff 100%); */
}
.list-item {
	width: 375rpx;
	height: 375rpx;
	padding: 5rpx;
	position: relative;
}
</style>
