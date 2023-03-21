import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BoardView from '@/views/BoardView.vue';
import BoardList from '@/components/board/BoardList.vue';
import BoardPost from '@/components/board/BoardPost.vue';
import BoardUpdate from '@/components/board/BoardUpdate.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';

import About from '@/views/AboutView.vue';

import VideoDetail from '@/components/video/VideoDetail.vue';
import VideoExplore from '@/components/video/VideoExplore.vue';

import NotFound from '@/components/common/NotFound.vue';

import Login from '@/components/user/UserLogin.vue';
import Register from '@/components/user/UserRegister.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/board',
		component: BoardView,
		children: [
			{
				path: '',
				name: 'boardList',
				component: BoardList,
			},
			{
				path: 'post',
				name: 'boardPost',
				component: BoardPost,
			},
			{
				path: 'update',
				name: 'boardUpdate',
				component: BoardUpdate,
			},
			{
				path: ':id',
				name: 'boardDetail',
				component: BoardDetail,
			},
		],
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/detail/:id',
		component: VideoDetail,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
	{
		path: '/explore',
		component: VideoExplore,
	},
	{
		path: '/:notFound(.*)',
		component: NotFound,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.path == '/') {
		next();
	} else if (
		!sessionStorage.getItem('access-token') &&
		!to.path.includes('login') &&
		!to.path.includes('register')
	) {
		alert('로그인을 완료해야 이용 가능한 기능입니다.');
		next('/login');
	} else {
		next();
	}
});

export default router;
