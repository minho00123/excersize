import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
	faHome,
	faUser,
	faUserPlus,
	faSignInAlt,
	faSignOutAlt,
	faHeartCircleCheck,
	faHeart,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faHome,
	faUser,
	faUserPlus,
	faSignInAlt,
	faSignOutAlt,
	faHeartCircleCheck,
	faHeart
);

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
