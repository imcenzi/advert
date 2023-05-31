<template>
  <div class="main-box">
    <div class="title">
      我的奖品
    </div>
    <el-card :body-style="style" class="box-card" v-for="item in 9" :key="item">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        style="height: 100%; float: left;">
      <div class="text-box">
        <div class="prizeName">{{ item }}奖品名称</div>
        <div class="overTime">有效期：2024-12-12</div>
      </div>
    </el-card>
  </div>
</template>

<script>

import '../components/canvas-confetti'

export default {
  data() {
    return {
      //卡片样式
      style: {
        padding: '1%',
        height: '9rem',
      }
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="less">
.prizeName {
  height: 50%;
  font-size: 1.7rem;
}

.overTime {
  height: 50%;
  font-size: 1.3rem;
}

.box-card {
  padding: 1%;
  margin: 1%;
  box-sizing: border-box;
}

.text-box {
  float: left;
  height: 100%;
  padding: 1.5% 5%;
  box-sizing: border-box;
}

.title {
  padding: 1%;
  font-size: 2.2rem;
  text-align: center;
}

.main-box {
  padding: 1%;
}
</style>