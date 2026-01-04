<script setup lang="ts">
console.log("输入框");

const show = defineModel<boolean>("show", {
  type: Boolean,
  required: true,
  default: false,
});
</script>

<template>
  <van-popup
    v-model:show="show"
    class="popup-bg"
    safe-area-inset-bottom
    round
    position="bottom"
  >
    <!-- 上方悬浮图片 -->
    <img
      src="@/assets/public/delete-icon.png"
      class="popup-top-image"
      @click="show = false"
    />

    <!-- 内容 -->
    <div class="popup-content">
      <slot />
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
.popup-bg {
  background-image: url("src/assets/public/stacltinocep_osnicspeg.png");
  background-size: cover; /* 覆盖整个弹窗 */
  background-repeat: no-repeat;
  background-position: center;
}

/* 上方小图片 */
.popup-top-image {
  position: absolute;
  // top: -24px; // 控制悬浮高度
  left: 85%;
  // transform: translateX(-50%);
  width: 36px;
  height: 36px;
  padding-top: 12px;
  padding-left: 12px;
  z-index: 10;
}
/* 内容区域 */
.popup-content {
  padding-top: 24px; // 给图片让位
}
</style>
