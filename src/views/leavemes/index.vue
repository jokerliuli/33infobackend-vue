<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.content" clearable placeholder="留言内容" style="width: 200px;" class="filter-item" />
      <el-date-picker
        v-model="timeRange"
        :picker-options="pickerOptions2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="——"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" >查询</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate" >新增</el-button>-->
    </div>
    <div style="margin: 20px;"/>
    <el-table
      v-loading="loading"
      :data="leavemesList"
      :default-sort = "{prop: 'updateDate', order: 'descending'}"
      border
      style="width: 100%"
      @sort-change="sortChange">
      <el-table-column fixed="left" sortable="custom" prop="id" label="ID" width="50px"/>
      <el-table-column fixed="left" sortable="custom" prop="updateDate" label="更新时间" width="152px"/>
      <el-table-column :show-overflow-tooltip="true" label="标题" width="132px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="82px"/>
      <el-table-column prop="mobile" label="电话" width="120px"/>
      <el-table-column prop="email" label="邮箱" width="160px"/>
      <el-table-column :show-overflow-tooltip="true" prop="address" label="地址" width="350px"/>
      <el-table-column :show-overflow-tooltip="true" prop="content" label="留言内容" width="400px"/>
      <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px;"/>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListBypage" />
    <el-dialog :visible.sync="dialogFormVisible" title="留言管理" width="35%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="temp.title"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="temp.name"/>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.trim="temp.mobile"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="temp.email"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.trim="temp.address"/>
        </el-form-item>
        <el-form-item label="留言内容" prop="content">
          <el-input v-model.trim="temp.content" :rows="5" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button :loading="buttonLoading" type="primary" @click="updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, update, remove } from '@/api/leavemes'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Leavemes',
  components: { Pagination },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      buttonLoading: true,
      total: 0,
      timeRange: undefined,
      rules: {
        title: [
          { required: true, message: '请填写留言标题(150字符以内)', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在150字符以内', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: function(rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写email', trigger: 'blur' },
          { type: 'email', message: '请输入正确的email地址', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写留言内容(500字符以内)', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在500字符以内', trigger: 'blur' }
        ]
      },
      temp: {
        title: '',
        createDate: '2018-12-14 10:27:37',
        name: '',
        mobile: '',
        email: '',
        address: '',
        content: null
      },
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        startTime: undefined,
        endTime: undefined,
        content: undefined,
        prop: 'updateDate',
        order: 'descending'
      },
      leavemesList: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.getListBypage()
  },
  methods: {
    sortChange(data) {
      this.listQuery.prop = data.prop
      this.listQuery.order = data.order
      this.handleFilter()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          update(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleUpdate(row) {
      this.buttonLoading = false
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
    },
    handleFilter() {
      if (this.timeRange != null) {
        this.listQuery.startTime = this.timeRange[0]
        this.listQuery.endTime = this.timeRange[1]
      }
      this.listQuery.page = 1
      this.getListBypage()
    },
    getListBypage() {
      this.loading = true
      getPage(this.listQuery).then(response => {
        this.leavemesList = response.data.data.records
        this.total = response.data.data.total
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.error(err)
        this.$message({
          message: '请求超时，请重试',
          type: 'error'
        })
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        remove(row).then(response => {
          this.loading = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getListBypage()
        }).catch(err => {
          this.loading = false
          console.error(err)
          this.$message({
            message: '请求超时，请重试',
            type: 'error'
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
