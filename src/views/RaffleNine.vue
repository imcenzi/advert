<template>
  <div ref="mainBox"  class="nine">
    
  </div>
</template>
<script>
export default {
name:'RaffltNine',
data(){

},
methods:{
   //获取窗口大小设置给页面
   setWin () {
            this.winWidth = window.innerWidth;
            this.winHeight = window.innerHeight;
            this.$refs.mainBox.style.height = this.winHeight + 'px'
            this.$refs.mainBox.style.width = this.winWidth + 'px'
        }
},
mounted(){
  this.setWin();
}
    
}
</script>
<style lang="less" scoped>
.nine{

    background-image: url(../assets/homebg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

</style>
