<template>
  <div class="p-404">
    <h4>页面丢失咯, 请确认访问路径 !</h4>
    <a-button type="primary" @click="toHome">首页</a-button>
  </div>
</template>

<script>
export default {
  name: 'ViewNotFound',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less">
.p-404 {
  padding-top: 160px;
  font-size: 24px;
  text-align: center;
  h4 {
    padding-bottom: 20px;
    color: #1890ff;
  }
}
</style>