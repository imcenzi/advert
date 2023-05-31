<template>
  <div>
    <div class='img_hover'>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {



  },
  mounted() {
  }
}
</script>
<style>
.img_hover {
  transition-duration: 4s;
  width: 10px;
  height: 10px;
  background-color: burlywood;
}

.img_hover:hover {
  height: 300px;
  width: 300px;
}
</style>