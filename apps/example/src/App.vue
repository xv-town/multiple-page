<template>
<div id="app">
  <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link>
  <router-view />
</div>
</template>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}
.ant-btn + .ant-btn {
  margin-left: 10px;
}
</style>
