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
	import qs from 'qs';
	// 导入 Axios
	import axios from 'axios';
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
			  fetch(`http://192.168.43.97:88/api/vehicle/faultCodes/info/${this.dataForm.faultCodeId}`)
				.then(response => {
				  if (!response.ok) {
					throw new Error('Network response was not ok')
				  }
				  return response.json()
				})
				.then(data => {
					console.log(data);
				  if (data && data.code === 0) {
					this.dataForm.faultCode = data.data.faultCode
					this.dataForm.diagnosisResult = data.data.diagnosisResult
				  }
				})
				.catch(error => {
				  console.error('Error fetching fault code info:', error)
				})
			}
		  })
		},
      // 表单提交


dataFormSubmit () {
  this.$refs['dataForm'].validate((valid) => {
    if (valid) {
      const postData = {
        faultCodeId: this.dataForm.faultCodeId || undefined,
        faultCode: this.dataForm.faultCode,
        diagnosisResult: this.dataForm.diagnosisResult
      };

      // 添加调试语句
      console.log('postData:', postData);

      const url = this.dataForm.faultCodeId ? `http://192.168.43.97:88/api/vehicle/faultCodes/update` : `http://192.168.43.97:88/api/vehicle/faultCodes/save`;

      // 使用 Axios 发送 POST 请求
      axios.post(url, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        const data = response.data;
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
      }).catch(error => {
        console.error('Error submitting data:', error)
        this.$message.error('提交数据时发生错误，请稍后重试。')
      })
    }
  })
}

    }
  }
</script>
