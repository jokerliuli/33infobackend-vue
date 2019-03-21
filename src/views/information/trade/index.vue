<template>
  <div class="app-container" >
    <div class="filter-container">
      <el-input v-model="success.title" clearable placeholder="标题" style="width: 200px;" class="filter-item" />
      <el-select v-model="success.publishStatus" placeholder="发布状态" clearable class="filter-item" style="width: 110px">
        <el-option
          v-for="item in publishStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate" >新增</el-button>
    </div>

    <div style="margin: 20px;"/>

    <el-table
      v-loading="loading"
      :data="successList"
      border
      style="width: 100%"
    >
      <el-table-column fixed="left" prop="id" label="ID" width="65px"/>
      <el-table-column fixed="left" prop="updateDate" label="修改时间 " width="152px"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="visit" label="访问量"/>
      <el-table-column prop="sort" label="排序"/>

      <el-table-column fixed="right" label="发布状态 " class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.publishStatus | statusFilter">{{ scope.row.publishStatus | publishFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.publishStatus!='2'" size="mini" type="success" @click="handleModifyStatus(scope.row, 2)">发布
          </el-button>
          <el-button v-if="scope.row.publishStatus!='1'" size="mini" @click="handleModifyStatus(scope.row, 1)">草稿
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px;"/>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListBypage" />

  </div>
</template>

<script>
import { page, update, remove } from '@/api/trade'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Trade',
  components: { Pagination },
  filters: {
    publishFilter(publishStatus) {
      const statusMap = {
        2: '发布',
        1: '草稿'
      }
      return statusMap[publishStatus]
    },
    statusFilter(publishStatus) {
      const statusMap = {
        2: 'success',
        1: 'info'
      }
      return statusMap[publishStatus]
    }
  },
  data() {
    return {
      publishStatusOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '草稿' },
        { value: 2, label: '发布' }
      ],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      success: {},
      successList: []
    }
  },
  watch: {
    '$route': 'getListBypage'
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
    handleCreate() {
      this.$router.push({ path: '/information/AddTrade' })
    },
    handleUpdate(id) {
      this.$router.push({ path: '/information/EditTrade', query: { id: id }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getListBypage()
    },
    handleModifyStatus(row, status) {
      row.publishStatus = status
      this.success = Object.assign({}, row) // copy obj
      update(this.success).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
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
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    getListBypage() {
      this.loading = true
      page(this.listQuery, this.success).then(response => {
        this.successList = response.data.data.records
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
    }
  }

}
</script>

<style scoped>

</style>
