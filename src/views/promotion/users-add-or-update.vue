<template>
  <el-dialog
    :title="!dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户名称" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名称"></el-input>
    </el-form-item>
    <el-form-item label="用户账号" prop="account">
      <el-input v-model="dataForm.account" placeholder="用户账号"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="用户密码"></el-input>
    </el-form-item>
    <el-form-item label="人脸识别" prop="face">
      <el-input v-model="dataForm.face" placeholder="人脸识别"></el-input>
    </el-form-item>
    <el-form-item label="用户头像" prop="avatar">
      <el-input v-model="dataForm.avatar" placeholder="用户头像"></el-input>
    </el-form-item>
    <el-form-item label="用户注册时间" prop="registrationTime">
      <el-input v-model="dataForm.registrationTime" placeholder="用户注册时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          userId: 0,
          username: '',
          account: '',
          password: '',
          face: '',
          avatar: '',
          registrationTime: ''
        },
        dataRule: {
          username: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '用户账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '用户密码不能为空', trigger: 'blur' }
          ],
          face: [
            { required: true, message: '人脸识别不能为空', trigger: 'blur' }
          ],
          avatar: [
            { required: true, message: '用户头像不能为空', trigger: 'blur' }
          ],
          registrationTime: [
            { required: true, message: '用户注册时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/users/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.users.username
                this.dataForm.account = data.users.account
                this.dataForm.password = data.users.password
                this.dataForm.face = data.users.face
                this.dataForm.avatar = data.users.avatar
                this.dataForm.registrationTime = data.users.registrationTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/users/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'username': this.dataForm.username,
                'account': this.dataForm.account,
                'password': this.dataForm.password,
                'face': this.dataForm.face,
                'avatar': this.dataForm.avatar,
                'registrationTime': this.dataForm.registrationTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
