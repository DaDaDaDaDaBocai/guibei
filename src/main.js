import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import '../theme/index.css'
import '../theme/addnew.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import DataTables from 'vue-data-tables'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(DataTables)
	


NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
});


router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
  	//storage.clear();
    sessionStorage.removeItem('userinfo');
  }
  //let user = JSON.parse(sessionStorage.getItem('user'));
  let userinfo = sessionStorage.getItem('userinfo');
  if (!userinfo && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
 
})

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
}).$mount('#app')






