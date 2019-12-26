import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
			isConnected: false,
		},
    navactive:''
  },
  mutations: {
    activefn(state,v){
      console.log("v",v)
      state.navactive=v
    },
    socket_on_open (state, event) {
      state.socket.isConnected = true

      if (window.main.$cookies.isKey ('session_id')) {
          this.commit ('userInfo/getData', {session_id: window.main.$cookies.get ('session_id')})
          window.main.$router.push('/index/search');
      }
      console.log('Socket connected')
    },
 
    socket_on_close (state, event) {
      state.socket.isConnected = false
      if (event.wasClean) {
        console.log('Socket closed clear')
      } else {
        console.error('Connection failure')
      }
      console.error('Code: ' + event.code)
    },
 
    socket_on_error ({ commit }, event) {
      console.error('Error')
    },
 
    socket_on_message ({ commit }, message) {
      console.log(message)
		if (!message.hasOwnProperty ("error")) {
			return
		}
		if ((message.error == null) || (message.error == "")) {
			return
		}
		if (message.error == "no authority") {
			window.main.$router.push ("/")
			alert("登录失效，请重新登录！")
			return
		}
		alert(message.error)
    },
 
    socket_reconnect ({ commit }, count) {
      console.log(count)
    },
 
    socket_reconnect_error ({ commit }) {
      console.error('Socket disconnected')
    }
  },
  actions: {
  },
  modules: {
    userInfo
  }
})
