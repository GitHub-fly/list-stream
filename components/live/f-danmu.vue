<template>
	<view style="position: fixed; bottom: 120rpx; left: 0; right: 0;">
		<!-- 使用动画纵向滚动，将 scrollInToView 方法的返回值绑定到 scroll-into-view 属性上，要熟悉 scroll-view 组件的常用属性 -->
		<scroll-view
			scroll-y="true"
			style="width: 520rpx; height: 300rpx;"
			scroll-with-animation
			class="pl-3"
			:scroll-into-view="scrollInToView"
		>
			<view
				:id="'danmu' + item.id"
				class="flex justify-start align-start rounded p-2 mb-2"
				style="background-color: rgba(255, 255, 255, 0.125);"
				v-for="(item, index) in list"
				:key="index"
			>
				<text class="font-mmd text-danger">{{ item.name }}:</text>
				<text class="font-md text-white">{{ item.content }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 滚动到哪儿元素的 view 视图
			scrollInToView: '',
			// 弹幕数组
			list: []
		};
	},
	mounted() {
		// let id = 1;
		// setInterval(() => {
		// 	this.list.push({
		// 		id: id,
		// 		name: '观众' + id,
		// 		content: '发言_' + id
		// 	});
		// 	// 置于底部
		// 	this.toBottom();
		// 	id++;
		// }, 2000);
	},
	methods: {
		/**
		 * 发送弹幕
		 * @param {Object} data
		 */
		send(data) {
			this.list.push(data);
			// 置于底部
			this.toBottom();
		},
		toBottom() {
			setTimeout(() => {
				let len = this.list.length;
				if (len > 0 && this.list[len - 1]) {
					this.scrollInToView = 'danmu' + this.list[len - 1].id;
				}
			}, 200);
		}
	}
};
</script>

<style></style>
