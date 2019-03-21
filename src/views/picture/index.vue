<template>
  <div class="app-container">
    <h1>图片管理</h1>
    <div class="filter-container">
      <el-input v-model="listQuery.pictureName" clearable placeholder="图片名称" style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.pictureType" clearable placeholder="图片分类" style="width: 200px;" class="filter-item" />
      <!--<el-select v-model="listQuery.status" placeholder="启用状态" clearable class="filter-item" style="margin-left: 10px;width: 110px">-->
      <!--<el-option-->
      <!--v-for="item in statusOptions"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value"/>-->
      <!--</el-select>-->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter" >查询</el-button>
      <el-upload
        ref="upload"
        :http-request="handleUpload"
        :show-file-list="false"
        action=""
        list-type="picture"
        style="display:inline-block;">
        <el-button slot="trigger" type="primary" style="margin-left: 10px;">上传图片</el-button>
      </el-upload>
    </div>

    <div style="margin: 20px;"/>

    <el-table
      v-loading="loading"
      :data="pcituresList"
      :default-sort = "{prop: 'id', order: 'descending'}"
      border
      style="width: 100%"
      @sort-change="sortChange">
      <el-table-column fixed="left" sortable="custom" prop="id" label="ID" width="50px"/>
      <el-table-column fixed="left" sortable="custom" prop="updateDate" label="更新时间" width="152px"/>
      <!--<el-table-column :show-overflow-tooltip="true" prop="pictureName" label="图片名称" width="250px"/>-->
      <el-table-column min-width="100px" label="图片标题">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pictureTitle" class="edit-input" size="small"/>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.pictureTitle }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column :show-overflow-tooltip="true" prop="pictureType" label="图片分类" width="100px"/>-->
      <el-table-column min-width="100px" label="图片分类">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pictureType" class="edit-input" size="small"/>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.pictureType }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="图片描述">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pictureDescription" class="edit-input" size="small"/>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.pictureDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pictureSize" label="大小" width="82px"/>
      <el-table-column prop="pictureDimension" label="尺寸" width="82px"/>
      <!--<el-table-column :show-overflow-tooltip="true" prop="pictureUrl" label="url">-->
      <el-table-column :show-overflow-tooltip="true" label="Url">
        <template slot-scope="scope">
          <el-button type="text" @click="open5(scope.row.pictureUrl)">{{ scope.row.pictureUrl }}</el-button>
          <!--<a :href="scope.row.pictureUrl">{{ scope.row.pictureUrl }}</a>-->
        </template>
      </el-table-column>
      <!--<el-table-column :show-overflow-tooltip="true" prop="pictureKey" label="key"/>-->
      <!--<el-table-column fixed="right" prop="status" label="启用状态" width="82px"/>-->
      <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
          <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row)">彻底删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px;"/>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListBypage" />

  </div>
</template>

<script>
import { qiniuupload } from '@/api/information'
import { remove, getPage, update } from '@/api/picture'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Picture',
  components: { Pagination },
  data() {
    return {
      loading: false,
      statusOptions: [
        { value: 0, label: '启用中' },
        { value: 1, label: '未启用' }
      ],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        pictureName: undefined,
        pictureType: undefined,
        prop: 'id',
        order: 'descending',
        status: undefined
      },
      pcituresList: []
    }
  },
  created() {
    this.getListBypage()
  },
  methods: {
    open5(url) {
      this.$alert('<img src=' + url + ' />', '预览', {
        dangerouslyUseHTMLString: true,
        center: true
      })
    },
    cancelEdit(row) {
      row.pictureType = row.originalPictureType
      row.pictureDescription = row.originalPictureDescription

      row.edit = false
      this.$message({
        message: 'The message has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalPictureType = row.pictureType
      row.originalPictureDescription = row.pictureDescription
      update(row).then(response => {
        this.$message({
          message: 'The message has been edited',
          type: 'success'
        })
      })
    },
    getListBypage() {
      this.loading = true
      getPage(this.listQuery).then(response => {
        const items = response.data.data.records
        this.pcituresList = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalPictureType = v.pictureType //  will be used when user click the cancel botton
          v.originalPictureDescription = v.pictureDescription
          return v
        })
        this.total = response.data.data.total
        this.loading = false
      })
    },
    handleFilter() {
      if (this.timeRange != null) {
        this.listQuery.startTime = this.timeRange[0]
        this.listQuery.endTime = this.timeRange[1]
      }
      this.listQuery.page = 1
      this.getListBypage()
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
        })
      })
    },
    sortChange(data) {
      this.listQuery.prop = data.prop
      this.listQuery.order = data.order
      this.handleFilter()
    },
    handleUpload(param) {
      this.loading = true
      const fileObj = param.file
      // 接收上传文件的后台地址
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      qiniuupload(form).then(response => {
        // const result = response.data.data
        // console.log('result:' + result)
        // this.temp.thumbnail = result
        this.loading = false
        this.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success',
          duration: 2000
        })
        this.getListBypage()
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
