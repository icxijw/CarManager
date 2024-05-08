<template>
  <el-dialog
    :title="!dataForm.faultCodeId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="故障码" prop="faultCode">
      <el-input v-model="dataForm.faultCode" placeholder="故障码"></el-input>
    </el-form-item>
    <el-form-item label="诊断结果" prop="diagnosisResult">
      <el-input v-model="dataForm.diagnosisResult" placeholder="诊断结果"></el-input>
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
          faultCodeId: 0,
          faultCode: '',
          diagnosisResult: ''
        },
        dataRule: {
          faultCode: [
            { required: true, message: '故障码不能为空', trigger: 'blur' }
          ],
          diagnosisResult: [
            { required: true, message: '诊断结果不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.faultCodeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.faultCodeId) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/faultcodes/info/${this.dataForm.faultCodeId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.faultCode = data.faultCodes.faultCode
                this.dataForm.diagnosisResult = data.faultCodes.diagnosisResult
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
              url: this.$http.adornUrl(`/promotion/faultcodes/${!this.dataForm.faultCodeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'faultCodeId': this.dataForm.faultCodeId || undefined,
                'faultCode': this.dataForm.faultCode,
                'diagnosisResult': this.dataForm.diagnosisResult
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
