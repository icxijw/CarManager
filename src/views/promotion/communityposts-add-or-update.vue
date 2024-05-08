<template>
  <el-dialog
    :title="!dataForm.postId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发帖用户唯一标识" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="发帖用户唯一标识"></el-input>
    </el-form-item>
    <el-form-item label="" prop="title">
      <el-input v-model="dataForm.title" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="帖子内容" prop="postContent">
      <el-input v-model="dataForm.postContent" placeholder="帖子内容"></el-input>
    </el-form-item>
    <el-form-item label="" prop="img">
      <el-input v-model="dataForm.img" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="帖子发布时间" prop="postingTime">
      <el-input v-model="dataForm.postingTime" placeholder="帖子发布时间"></el-input>
    </el-form-item>
    <el-form-item label="点赞数" prop="prise">
      <el-input v-model="dataForm.prise" placeholder="点赞数"></el-input>
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
          postId: 0,
          userId: '',
          title: '',
          postContent: '',
          img: '',
          postingTime: '',
          prise: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '发帖用户唯一标识不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          postContent: [
            { required: true, message: '帖子内容不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          postingTime: [
            { required: true, message: '帖子发布时间不能为空', trigger: 'blur' }
          ],
          prise: [
            { required: true, message: '点赞数不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.postId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.postId) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/communityposts/info/${this.dataForm.postId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.communityPosts.userId
                this.dataForm.title = data.communityPosts.title
                this.dataForm.postContent = data.communityPosts.postContent
                this.dataForm.img = data.communityPosts.img
                this.dataForm.postingTime = data.communityPosts.postingTime
                this.dataForm.prise = data.communityPosts.prise
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
              url: this.$http.adornUrl(`/promotion/communityposts/${!this.dataForm.postId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'postId': this.dataForm.postId || undefined,
                'userId': this.dataForm.userId,
                'title': this.dataForm.title,
                'postContent': this.dataForm.postContent,
                'img': this.dataForm.img,
                'postingTime': this.dataForm.postingTime,
                'prise': this.dataForm.prise
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
