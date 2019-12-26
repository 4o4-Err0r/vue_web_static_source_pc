<template>
    <div style="height:100%;">
        <el-container>
            <el-header height="50">
                <span class="logo">404 Error</span>
                <span class="username">
                    <span class="icon iconfont">&#xe606;</span>
                    {{$store.state.userInfo.userinfo.username}}
                </span>
            </el-header>
            <el-container>
                
                <el-main>
                    
                    <router-view name="index"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){return{
      isCollapse: true,
      menuWidth:"65px",
      navactive:this.$store.state.navactive
    }},
    updated(){
        let url=window.location.hash.substring(1);
        if(url.indexOf('/index/search/list')!=-1){
            url='/index/search'
        }
        this.navactive=url;
        
        console.log("this.navactive",this.navactive)
    },
    created(){
      if (window.main.$cookies.isKey ('session_id')) {
          window.main.$store.commit ('userInfo/getData', {session_id: window.main.$cookies.get ('session_id')})
      }
      this.$store.commit('userInfo/sendList')
    },
    watch:{
        isCollapse:function(){
           if(!this.isCollapse){
             this.menuWidth="200px"
           }else{this.menuWidth="65px"}
        }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style src="../assets/css/public.css" scoped>
</style>
