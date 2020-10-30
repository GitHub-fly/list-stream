<template>
	<view class="p-3 flex align-center" hover-class="bg-light" @click="$emit('click')">
		<text class="iconfont mr-3" :class="icon"></text>
		<text class="font-md">{{ title }}</text>
		<view class="ml-auto">
			<slot></slot>
			<text class="text-muted font ml-2" v-if="showRight">></text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		showRight: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style></style>
