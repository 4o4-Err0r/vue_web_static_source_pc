import Vue from 'vue'
import VueRouter from 'vue-router'
import indexRouter from './indexRouter.js'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    components: {'main':()=>import('@/views/login.vue')}
  },
  {
    path:'/index',
    name:"index",
    components:{'main':()=>import("@/views/index.vue")},
    children:indexRouter
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  let path=to.path;
  if(path=='/index'){
    
    router.push('/index/search')
    path='/index/search'
  }

  if(path.indexOf('/index/search/list')!=-1){
    console.log(1)
    path='/index/search'
    
  }
  
  store.commit('activefn',path)
  
  
  next()
})
router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		console.log("pattern",pattern)
	 router.replace(targetPath);
	}
   });
export default router
