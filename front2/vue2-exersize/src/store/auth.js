import axios from 'axios';
import router from '@/router';

const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: {}, user: null };

const REST_API = `http://localhost:9999/api`;

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			const API_URL = `${REST_API}/login`;
			axios({
				url: API_URL,
				method: 'POST',
				params: user,
			}).then(
				(res) => {
					commit('LOGIN', res);
					sessionStorage.setItem('access-token', res.data['access-token']);
					// console.log('로그인 성공!');
					// console.log(res.data);
					router.push('/');
				},
				(err) => {
					commit('LOGIN_FAILED');
					console.log(err);
					console.log('로그인 실패...');
				}
			);
		},
		logout({ commit }) {
			sessionStorage.removeItem('user');
			commit('LOGOUT');
		},
		register({ commit }, user) {
			const API_URL = `${REST_API}/join`;
			axios({
				url: API_URL,
				method: 'POST',
				params: user,
			}).then(
				(res) => {
					commit('INSERT_USER', res);
					// console.log('회원가입 성공!');
					// console.log(res.data);
					router.push('/');
				},
				(err) => {
					console.log('회원가입 실패...');
					console.log(err);
				}
			);
		},
	},
	mutations: {
		LOGIN(state, user) {
			state.status = { loggedIn: true };
			state.user = user;
			sessionStorage.setItem('user', JSON.stringify(user));
		},
		LOGIN_FAILED(state) {
			state.status = {};
			state.user = null;
		},
		LOGOUT(state) {
			state.status = {};
			state.user = null;
		},
		INSERT_USER(state, userData) {
			state.user = userData;
			sessionStorage.setItem('user', JSON.stringify(userData));
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${userData.token}`;
		},
	},
};
