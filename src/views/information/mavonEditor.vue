<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex">
      <el-col :span="12"><el-input v-model.trim="temp.title" placeholder="输入文章标题"/></el-col>
      <el-col :span="4"><el-button type="primary" @click="publish">发布文章</el-button></el-col>
    </el-row>

    <div style="margin: 20px;"/>

    <div id="editor">
      <el-alert :closable="true" title="tips：图片较小时可以直接上传，图片较大时建议先通过菜单：图片上传，上传后获取url，再添加图片链接！" type="success"/>
      <mavon-editor ref="mavonEditor" v-model="value" style="height: 100%" @imgAdd="$imgAdd"/>
    </div>

    <!--<el-button @click="test">test</el-button>-->

  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MavonEditor',
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      value: '',
      dialogFormVisible: false,
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
      },
      informationTypeOptions: [
        // 新闻动态，产品方案，成功案例
        { value: 1, label: '新闻动态' },
        { value: 2, label: '产品方案' },
        { value: 3, label: '成功案例' }
      ]
    }
  },
  methods: {
    $imgAdd(pos, $file) {
      console.log(mavonEditor)
      console.log(this.$refs.mavonEditor)
      this.$refs.mavonEditor.$img2Url(pos, $file.miniurl)
    },
    publish() {
      this.dialogFormVisible = true
    },
    test() {
      console.log(this.value)
    }
  }
}
</script>

<style scoped>
  #editor {
    margin: auto;
    /*width: 80%;*/
    height: 750px;
  }
</style>
