import Vue from 'vue';
import Vuex from 'vuex';
import $H from '../common/request.js';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: null,
		token: null
	},
	actions: {
		login({
			state
		}, user) {
			state.user = user;
			state.token = user.token;
			uni.setStorageSync('user', JSON.stringify(user));
			uni.setStorageSync('token', user.token);
		},
		/**
		 * 初始化用户登录状态
		 */
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user');
			let t = uni.getStorageSync('token');
			if (u) {
				state.user = JSON.parse(u);
				state.token = t;
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			});
			state.user = null;
			state.token = null;
			// uni.clearStorageSync();
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			// uni.reLaunch({
			// 	url: '/pages/login/login'
			// });
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res;
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(state.user)
				});
			});
		}
	}
});
