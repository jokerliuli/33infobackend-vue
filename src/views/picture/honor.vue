<template>
  <div class="app-container" >
    <div>
      <tinymce :height="600" v-model="honor.content"/>
    </div>
    <div>
      <el-button type="primary" @click="update()">更新</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { page, update } from '@/api/honor'

export default {
  name: 'Honor',
  components: { Tinymce },
  data() {
    return {
      honor: { content: '' },
      honorQuery: {},
      listQuery: {
        page: 1,
        limit: 1
      }
    }
  },
  created() {
    this.getListBypage()
  },
  methods: {
    update() {
      this.loading = true
      update(this.honor).then(response => {
        this.loading = false
        this.$notify({
          title: '成功',
          message: '更新成功',
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
    getListBypage() {
      this.loading = true
      page(this.listQuery, this.honorQuery).then(response => {
        this.honor = response.data.data.records[0]
        this.total = response.data.data.total
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
