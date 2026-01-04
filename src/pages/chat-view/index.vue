<script setup lang="ts">
import ChatBack from '@/assets/public/chat-index.png'
import MasonryIcon from '@/assets/public/masonry-icon.png'
import { useAppImgStyle } from '@/hooks/useAppImgStyle'
import { useJump } from '@/hooks/useJump'
import { useWindow } from '@/hooks/useWindow'
import { useUserStore } from '@/stores'

defineOptions({
  name: 'ChatView'
})

const { chatBgImage } = useAppImgStyle()
const { winUserData, winUserListData, winChatBotDesc } = useWindow()
const { userInfo } = useUserStore()
const { jumpToRecharge, appParams, jumpToChatDetail } = useJump()

/** 弹框  */
const show = ref(false)

const onSubmit = () => {
  show.value = !(userInfo.coins >= winChatBotDesc.points)
  if (userInfo.coins >= winChatBotDesc.points) {
    const data = {
      ...winUserData,
      coins: userInfo.coins - winChatBotDesc.points
    }

    const list = winUserListData.map((v) => {
      if (v.userId === data.userId) {
        v.coins = data.coins
      }
      return v
    })
    appParams({ key: 'updateUser', value: list, state: 1 })
    jumpToChatDetail()
  }
}
</script>

<template>
  <div relative class="chat-view_box">
    <van-image :src="ChatBack" fit="cover" class="top-back" />
    <div class="text-center w-full top-34vh absolute">
      <ul p-layout-padding>
        <li ai-input-title>{{ winChatBotDesc.title }}</li>
        <li
          ai-text-desc
          class="mt-7 !text-center !text-[var(--ai-chat-view-text-color)] content_box"
        >
          {{ winChatBotDesc.content }}
        </li>
        <li flex justify-center class="public-btoom-btn">
          <p ai-gradient-btn class="bottom-btn public_btn" @click="onSubmit">
            <van-image h-12 w-12 :src="MasonryIcon" fit="cover" />
            <span text-4 font-400 ml-1 color="#FFEB3B">
              -{{ winChatBotDesc.points }}
            </span>
            <span text-4 font-700 ml-8 mr-1 color="#FFFFFF">Chat</span>
          </p>
        </li>
      </ul>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div flex h-full justify-center>
        <div class="block" @click.stop>
          <div
            :style="{ background: `url(${chatBgImage})` }"
            class="content"
            style="background-size: cover"
          />
          <div mt-8 flex justify-center>
            <p ai-gradient-btn @click="jumpToRecharge()">Recharge</p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="less" scoped>
.chat-view_box {
  background: var(--ai-chat-view-bg-color);
  height: 100vh;
  overflow-y: auto;
  .content_box {
    background: var(--ai-chat-view-bg-color);
    padding-bottom: calc(50px + var(--ai-view-padding-bottom));
    padding-left: 40px;
    padding-right: 40px;
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

  .content {
    width: 280px;
    height: 192px;
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
