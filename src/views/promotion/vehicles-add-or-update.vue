<template>
  <el-dialog
    :title="!dataForm.vehicleId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="车辆型号" prop="model">
      <el-input v-model="dataForm.model" placeholder="车辆型号"></el-input>
    </el-form-item>
    <el-form-item label="汽车品牌唯一标识" prop="brandId">
      <el-input v-model="dataForm.brandId" placeholder="汽车品牌唯一标识"></el-input>
    </el-form-item>
    <el-form-item label="汽车图片URL" prop="imageUrl">
      <el-input v-model="dataForm.imageUrl" placeholder="汽车图片URL"></el-input>
    </el-form-item>
    <el-form-item label="汽车技术参数" prop="technicalParameters">
      <el-input v-model="dataForm.technicalParameters" placeholder="汽车技术参数"></el-input>
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
          vehicleId: 0,
          model: '',
          brandId: '',
          imageUrl: '',
          technicalParameters: ''
        },
        dataRule: {
          model: [
            { required: true, message: '车辆型号不能为空', trigger: 'blur' }
          ],
          brandId: [
            { required: true, message: '汽车品牌唯一标识不能为空', trigger: 'blur' }
          ],
          imageUrl: [
            { required: true, message: '汽车图片URL不能为空', trigger: 'blur' }
          ],
          technicalParameters: [
            { required: true, message: '汽车技术参数不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.vehicleId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.vehicleId) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/vehicles/info/${this.dataForm.vehicleId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.model = data.vehicles.model
                this.dataForm.brandId = data.vehicles.brandId
                this.dataForm.imageUrl = data.vehicles.imageUrl
                this.dataForm.technicalParameters = data.vehicles.technicalParameters
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
              url: this.$http.adornUrl(`/promotion/vehicles/${!this.dataForm.vehicleId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'vehicleId': this.dataForm.vehicleId || undefined,
                'model': this.dataForm.model,
                'brandId': this.dataForm.brandId,
                'imageUrl': this.dataForm.imageUrl,
                'technicalParameters': this.dataForm.technicalParameters
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
