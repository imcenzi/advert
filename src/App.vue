<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<style lang="less">
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
