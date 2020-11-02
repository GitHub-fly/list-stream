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
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true
			});
			state.user = null;
			state.token = null;
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},
	}
});
