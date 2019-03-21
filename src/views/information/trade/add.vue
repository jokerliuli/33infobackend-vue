<template>
  <div class="app-container" >
    <el-form v-loading="loading" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 90%; margin-left:50px;">
      <el-form-item label="资讯标题" prop="title">
        <el-input v-model.trim="temp.title"/>
      </el-form-item>
      <el-form-item label="简略标题" prop="shortTitle">
        <el-input v-model.trim="temp.shortTitle"/>
      </el-form-item>
      <el-form-item label="文章作者" prop="author">
        <el-input v-model.trim="temp.author"/>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="temp.sort"/>
      </el-form-item>
      <el-form-item label="缩略图" prop="thumbnail">
        <el-upload
          ref="upload"
          :http-request="handleUpload"
          :show-file-list="false"
          action=""
          class="upload-demo"
          list-type="picture">
          <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            <img :src="temp.thumbnail">
          </div>
          <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input v-model.trim="temp.summary"/>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input v-model.trim="temp.keyword"/>
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
      <el-form-item label="文章内容" prop="content">
        <div class="components-container">
          <div>
            <tinymce :height="300" v-model="temp.content"/>
          </div>
        </div>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="backToIndex()">返回列表</el-button>
        <el-button type="primary" @click="createData()">立即提交</el-button>
      </el-form-item>
    </el-form>
</div></template>

<script>
import Tinymce from '@/components/Tinymce'
import { save } from '@/api/trade'
import { qiniuupload } from '@/api/information'
export default {
  name: 'AddSuccess',
  components: { Tinymce },
  data() {
    return {
      id: '',
      loading: false,
      test: '1',
      publishStatusOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '草稿' },
        { value: 2, label: '发布' }
      ],
      temp: {
      },
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        shortTitle: [
          { required: true, message: '请填写缩略标题', trigger: 'blur' }
        ],
        publishStatus: [
          { required: true, message: '请选择发布状态', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写博客文章内容', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填写排序（数字，从1开始）', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字值' }
        ]
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
      qiniuupload(form).then(response => {
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
    },
    backToIndex() {
      this.$router.push({ path: '/information/trade' })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          save(this.temp).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ path: '/information/trade' })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
