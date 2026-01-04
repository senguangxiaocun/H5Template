<script setup lang="ts">
import EmptyIcon from "@/assets/public/empty-icon.png";
</script>

<template>
  <div class="center-wrap">
    <van-image round :src="EmptyIcon" fit="cover" width="122px" />
  </div>
</template>

<style lang="less" scoped>
.center-wrap {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
