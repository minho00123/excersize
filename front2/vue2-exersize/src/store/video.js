import axios from 'axios';

const _defaultMessage = 'Search for your health!';
const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY2;

export default {
	namespaced: true,
	state: () => ({
		videos: [],
		message: _defaultMessage, // 검색 결과 칸에, 검색 전 뜨는 메시지
		loading: false, // 로딩 아이콘 관련
		theVideo: {},
		comments: [],
		likeLists: [],
	}),
	getters: {},
	mutations: {
		updateState(state, payload) {
			Object.keys(payload).forEach((key) => {
				state[key] = payload[key];
			});
		},
		resetVideos(state) {
			state.videos = [];
			state.message = _defaultMessage;
			state.loading = false;
		},
		GET_COMMENTS(state, comments) {
			state.comments = comments;
		},
		ADD_LIKE_LIST(state, payload) {
			state.likeLists = payload;
		},
		DELETE_LIKE_LIST(state, payload) {
			state.likeLists = payload;
		},
	},
	actions: {
		// 유튜브 영상 검색
		async searchVideos({ state, commit }, payload) {
			if (state.loading) {
				return;
			}
			// 검색 시작 전에 메시지 초기화하기
			commit('updateState', {
				message: '',
				loading: true, // 검색 시작 될 때 바꾸기
			});

			try {
				const res = await _fetchVideo({ ...payload });
				// console.log(res);
				const { items } = res.data;
				commit('updateState', {
					videos: items,
				});
				// console.log(res.data);
			} catch (message) {
				commit('updateState', {
					videos: [],
					message,
				});
			} finally {
				commit('updateState', {
					loading: false,
				});
			}
		},
		// 상세페이지 유튜브 영상
		async searchVideoWithId({ state, commit }, payload) {
			if (state.loading) {
				return;
			}

			commit('updateState', {
				theVideo: {},
				loading: true,
			});

			try {
				const res = await _fetchVideo(payload);
				// console.log(res);
				commit('updateState', {
					theVideo: res.data.items[0],
				});
				// console.log(res.data.items[0].id);
			} catch (error) {
				console.log('Something went wrong');
				commit('updateState', {
					theVideo: {},
				});
			} finally {
				commit('updateState', {
					loading: false,
				});
			}
		},
		getComments({ commit }, id) {
			const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY2;
			const API_URL = `https://youtube.googleapis.com/youtube/v3/commentThreads`;

			const params = {
				part: 'snippet',
				maxResults: 30,
				videoId: id,
				key: YOUTUBE_API_KEY,
			};

			axios({
				url: API_URL,
				method: 'GET',
				params,
			})
				.then((res) => {
					commit('GET_COMMENTS', res.data.items);
					// console.log('이거슨 댓글 불러오기이다...');
					// console.log(res.data.items);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		addLikeList({ commit }, payload) {
			const API_URL = 'http://localhost:9999/api/add';
			axios({
				url: API_URL,
				method: 'POST',
				params: payload,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then(() => {
					commit('ADD_LIKE_LIST', payload);
					console.log('찜 성공!');
				})
				.catch((err) => {
					console.log(err);
					console.log('ADD 실패');
				});
		},
		deleteLike({ commit }, params) {
			const API_URL = `http://localhost:9999/api/delete`;
			axios({
				url: API_URL,
				method: 'POST',
				params,
				headers: {
					'access-token': sessionStorage.getItem('access-token'),
				},
			})
				.then(() => {
					commit('DELETE_LIKE_LIST', params);
				})
				.catch((err) => {
					console.log(err);
					console.log('DELETE 실패');
				});
		},
	},
};

function _fetchVideo(payload) {
	const { title, type, number, id } = payload;

	const url = id
		? `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${id}&part=snippet`
		: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}+${type}+"운동"&maxResults=${number}&key=${YOUTUBE_API_KEY}`;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((res) => {
				if (res.data.Error) {
					reject(res.data.Error);
				}
				resolve(res);
			})
			.catch((err) => {
				reject(err.message);
			});
	});
}
