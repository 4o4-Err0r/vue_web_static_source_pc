<template>
    <div class="login_bg">
        
        
       
        <div class="login_logo">404 Error</div>
        <section class="login_box">
            
            <form method="post" content-type="application/x-www-form-urlencoded">
                    <div class="input_box clearfix">
                        <span class="icon iconfont user">&#xe606;</span>
                        <input class="input_style" type="text" id="username" v-model="ruleForm.username"  @input="inputfn(ruleForm.username)" @blur="inputfn(ruleForm.username)"/>
                        <span class="red_style" v-if="!ruleForm.username">*请输入用户名</span>
                    </div>
                    <div class="input_box clearfix" style="margin-top:48px;">
                        <span class="icon iconfont user">&#xe694;</span>
                        <input class="input_style" type="password" id="password" v-model="ruleForm.password" @input="inputfn(ruleForm.password)" @blur="inputfn(ruleForm.password)"/>
                       <span class="red_style" v-if="!ruleForm.password">*请输入密码</span>
                    </div>
                    <div class="" style="margin-top:48px; text-align:center;font-weight:bold;">
                        <el-button type="warning" style="padding:10px 40px;" @click.native="submitlogin"><b>登录</b></el-button>
                        
                    </div>
            </form>
       </section>
    </div>
</template>
<script>

export default {
    data(){
        return {
            ruleForm:{
              username:'',
              password:null
            }
        }
    },
    name:"login",
    created(){
        
    },
    methods:{
        inputfn(v){
           // console.log(v)
        },
        submitlogin(){
            this.$store.commit('userInfo/setuserinfo',this.ruleForm);
            
        }
    }
   
    
}
</script>
<style src="../assets/css/login.css"  scoped >
 
</style>
