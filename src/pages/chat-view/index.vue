<script setup lang="ts">
import dxveivfb from "@/assets/public/fdvbakjbdv_aufbvavdbs.png";
import jcoiaehf from "@/assets/public/sabvovd_bf43bdkvs8nvs.png";
import zxmeiuvc from "@/assets/public/xhiofaieofals_vavodiknvpa.png";
import { useAppImgStyle } from "@/hooks/useAppImgStyle";
import { useJump } from "@/hooks/useJump";
import { useWindow } from "@/hooks/useWindow";
import { useUserStore } from "@/stores";

defineOptions({
  name: "ChatView",
});

const { chatBgImage } = useAppImgStyle();
const { winUserData, winUserListData, winChatBotDesc } = useWindow();
const { userInfo } = useUserStore();
const { jumpToRecharge, appParams, jumpToChatDetail } = useJump();

/** 弹框  */
const show = ref(false);

const onSubmit = () => {
  show.value = !(userInfo.coins >= winChatBotDesc.points);
  if (userInfo.coins >= winChatBotDesc.points) {
    const data = {
      ...winUserData,
      coins: userInfo.coins - winChatBotDesc.points,
    };

    const list = winUserListData.map((v) => {
      if (v.userId === data.userId) {
        v.coins = data.coins;
      }
      return v;
    });
    appParams({ key: "updateUser", value: list, state: 1 });
    jumpToChatDetail();
  }
};
</script>

<template>
  <div relative class="chat-view_box">
    <van-image
      :src="jcoiaehf"
      fit="cover"
      class="top-back"
      style="height: 300px; width: 375px"
    />
    <div class="text-center w-full top-34vh absolute">
      <ul p-layout-padding>
        <li ai-input-title>{{ winChatBotDesc.title }}</li>
        <li ai-text-desc class="mt-7 !text-[var(--ai-chat-view-text-color)] content_box">
          {{ winChatBotDesc.content }}
        </li>
        <li flex justify-center>
          <!-- <p
            style="background-color: #222222"
            class="bottom-btn public_btn"
            @click="onSubmit"
          >
            <van-image h-8 w-8 :src="MasonryIcon" fit="cover" />
            <span text-5 font-400 ml-1 style="color: #ffffff">
              - {{ winChatBotDesc.points }}
            </span>
          </p> -->
          <van-image
            style="width: 190px; padding-top: 50px"
            :src="dxveivfb"
            fit="cover"
            @click="onSubmit"
          />
        </li>
      </ul>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div flex h-full justify-center>
        <div class="block flex flex-col items-center" gap-8 @click.stop>
          <div
            :style="{ background: `url(${chatBgImage})` }"
            class="content"
            style="background-size: cover"
          >
            <span mt-18 style="color: #ffffff">Sorry</span>
            <span mt-3 style="color: #ffffff; padding-bottom: 20px"
              >your current balance is insufficient</span
            >
          </div>

          <van-image
            style="width: 180px"
            :src="zxmeiuvc"
            fit="cover"
            @click="jumpToRecharge()"
          />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="less" scoped>
.chat-view_box {
  // background: var(--ai-chat-view-bg-color);
  background-image: url("https://huanniuchat.oss-ap-northeast-1.aliyuncs.com/cosky_20260115/dhaidvvndbf.png");
  background-size: cover; // 关键 ①：铺满
  height: 100vh;
  overflow-y: auto;
  .content_box {
    // background: var(--ai-chat-view-bg-color);
    padding-bottom: calc(50px + var(--ai-view-padding-bottom));
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
    color: #222222 !important;
  }
}

.top-back {
  width: 100%;
  height: 510px;
}

.bottom-btn {
  width: var(--ai-chat-view-btn-width);
  height: var(--ai-chat-view-btn-height);
  color: var(--ai-chat-view-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.block {
  margin-top: 20vh;
  height: 300px;
  display: flex;
  flex-direction: column; /* 上下排列 */
  align-items: center; /* 水平居中 */

  .content {
    width: var(--ai-chat-view-popup-bg-img-width);
    height: var(--ai-chat-view-popup-bg-img-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: var(--ai-chat-view-popup-title-text-color);
      font-size: var(--ai-chat-view-popup-title-font-size);
      font-weight: var(--ai-chat-view-popup-title-font-weight);

      &:nth-child(2) {
        color: var(--ai-chat-view-popup-desc-text-color);
        font-size: var(--ai-chat-view-popup-desc-text-size);
        font-weight: var(--ai-chat-view-popup-desc-text-weight);
      }
    }
  }
}
</style>
