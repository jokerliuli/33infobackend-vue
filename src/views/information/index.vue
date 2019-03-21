<template>
  <div class="app-container" >
    <div class="filter-container">
      <el-input v-model="listQuery.title" clearable placeholder="标题" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.informationType" placeholder="分类栏目" clearable class="filter-item" style="width: 110px">
        <el-option
          v-for="item in informationTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.publishStatus" placeholder="发布状态" clearable class="filter-item" style="width: 110px">
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
      :data="informationList"
      :default-sort = "{prop: 'updateDate', order: 'descending'}"
      border
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column fixed="left" sortable="custom" prop="id" label="ID" width="65px"/>
      <el-table-column fixed="left" sortable="custom" prop="updateDate" label="修改时间 " width="152px"/>
      <el-table-column :show-overflow-tooltip="true" label="标题" width="250px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.id)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="shortTitle" label="简略标题"/>
      <el-table-column :show-overflow-tooltip="true" prop="summary" label="摘要"/>
      <el-table-column prop="keyword" label="关键字"/>
      <el-table-column label="分类栏目" width="95px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.informationType | colorTypeFilter">{{ scope.row.informationType | infoTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者"/>
      <el-table-column prop="createDate" label="创建时间" width="152px"/>
      <!--<el-table-column prop="content" label="资讯内容"/>-->
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
import { getPage, update, remove } from '@/api/information'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Information',
  components: { Pagination },
  filters: {
    statusFilter(publishStatus) {
      const statusMap = {
        2: 'success',
        1: 'info'
      }
      return statusMap[publishStatus]
    },
    publishFilter(publishStatus) {
      const statusMap = {
        2: '发布',
        1: '草稿'
      }
      return statusMap[publishStatus]
    },
    infoTypeFilter(publishStatus) {
      const statusMap = {
        1: '新闻动态',
        2: '产品方案',
        3: '成功案例'
      }
      return statusMap[publishStatus]
    },
    colorTypeFilter(publishStatus) {
      const statusMap = {
        1: 'success',
        2: '',
        3: 'warning'
      }
      return statusMap[publishStatus]
    }
  },
  data() {
    return {
      test: '1',
      informationTypeOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '新闻动态' },
        { value: 2, label: '产品方案' },
        { value: 3, label: '成功案例' }
      ],
      publishStatusOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '草稿' },
        { value: 2, label: '发布' }
      ],
      informationList: [],
      listQuery: {
        page: 1,
        limit: 10,
        publishStatus: undefined,
        title: undefined,
        informationType: undefined,
        prop: 'updateDate',
        // Desc降序，Asc升序
        order: 'descending'
      },
      temp: {
        title: '',
        shortTitle: '',
        informationType: 1,
        author: '',
        thumbnail: '',
        summary: '',
        keyword: '',
        publishStatus: 1,
        content: ''
      },
      loading: false,
      total: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        shortTitle: [
          { required: true, message: '请填写缩略标题', trigger: 'blur' }
        ],
        informationType: [
          { required: true, message: '请选择分类栏目', trigger: 'blur' }
        ],
        publishStatus: [
          { required: true, message: '请选择发布状态', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写博客文章内容', trigger: 'blur' }
        ]
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
    handleCreate() {
      this.$router.push({ path: '/information/addInformation' })
    },
    handleUpdate(id) {
      this.$router.push({ path: '/information/addInformation', query: { id: id }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getListBypage()
    },
    getListBypage() {
      this.loading = true
      getPage(this.listQuery).then(response => {
        this.informationList = response.data.data.records
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
    handleModifyStatus(row, status) {
      row.publishStatus = status
      this.temp = Object.assign({}, row) // copy obj
      update(this.temp).then(() => {
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
    }
  }
}
</script>

<style scoped>

</style>
