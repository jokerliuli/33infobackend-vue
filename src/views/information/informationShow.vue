<template>
  <div v-loading="loading" class="app-container">
    <h1>这是前台展示测试(展示id为1的文章)</h1>
    <div class="editor-content" v-html="temp.content"/>
  </div>
</template>

<script>
import { getOne } from '@/api/information'

export default {
  name: 'InformationShow',
  data() {
    return {
      loading: false,
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
      listQuery: {
        page: 1,
        limit: 1,
        publishStatus: undefined,
        title: undefined,
        informationType: undefined,
        prop: 'updateDate',
        order: 'Desc'
      }
    }
  },
  created() {
    this.getFirstOne()
  },
  methods: {
    getFirstOne() {
      this.loading = true
      getOne({ id: 1 }).then(response => {
        this.temp = response.data.data
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
