<template>
	<view>
		<!-- 轮播图 -->
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="200"
			style="width: 750rpx; height: 250rpx;"
		>
			<swiper-item>
				<image src="../../static/banner/1.jpg" style="width: 750rpx;height: 750rpx;"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner/2.jpg" style="width: 750rpx;height: 750rpx;"></image>
			</swiper-item>
		</swiper>
		<!-- 列表 -->
		<view class="flex flex-wrap align-center justify-around">
			<f-list v-for="(item, index) in list" :key="index" :item="item" @click="openLive"></f-list>
		</view>
	</view>
</template>

<script>
import fList from '../../components/common/f-list.vue';
export default {
	data() {
		return {
			list: [
				{
					background: 'https://wx4.sinaimg.cn/mw690/006n20AVly1ge98rz9h4bj32003001l6.jpg',
					money: 124,
					pNumber: 875,
					title: '木轮'
				},
				{
					background: 'https://wx4.sinaimg.cn/mw690/006n20AVly1ge98sdw9hgj31bf1z4kix.jpg',
					money: 134,
					pNumber: 398,
					title: '光阴'
				},
				{
					background: 'https://wx2.sinaimg.cn/mw690/006n20AVly1ge98sa8lr3j32003007wm.jpg',
					money: 860,
					pNumber: 975,
					title: 'draw'
				},
				{
					background: 'https://wx1.sinaimg.cn/mw690/00669kenly1gecl5h52h7j30zj1pttz1.jpg',
					money: 423,
					pNumber: 984,
					title: '屋顶'
				},
				{
					background: 'https://wx1.sinaimg.cn/mw690/00669kenly1gecl5vrvr6j32003004qr.jpg',
					money: 397,
					pNumber: 127,
					title: '天体'
				},
				{
					background: 'https://wx3.sinaimg.cn/mw690/00669kenly1gecla0xde7j3200300x6q.jpg',
					money: 358,
					pNumber: 279,
					title: '云~'
				}
			]
		};
	},
	onLoad() {},
	components: {
		fList
	},
	methods: {
		openLive() {
			uni.navigateTo({
				url: '../live/live'
			});
		}
	}
};
</script>

<style></style>
