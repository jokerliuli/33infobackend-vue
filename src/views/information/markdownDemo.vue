<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex">
      <el-col :span="12"><el-input v-model.trim="temp.title" placeholder="输入文章标题"/></el-col>
      <el-col :span="4"><el-button type="primary" @click="publish">发布文章</el-button></el-col>
    </el-row>
    <div style="margin: 20px;"/>

    <div class="editor-container">
      <el-alert :closable="true" title="tips：图片较小时可以直接上传，图片较大时建议先通过菜单：图片管理，上传后获取url，再添加图片链接！" type="success"/>
      <markdown-editor ref="markdownEditor" v-model="content" height="700px"/>
    </div>
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">Get HTML</el-button>
    <div v-html="html"/>

    <el-dialog :visible.sync="dialogFormVisible" title="发布文章" width="35%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="temp.title"/>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag">
          <el-tag
            v-for="tag in temp.tags"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          <!--<el-alert :closable="true" title="tips：上限5个标签" type="error" style="height: 35px"/>-->
        </el-form-item>
        <el-form-item label="分类栏目" prop="informationType">
          <el-select v-model="temp.informationType" placeholder="请选择" class="filter-item" style="width: 110px">
            <el-option
              v-for="item in informationTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="电话" prop="mobile">-->
        <!--<el-input v-model.trim="temp.mobile"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="邮箱" prop="email">-->
        <!--<el-input v-model.trim="temp.email"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="地址" prop="address">-->
        <!--<el-input v-model.trim="temp.address"/>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="updateData()">保存为草稿</el-button>
          <el-button type="primary" @click="updateData()">确定发布</el-button>
        </div>
    </el-form></el-dialog>

  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      content: '',
      html: '',
      dialogFormVisible: false,
      dynamicTags: ['成功产品', '方案'],
      inputVisible: false,
      inputValue: '',
      informationTypeOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '新闻动态' },
        { value: 2, label: '产品方案' },
        { value: 3, label: '成功案例' }
      ],
      rules: {
        title: [
          { required: true, message: '请填写留言标题(150字符以内)', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在150字符以内', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        informationType: [
          { required: true, message: '请选择', trigger: 'change' }
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
        shortTitle: '',
        informationType: 1,
        author: '',
        thumbnail: 'https://joker-1256309280.cos.ap-shanghai.myqcloud.com/demo/static/icon.png',
        summary: '',
        keyword: '',
        publishStatus: 1,
        content: '',
        tags: ['成功产品', '方案']
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  methods: {
    publish() {
      this.dialogFormVisible = true
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.temp.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .editor-container{
    margin-bottom: 30px;
  }
  .tag-title{
    margin-bottom: 5px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
