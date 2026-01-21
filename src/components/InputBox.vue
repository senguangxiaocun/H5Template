<script setup lang="ts">
import { useAppImgStyle } from "@/hooks/useAppImgStyle";

const { inputSendIcon } = useAppImgStyle();

const value = ref("");

const emit = defineEmits<{
  send: [_: string];
}>();
const onSend = () => {
  emit("send", value.value);
  value.value = "";
};
</script>

<template>
  <div safe-area-inset-bottom px-layout-padding class="input-box">
    <div class="input--width">
      <van-field
        v-model="value"
        placeholder="Say something"
        class="custom-field"
        :border="false"
      />

      <!-- 悬浮发送按钮 -->
      <van-image class="send-float" :src="inputSendIcon" @click="onSend" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.input-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  opacity: 1;
  background: linear-gradient(0deg, rgba(14, 8, 15, 0.8) 0%, rgba(14, 8, 15, 0) 100%);

  .input--width {
    width: var(--ai-field-input-width);
    padding-bottom: 42px;
    position: relative;
  }

  .van-field {
    border-radius: var(--ai-field-input-border-radius);
    height: var(--ai-field-input-height);
    font-size: var(--ai-field-input-font-size);
    font-weight: var(--ai-field-input-font-weight);
    background: var(--ai-field-input-bg-color);

    // :deep(.van-field__button) {
    //   padding-right: 0;
    //   margin-right: 0;
    // }

    :deep(.van-field__body) {
      height: 100%;

      input {
        color: var(--ai-field-input-text-color);

        &::placeholder {
          color: var(--ai-field-placeholder-text-color);
          font-size: var(--ai-field-input-font-size);
          font-weight: var(--ai-field-input-font-weight);
        }
      }
    }
  }

  /* 给输入框右侧预留空间，防止文字被盖住 */
  :deep(.custom-field .van-field__body) {
    padding-right: 48px;
  }

  /* 悬浮发送按钮 */
  .send-float {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-100%);
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
}
</style>
