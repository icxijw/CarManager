<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="searchByFaultCode">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="故障码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchByFaultCode">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="faultCodeId"
        header-align="center"
        align="center"
        label="故障码唯一标识">
      </el-table-column>
      <el-table-column
        prop="faultCode"
        header-align="center"
        align="center"
        label="故障码">
      </el-table-column>
      <el-table-column
        prop="diagnosisResult"
        header-align="center"
        align="center"
        label="诊断结果">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.faultCodeId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.faultCodeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import axios from 'axios';
import AddOrUpdate from './faultcodes-add-or-update';

export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      axios({
        url: 'http://192.168.43.97:88/api/vehicle/faultCodes/list',
        method: 'get',
        params: {
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        }
      }).then(response => {
        if (response.data && response.data.code === 0) {
          this.dataList = response.data.data.list; // 更新数据列表
          this.totalPage = response.data.data.totalPage; // 更新总页数
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      }).catch(error => {
        console.error('Error fetching data:', error);
        this.$message.error('获取数据时发生错误，请稍后重试。');
      });
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.faultCodeId
      });
      
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          url: 'http://192.168.43.97:88/api/vehicle/faultCodes/delete',
          method: 'delete', // 使用 delete 方法
          data: ids,
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        }).catch(error => {
          console.error('Error deleting data:', error);
          this.$message.error('删除数据时发生错误，请稍后重试。');
        });
      });
    },
    // 根据故障码查询
    searchByFaultCode () {
      // 获取关键字
      const keyword = this.dataForm.key;
  
      // 发送请求
      axios({
        url: 'http://192.168.43.97:88/api/vehicle/faultCodes/getByName',
        method: 'get',
        params: {
          keyword: keyword
        }
      }).then(response => {
        // 处理响应数据
        const data = response.data;
        if (data && data.code === 0) {
          // 更新数据列表
          this.dataList = [data.data];
          this.totalPage = 1; // 数据只有一条，所以总页数为 1
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
        this.$message.error('获取数据时发生错误，请稍后重试。');
      });
    }
  }
}
</script>
