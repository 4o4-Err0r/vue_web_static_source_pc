<template>
    <div style="height:100%;background:#fff;">
        <el-row  class="search_lay">
          <el-col :span="24" >
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="客户端" name="client"></el-tab-pane>
                <el-tab-pane label="服务端" name="server"></el-tab-pane>
                <el-tab-pane label="转发节点" name="forward"></el-tab-pane>
            </el-tabs>
            <el-button type="primary" size="mini" @click="addFn" style="margin-left:15px;">添加文件</el-button>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="filename"
                label="文件名"
                width="180">
                </el-table-column>
                 <el-table-column
                prop="check"
                label="是否启动"
                width="180">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="catFn(scope.$index, scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    @click="runFn(scope.$index, scope.row,$event)">{{tableData[scope.$index].btnDataType}}</el-button>
                   
                    <el-button
                    size="mini"
                    @click="checkFn(scope.$index, scope.row)">check</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
           </el-col>
        </el-row>
        <el-dialog title="添加文件" :visible.sync="dialogAddFormVisible">
            <el-form :model="addForm">
                <el-form-item label="文件名" :label-width="formLabelWidth">
                   <el-input v-model="addForm.filename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                   <el-input v-model="addForm.type" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

				<!-- client -->
                <el-form-item label="目标地址" :label-width="formLabelWidth" v-if="$store.state.userInfo.nowType==='client'">
                   <el-input v-model="addForm.client.out_addr" autocomplete="off" placeholder="127.0.0.1:12345"></el-input>
                </el-form-item>
                <el-form-item label="监听端口" :label-width="formLabelWidth" v-if="$store.state.userInfo.nowType==='client' || $store.state.userInfo.nowType==='server' || $store.state.userInfo.nowType==='forward'">
                   <el-input v-model="addForm.client.port" autocomplete="off" placeholder="55555"></el-input>
                </el-form-item>
                <el-form-item label="通信加密密钥" :label-width="formLabelWidth" v-if="$store.state.userInfo.nowType==='client' || $store.state.userInfo.nowType==='server'">
                   <el-input v-model="addForm.client.uuid" autocomplete="off" placeholder="00000000-0000-0000-0000-000000000000"></el-input>
                </el-form-item>

				<!-- forward -->
                <el-form-item label="目标服务器" :label-width="formLabelWidth" v-if="$store.state.userInfo.nowType==='forward'"> 
                   <el-input v-model="addForm.client.out_addr" autocomplete="off" placeholder="127.0.0.1:12345"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBtnFn">确 定</el-button>
            </div>
            </el-dialog>
            <el-dialog
                title="详情"
                :visible.sync="dialogMoreVisible"
                width="60%"
                >
                <p v-for="(v,k,index) in $store.state.userInfo.moreData" :key="index+k" style="margin-top:10px;">
                   <b>{{k}}:</b>
                   <span style="margin-left:10px;">{{v}}</span>
                </p>
                
                
                </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          dialogMoreVisible:false,
          dialogAddFormVisible:false,
          activeName: 'client',
          formLabelWidth: '120px',
          addForm:{
              filename:'',
              type:this.$store.state.userInfo.nowType,
              client:{
                  out_addr:'127.0.0.1:12345',
                  port:'55555',
				  uuid:'00000000-0000-0000-0000-000000000000',
              }
          }
      }
    },
    computed:{
        tableData(){return this.$store.state.userInfo.listData},
    },
    watch:{
        
    },
    methods: {
        runFn(inde,row,event){
            console.log('event',event.target.innerHTML)
            
             this.$confirm('是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     if(event.target.innerHTML==='启动'){
                          this.$store.commit('userInfo/sendRun',{filename:row.filename,ind:inde});
                        // event.target.innerHTML='停止'
                        return
                    }
                    if(event.target.innerHTML==='<!----><!----><span>启动</span>'){
                         this.$store.commit('userInfo/sendRun',{filename:row.filename,ind:inde});
                    // event.target.innerHTML='<!----><!----><span>停止</span>'
                    return
                    }
                    if(event.target.innerHTML==='停止'){
                         this.$store.commit('userInfo/sendStop',{filename:row.filename,ind:inde});
                        // event.target.innerHTML='启动'
                        return
                    }
                    if(event.target.innerHTML==='<!----><!----><span>停止</span>'){
                         this.$store.commit('userInfo/sendStop',{filename:row.filename,ind:inde});
                    // event.target.innerHTML='<!----><!----><span>启动</span>'
                    return
                    }
                
                 
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
                });
            
        },
        handleDelete(inde,row){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                 this.$store.commit('userInfo/sendDel',{filename:row.filename});
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            
        },
        checkFn(inde,row){
            this.$store.commit('userInfo/setNowClick',{nowinde:inde,filename:row.filename});
            
            this.$store.commit('userInfo/sendCheck',{filename:row.filename});
        },
        catFn(inde,row){
            console.log('row',row)
             this.$store.commit('userInfo/sendCat',{filename:row.filename});
             this.dialogMoreVisible=true
        },
        handleEdit(inde,row){
            this.addForm.filename=row.filename
            this.dialogAddFormVisible=true
        },
        addFn(){
          this.dialogAddFormVisible=true
        },
        addBtnFn(){
            if(this.addForm.filename===''){
                alert('请输入文件名')
            }
             if(this.addForm.client.port===''){
                     alert('请输入port')
                 }
            if(this.$store.state.userInfo.nowType==='client'){
                 if(this.addForm.client.out_addr===''){
                     alert('请输入out_addr')
                 }
                 if(this.addForm.client.out_addr!=''&&this.addForm.client.port!=''&&this.addForm.client.uuid!=''){
                     this.$store.commit('userInfo/sendAddFile',[{
						    session_id: this.$store.state.userInfo.session_id,
                            "type":this.addForm.type,
                            "filename":this.addForm.filename,
                            "client": {
                                "out_addr": this.addForm.client.out_addr,
                                "port": this.addForm.client.port,
								"uuid": this.addForm.client.uuid,
                            }
                        }]);

                 }
                 
                
            }else if(this.$store.state.userInfo.nowType==='server'){
                  if(this.addForm.client.uuid!=''&&this.addForm.client.port!=''){
                        this.$store.commit('userInfo/sendAddFile',[{
						session_id: this.$store.state.userInfo.session_id,
                        "type":this.addForm.type,
                        "filename":this.addForm.filename,
                        "server": {
                            "port": this.addForm.client.port,
							"uuid": this.addForm.client.uuid,
                        }
                    }]);
                  }
                 
            }else if(this.$store.state.userInfo.nowType==='forward'){
                if(this.addForm.client.out_addr===''){
                            alert('请输入out_addr')
                        }
                        if(this.addForm.client.out_addr!=''&&this.addForm.client.port!=''){
                            this.$store.commit('userInfo/sendAddFile',[{
							session_id: this.$store.state.userInfo.session_id,
                            "type":this.addForm.type,
                            "filename":this.addForm.filename,
                            "forward": {
                                "out_addr": this.addForm.client.out_addr,
                                "port": this.addForm.client.port
                            }
                        }]);
                    }
               }
              this.dialogAddFormVisible = false
                
        },
        handleClick(tab, event) {
            this.$store.commit('userInfo/setTypea',tab.name);
			this.addForm.type = tab.name
        }
    }
  }
</script>
<style src="../assets/css/search.css" scoped>
</style>
