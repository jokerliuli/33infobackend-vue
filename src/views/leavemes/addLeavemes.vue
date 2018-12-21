<template>
  <div class="app-container">
    <h1>这是前台展示测试</h1>

    <div style="margin: 20px;"/>
    <el-form v-loading="loading" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
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
      <el-form-item style="float:right">
        <el-button @click="backToIndex()">返回列表</el-button>
        <el-button type="primary" @click="createData()">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save } from '@/api/leavemes'

export default {
  name: 'AddLeavemes',
  data() {
    return {
      temp: {
        title: '',
        createDate: '2018-12-14 10:27:37',
        name: '',
        mobile: '17626013473',
        email: '1074199421@qq.com',
        address: '',
        content: null
      },
      loading: false,
      rules: {
        title: [
          { required: true, message: '请填写留言标题(150字符以内)', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在150字符以内', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名(100字符以内)', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在100字符以内', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) === false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请填写email', trigger: 'blur' },
          { type: 'email', message: '请输入正确的email地址', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请填写地址(200字符以内)', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在200字符以内', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写留言内容(500字符以内)', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在500字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backToIndex() {
      this.$router.push({ path: '/leavemes/leavemes' })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          save(this.temp).then(() => {
            this.loading = false
            this.backToIndex()
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
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
