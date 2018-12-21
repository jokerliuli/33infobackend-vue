<template>
  <div class="app-container">
    <h1>Picture Manager</h1>
    <div class="filter-container">
      <el-input v-model="listQuery.pictureName" clearable placeholder="图片名称" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.status" placeholder="启用状态" clearable class="filter-item" style="margin-left: 10px;width: 110px">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
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

  </div>
</template>

<script>
import { upload } from '@/api/information'

export default {
  name: 'Picture',
  data() {
    return {
      statusOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 0, label: '启用中' },
        { value: 1, label: '未启用' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        pictureName: undefined,
        prop: 'id',
        order: 'descending',
        status: undefined
      }
    }
  },
  methods: {
    handleUpload(param) {
      this.loading = true
      const fileObj = param.file
      // 接收上传文件的后台地址
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      upload(form).then(response => {
        const result = response.data.data
        this.temp.thumbnail = result
        this.loading = false
        this.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success',
          duration: 2000
        })
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
