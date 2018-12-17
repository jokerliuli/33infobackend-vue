<template>
  <div class="app-container" >
    <el-form v-loading="loading" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 90%; margin-left:50px;">
      <el-form-item label="资讯标题" prop="title">
        <el-input v-model.trim="temp.title"/>
      </el-form-item>
      <el-form-item label="简略标题" prop="shortTitle">
        <el-input v-model.trim="temp.shortTitle"/>
      </el-form-item>
      <el-form-item label="分类栏目" prop="informationType">
        <el-select v-model="temp.informationType" placeholder="分类栏目" clearable class="filter-item" >
          <el-option
            v-for="item in informationTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文章作者" prop="author">
        <el-input v-model.trim="temp.author"/>
      </el-form-item>
      <el-form-item label="缩略图" prop="thumbnail">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          :limit="1"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">（暂时未完成）只能上传一张jpg/png文件，且不超过500kb</div>
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
        <el-button type="primary" @click="createData()">立即创建</el-button>
      </el-form-item>
    </el-form>
</div></template>

<script>
import Tinymce from '@/components/Tinymce'
import { save, update } from '@/api/information'

export default {
  name: 'AddInformation',
  components: { Tinymce },
  data() {
    return {
      loading: false,
      fileList2: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
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
    if (this.$route.query.editRow != null) {
      this.temp = this.$route.query.editRow
    }
  },
  methods: {
    backToIndex() {
      this.$router.push({ path: '/information/information' })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.$route.query.editRow != null) {
            this.loading = true
            update(this.temp).then(() => {
              this.loading = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ path: '/information/information' })
            })
          } else {
            this.loading = true
            save(this.temp).then(() => {
              this.loading = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ path: '/information/information' })
            })
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }

}
</script>

<style scoped>

</style>
