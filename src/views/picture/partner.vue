<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.pictureName" clearable placeholder="图片名称" style="width: 200px;" class="filter-item" />
      <el-select v-model="picture.publishStatus" placeholder="发布状态" clearable class="filter-item" style="width: 110px">
        <el-option
          v-for="item in publishStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate" >新增</el-button>
    </div>

    <div style="margin: 20px;"/>

    <el-table
      v-loading="loading"
      :data="picturesList"
      border
      style="width: 100%"
    >
      <el-table-column fixed="left" prop="id" label="ID" width="50px"/>
      <el-table-column fixed="left" prop="updateDate" label="更新时间" width="152px"/>
      <el-table-column prop="pictureTitle" label="图片标题"/>
      <el-table-column prop="pictureDescription" label="图片描述"/>
      <el-table-column prop="sort" label="排序"/>
      <!--<el-table-column :show-overflow-tooltip="true" prop="pictureUrl" label="url">-->
      <el-table-column :show-overflow-tooltip="true" label="表图片Url">
        <template slot-scope="scope">
          <el-button type="text" @click="open5(scope.row.pictureUrl)">{{ scope.row.pictureUrl }}</el-button>
          <!--<a :href="scope.row.pictureUrl">{{ scope.row.pictureUrl }}</a>-->
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="悬停图片Url">
        <template slot-scope="scope">
          <el-button type="text" @click="open5(scope.row.hoverPictureUrl)">{{ scope.row.hoverPictureUrl }}</el-button>
          <!--<a :href="scope.row.pictureUrl">{{ scope.row.pictureUrl }}</a>-->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="发布状态 " class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.publishStatus | statusFilter">{{ scope.row.publishStatus | publishFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
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

    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]" width="35%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
        <el-form-item label="图片标题" prop="pictureTitle">
          <el-input v-model.trim="temp.pictureTitle"/>
        </el-form-item>
        <el-form-item :rows="2" type="textarea" label="图片描述" prop="pictureDescription">
          <el-input v-model.trim="temp.pictureDescription"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="temp.sort"/>
        </el-form-item>
        <el-form-item label="发布状态" prop="publishStatus">
          <el-select v-model="temp.publishStatus" placeholder="发布状态" clearable class="filter-item" style="width: 110px">
            <el-option
              v-for="item in publishStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="表图片" prop="pictureUrl">
          <el-upload
            ref="upload"
            :http-request="handleUpload"
            :show-file-list="false"
            action=""
            class="upload-demo"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              <img :src="temp.pictureUrl">
            </div>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="悬停图片" prop="hoverPictureUrl">
          <el-upload
            ref="upload"
            :http-request="handleUpload2"
            :show-file-list="false"
            action=""
            class="upload-demo"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              <img :src="temp.hoverPictureUrl">
            </div>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button :loading="buttonLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { qiniuupload } from '@/api/information'
import { remove, page, update, save } from '@/api/partner'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Partner',
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
    }
  },
  data() {
    return {
      publishStatusOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '草稿' },
        { value: 2, label: '发布' }
      ],
      loading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      buttonLoading: true,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        sort: [
          { required: true, message: '请填写排序（数字，从1开始）', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字值' }
        ],
        publishStatus: [
          { required: true, message: '请选择发布状态', trigger: 'blur' }
        ]
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      picture: {},
      temp: {},
      restTemp: {},
      picturesList: []
    }
  },
  created() {
    this.getListBypage()
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          save(this.temp).then(() => {
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
    handleCreate() {
      this.temp = this.restTemp
      this.buttonLoading = false
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    open5(url) {
      this.$alert('<img width="100%" style="background-color: #1e6abc" src=' + url + ' />', '预览', {
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
      page(this.listQuery, this.picture).then(response => {
        const items = response.data.data.records
        this.picturesList = items.map(v => {
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
      this.listQuery.page = 1
      this.getListBypage()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.buttonLoading = false
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
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
        const result = response.data.data
        this.temp.pictureUrl = result
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
    },
    handleUpload2(param) {
      this.loading = true
      const fileObj = param.file
      // 接收上传文件的后台地址
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      qiniuupload(form).then(response => {
        const result = response.data.data
        this.temp.hoverPictureUrl = result
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
