<template>
  <el-dialog
    :title="!dataForm.stationId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="充电站名" prop="title">
      <el-input v-model="dataForm.title" placeholder="充电站名"></el-input>
    </el-form-item>
    <el-form-item label="充电站类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="充电站类型"></el-input>
    </el-form-item>
    <el-form-item label="充电站特性" prop="characteristics">
      <el-input v-model="dataForm.characteristics" placeholder="充电站特性"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-input v-model="dataForm.img" placeholder="图片"></el-input>
    </el-form-item>
    <el-form-item label="" prop="latitude">
      <el-input v-model="dataForm.latitude" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="longitude">
      <el-input v-model="dataForm.longitude" placeholder=""></el-input>
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
          stationId: 0,
          title: '',
          type: '',
          characteristics: '',
          img: '',
          latitude: '',
          longitude: ''
        },
        dataRule: {
          title: [
            { required: true, message: '充电站名不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '充电站类型不能为空', trigger: 'blur' }
          ],
          characteristics: [
            { required: true, message: '充电站特性不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          latitude: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          longitude: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.stationId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.stationId) {
            this.$http({
              url: this.$http.adornUrl(`/promotion/chargingstations/info/${this.dataForm.stationId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.title = data.chargingStations.title
                this.dataForm.type = data.chargingStations.type
                this.dataForm.characteristics = data.chargingStations.characteristics
                this.dataForm.img = data.chargingStations.img
                this.dataForm.latitude = data.chargingStations.latitude
                this.dataForm.longitude = data.chargingStations.longitude
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
              url: this.$http.adornUrl(`/promotion/chargingstations/${!this.dataForm.stationId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'stationId': this.dataForm.stationId || undefined,
                'title': this.dataForm.title,
                'type': this.dataForm.type,
                'characteristics': this.dataForm.characteristics,
                'img': this.dataForm.img,
                'latitude': this.dataForm.latitude,
                'longitude': this.dataForm.longitude
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
