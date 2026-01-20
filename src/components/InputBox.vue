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
      <!-- <van-field v-model="value" safe-area-inset-bottom placeholder="Say something"> -->
      <!-- <template #button>
          <div flex items-center>
            <van-image
              :src="inputSendIcon"
              :style="{
                width: 'var(--comment-input-image-width)',
                height: 'var(--comment-input-image-height)',
              }"
              @click="onSend"
            />
          </div>
        </template>
      </van-field> -->

      <van-field
        v-model="value"
        placeholder="Say something"
        class="custom-field"
        :border="false"
      />

      <!-- 悬浮发送按钮 -->
      <van-image class="send-float" :src="inputSendIcon" @click="onSend" />
      <!-- </van-field> -->
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
  padding-top: 10px;

  opacity: 1;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);

  .input--width {
    width: var(--ai-field-input-width);
    padding-bottom: 36px;
  }

  .van-field {
    border-radius: 16px;
    height: var(--ai-field-input-height);
    font-size: var(--ai-field-input-font-size);
    font-weight: var(--ai-field-input-font-weight);
    background: var(--ai-field-input-bg-color);
    background-color: #7564d1;

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

  .send-float {
    position: absolute;
    right: 20px;
    top: 61%;
    transform: translateY(-100%);
    width: 46px;
    height: 46px;
    cursor: pointer;
  }
}
</style>
