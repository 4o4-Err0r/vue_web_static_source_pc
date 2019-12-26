export default {
    namespaced:true,
    state:{userinfo:{},
          nowType:'client',
          listData:[],
          moreData:null,
          nowClick:'',
		  session_id: '',
        },
    mutations:{
        sendStop(state,v){
            state.nowClick=v.ind
            window.main.$socket.sendData('Api.Stop', [{"type":state.nowType,"filename":v.filename, "session_id":state.session_id}], 'userInfo/getStop')
        },
        getStop(state,v){
            if(v.status==='ok'){
                window.main.$message({
                    message: '恭喜你，已经停止',
                    type: 'success'
                  });
                  state.listData[state.nowClick].check='停止'
                  state.listData[state.nowClick].btnDataType='启动'
                }
        },
        sendRun(state,v){
            state.nowClick=v.ind
            window.main.$socket.sendData('Api.Run', [{"type":state.nowType,"filename":v.filename, "session_id":state.session_id}], 'userInfo/getRun')
        },
        getRun(state,v){
            if(v.status==='ok'){
                window.main.$message({
                    message: '恭喜你，开启成功',
                    type: 'success'
                  });
                  state.listData[state.nowClick].check='开启'
                  state.listData[state.nowClick].btnDataType='停止'
                }
        },
        sendDel(state,v){
            window.main.$socket.sendData('Api.Del', [{"type":state.nowType,"filename":v.filename, "session_id":state.session_id}], 'userInfo/getDel')
        },
        getDel(state,v){
            if(v.status==='ok'){
                window.main.$message({
                    message: '恭喜你，删除成功',
                    type: 'success'
                  });
                  window.main.$store.commit('userInfo/sendList')
            }else{
                window.main.$message({
                    message: '删除失败',
                    type: 'success'
                  });
            }
        },
        setNowClick(state,v){
            state.nowClick=v.nowinde
        },
        sendCheck(state,v){
            window.main.$socket.sendData('Api.Check', [{"type":state.nowType,"filename":v.filename, "session_id":state.session_id}], 'userInfo/getCheck')
        },
        getCheck(state,data){
            console.log('getCheck',data)
                if(data){
                    alert('已启动')
                    state.listData[state.nowClick].check='已启动'
                    state.listData[state.nowClick].btnDataType='停止'
                }else{
                    state.listData[state.nowClick].check='未启动'
                    state.listData[state.nowClick].btnDataType='启动'
                    // alert('未启动')
                }
            
        },
        sendCat(state,v){
            window.main.$socket.sendData('Api.Cat', [{"type":state.nowType,"filename":v.filename, "session_id":state.session_id}], 'userInfo/getCat')
        },
        
        getCat(state,data){
            console.log('getcat',data)
            // data=data.substr(1,data.length-1)
            // data=data.substr(0,data.length-2)
            state.moreData=JSON.parse(data)
        },
        setTypea(state,v){
            state.nowType=v
            window.main.$store.commit('userInfo/sendList')
        },
        setuserinfo(state,v){
            state.userinfo=v
            window.main.$socket.sendData('Api.Login', [{"username":v.username, "password":v.password}], 'userInfo/getData')
        },
        getData(state,data){
            if(data){
                if(data.hasOwnProperty('session_id') && data.session_id != undefined && data.session_id!=''){
                    state.session_id = data.session_id
                    window.main.$cookies.set('session_id', data.session_id)
                    window.main.$router.push('/index/search')
                }
            }else{
                alert('用户名密码错误')
                window.main.$router.push('/')
            }
            console.log("getData",data)
        },
        sendList(state,v){
            window.main.$socket.sendData('Api.Ls', [{"type":state.nowType, "session_id":state.session_id}], 'userInfo/getList')
        },
        getList(state,data){
			if (data == undefined || !data.hasOwnProperty('length')) {
				return
			}
            for(let i=0;i<data.length;i++){
                data[i]= {'filename':data[i].substring(0,data[i].indexOf(".")),check:'未检测',btnDataType:'启动'}
            }
            state.listData=data;
          console.log(data)
        },
        sendAddFile(state,v){
            window.main.$socket.sendData('Api.Add', v, 'userInfo/setAddFile')
        },
        setAddFile(state,data){
            if(data){
                window.main.$store.commit('userInfo/sendList')
            }
        },
    }
}
