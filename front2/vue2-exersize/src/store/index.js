import Vue from 'vue';
import Vuex from 'vuex';
import video from './video';
import about from './about';
import axios from 'axios';
import router from '@/router';
import { auth } from './auth';

Vue.use(Vuex);

const REST_API = `http://localhost:9999/api`;

export default new Vuex.Store({
	state: {
		boards: [],
		board: {},
		isLogin: false,
		user: null,
		likeLists: [],
	},
	getters: {},
	mutations: {
		GET_BOARDS(state, payload) {
			state.boards = payload;
		},
		GET_BOARD(state, payload) {
			state.board = payload;
		},
		CREATE_BOARD(state, payload) {
			state.boards.push(payload);
		},
		UPDATE_BOARD(state, payload) {
			state.board = payload;
		},
		USER_LOGIN(state) {
			state.isLogin = true;
		},
		INSERT_USER(state, userData) {
			state.user = userData;
			sessionStorage.setItem('user', JSON.stringify(userData));
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${userData.token}`;
		},
		GET_LIKE_LIST(state, payload) {
			state.likeLists = payload;
		},
	},
	actions: {
		getBoards({ commit }, payload) {
			let params = null;

			if (payload) {
				params = payload;
			}
			const API_URL = `${REST_API}/board`;
			axios({
				url: API_URL,
				method: 'GET',
				params,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then((res) => {
					// console.log('성공이라구!');
					// console.log(res.data);
					commit('GET_BOARDS', res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getBoard({ commit }, id) {
			const API_URL = `${REST_API}/board/${id}`;
			axios({
				url: API_URL,
				method: 'GET',
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then((res) => {
					// console.log('성공이라구!');
					// console.log(res.data);
					commit('GET_BOARD', res.data);
				})
				.catch((err) => {
					// console.log('실패...');
					console.log(err);
				});
		},
		createBoard({ commit }, board) {
			const API_URL = `${REST_API}/board`;
			axios({
				url: API_URL,
				method: 'POST',
				params: board,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then(() => {
					commit('CREATE_BOARD', board);
					router.push('/board');
					console.log('POST 성공!');
				})
				.catch((err) => {
					console.log('POST 실패...');
					console.log(err);
					console.log(board);
				});
		},
		updateBoard({ commit }, board) {
			const API_URL = `${REST_API}/board/update`;
			axios({
				url: API_URL,
				method: 'POST',
				params: board,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then(() => {
					commit('UPDATE_BOARD', board);
					router.push({
						name: 'boardDetail',
						params: { num: board.num, id: board.id },
					});
				})
				.catch((err) => {
					console.log(err);
				});
		},
		deleteBoard(context, id) {
			context; //이거 안하면 난리남...
			const API_URL = `${REST_API}/board/${id}`;
			axios({
				url: API_URL,
				method: 'DELETE',
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then(() => {
					router.push('/board');
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getLikeLists({ commit }, userId) {
			const API_URL = `http://localhost:9999/api/likelist`;
			const params = {
				userId,
			};
			axios({
				url: API_URL,
				method: 'GET',
				params,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then((res) => {
					commit('GET_LIKE_LIST', res.data);
					console.log('성공!');
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
					console.log('실패');
				});
		},
	},
	modules: {
		video,
		about,
		auth,
	},
});
