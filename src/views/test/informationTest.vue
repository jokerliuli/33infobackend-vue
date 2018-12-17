<template>
  <div v-loading="loading" class="app-container">
    <h1>
      此处模拟前端展示富文本编辑后的样式
    </h1>
    <div class="editor-content" v-html="temp.content"/>
  </div>
</template>

<script>
import { getpage } from '@/api/information'

export default {
  name: 'InformationTest',
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
      listQuery: {
        page: 1,
        limit: 1,
        publishStatus: undefined,
        title: undefined,
        informationType: undefined,
        prop: 'updateDate',
        order: 'descending'
      }
    }
  },
  created() {
    this.getListBypage()
  },
  methods: {
    getListBypage() {
      this.loading = true
      getpage(this.listQuery).then(response => {
        this.temp = response.data.data.records[0]
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
