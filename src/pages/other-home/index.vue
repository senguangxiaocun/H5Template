<script setup lang="ts">
import { showLoadingToast } from "vant";
import Head from "@/assets/public/Head.png";
import bnyrhrd from "@/assets/public/oihoaqwkfas_giaqskbca.png";
import { useAppImgStyle } from "@/hooks/useAppImgStyle";
import { detailId } from "@/hooks/useDetail";
import { useJump } from "@/hooks/useJump";
import { useWindow } from "@/hooks/useWindow";
import { useUserStore } from "@/stores";

defineOptions({
  name: "other-home",
});

const { reportIcon, otherHomeLikeIcon } = useAppImgStyle();
const { queryId, jumpToDetail, appParams, jumpToPrivateChat } = useJump();
const { winUserListData, winDynamicData, winChatListData } = useWindow();
const useData = useUserStore();

// 举报弹框
const isReport = ref(false);
const userInfo = ref<UserInfo>(null);
const bottomList = ref<DynamicInfo[]>([]);
const loading = ref(true);
/** 是否显示关注 */
const isShowFollow = ref(false);
// const allUserList = ref<UserInfo[]>(winUserListData);

const getData = () => {
  userInfo.value = winUserListData.find((v) => v.userId === queryId.value);

  detailId.value = userInfo.value.userId;

  bottomList.value = winDynamicData.filter((v) => v.userId === userInfo.value.userId);
  console.log(bottomList.value, "====");
  isShowFollow.value = useData.userInfo.follow.includes(userInfo.value.userId);
  loading.value = false;
};

const onGoDetail = (item: DynamicInfo) => {
  jumpToDetail(item.dynamicId, item.dynamicType, queryId.value);
};

// const onFollow = () => {
//   useData.userInfo.follow.push(userInfo.value.userId);
//   userInfo.value.fans.push(useData.userInfo.userId);
//   allUserList.value.forEach((v) => {
//     if (v.userId === useData.userInfo.userId) {
//       v.follow = useData.userInfo.follow;
//     }
//     if (v.userId === userInfo.value.userId) {
//       v.fans = userInfo.value.fans;
//     }
//   });
//   isShowFollow.value = true;
//   appParams({ key: "updateUser", value: allUserList.value, state: 1 });
// };

const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() 是 0-11
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const onAddChat = () => {
  const chatItem = winChatListData.find((v) => {
    return (
      v.chatUserIds.includes(userInfo.value.userId) &&
      v.chatUserIds.includes(useData.userInfo.userId)
    );
  });
  if (chatItem) {
    jumpToPrivateChat(chatItem.chatId, queryId.value);
  } else {
    // 时间戳
    const item: ChatInfo = {
      chatId: `${Date.now()}_chatId`,
      chatUserIds: [userInfo.value.userId, useData.userInfo.userId],
      lastSendContent: "",
      lastSendTime: getCurrentDateTime(),
      unreadMsgCount: 0,
      lastSendUserId: useData.userInfo.userId,
    };
    window?.chatListJson.push(item);

    showLoadingToast({
      message: "Loading...",
      forbidClick: true,
      onClose: () => {
        appParams({
          key: "uploadChat",
          value: window?.chatListJson,
          state: 1,
        });
        jumpToPrivateChat(item.chatId, queryId.value);
      },
    });
  }
};

onMounted(() => {
  getData();
});

const shouldShowReport = (item) => {
  // 不显示自己
  return item.userId !== useData.userInfo.userId;
};
</script>

<template>
  <div class="all">
    <div v-if="!loading" class="other-home_box">
      <div
        class="ground-image"
        :style="{
          backgroundImage: `url(${userInfo.avator || Head})`,
          width: '375px',
          height: '380px',
        }"
      />
      <div class="fade-bg" />
      <div class="top-user-info">
        <!-- <div class="avatar-info">
          <van-image
            round
            ai-avatar
            :src="userInfo.avator || Head"
            fit="cover"
            class="user-head"
          />
          <span mt-1 ai-user-name>{{ userInfo.name }}</span>
        </div> -->

        <div flex flex-col justify-center items-center>
          <div class="avatar-wrap">
            <van-image
              round
              ai-avatar
              :src="userInfo.avator || Head"
              fit="cover"
              class="avatar-img"
            />

            <span class="avatar-name">
              {{ userInfo.name }}
            </span>
          </div>
        </div>
        <div style="height: 20px" />
        <ul text-white flex justify-around class="number-box">
          <li>
            <span>{{ bottomList.length }}</span>
            <span>Posts</span>
          </li>
          <li>
            <span>{{ userInfo.fans.length }}</span>
            <span>Fans</span>
          </li>
          <li>
            <span>{{ userInfo.follow.length }}</span>
            <span>Follow</span>
          </li>
        </ul>
        <ul px-layout-padding class="bottom-box" style="margin: 6px">
          <li>{{ userInfo.about }}</li>
          <!-- <li
          v-if="shouldShowReport(userInfo)"
        >
          <van-image :src="otherHomeMessageIcon" class="icon-box"
            :style="{
              width: 'var(--other-home-chat-width)',
              height: 'var(--other-home-chat-height)'
            }"/>
          <span ml-3 class="public-number !mt-0" @click="onAddChat">
            Chat
          </span>
        </li> -->
          <van-image
            v-if="useData.userInfo.userId !== userInfo.userId"
            style="width: 180px"
            :src="bnyrhrd"
            fit="cover"
            @click="onAddChat"
          />
        </ul>
        <p style="margin-left: 20px; font-weight: 700; margin-top: 6px">POST</p>
      </div>

      <div p-layout-padding class="bottom-card" style="position: relative">
        <!-- 内容卡片 -->
        <div
          v-for="(item, index) in bottomList"
          :key="index"
          class="card-item"
          @click="onGoDetail(item)"
        >
          <ul class="top-info">
            <!-- <li>
            <van-image round ai-avatar :src="Head" fit="cover" />
            <span mx-2 ai-user-name>Apien</span>
            <span ai-tag-btn class="tag"># Theme</span>
          </li> -->
            <li />
          </ul>
          <ul class="bottom-img">
            <li w-full>
              <van-image
                rounded-2
                h-50
                w-full
                overflow-hidden
                :src="item.dynamicPic[0] || Head"
                fit="cover"
                position="top"
              />
            </li>
            <!-- <li>
            <van-image rounded-2 h-23.5 w-22 overflow-hidden :src="Head" fit="cover" />
            <van-image rounded-2 h-23.5 w-22 overflow-hidden :src="Head" fit="cover" />
          </li> -->
          </ul>
          <ul class="dfeiobfoa">
            <li class="rowrowrowrow">
              <van-image
                round
                ai-avatar
                :src="userInfo.avator || Head"
                fit="cover"
                class="iejfjnfiweo"
              />

              <span class="qofnnkguaibs">{{ userInfo.name }}</span>
            </li>
          </ul>
          <van-image
            v-if="shouldShowReport(item)"
            :src="reportIcon"
            :style="{
              width: 'var(--report-image-width)',
              height: 'var(--report-image-height)',
            }"
            class="udaibvciua"
            @click.stop="
              () => {
                isReport = true;
                detailId = item.userId;
              }
            "
          />
          <span class="bottom-text">{{ item.dynamicDesc }}</span>
          <div class="like-box">
            <van-image
              :src="otherHomeLikeIcon"
              class="icon-box"
              :style="{
                width: 'var(--other-home-like-post-width)',
                height: 'var(--other-home-like-post-height)',
              }"
            />
            <span class="public-number">{{ item.dynamicLikeCount }}</span>
          </div>
        </div>
      </div>

      <report-box v-model:show="isReport" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.public-number {
  color: #fff;
}

.rowrowrowrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.qofnnkguaibs {
  color: #fff;
  font-weight: 600;
  flex: 1;
  text-align: center;
}

.iejfjnfiweo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.dfeiobfoa {
  position: absolute;
  top: 0px;
  margin: 24px;
}

.udaibvciua {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px !important;
  height: 32px !important;
}

.avatar-wrap {
  position: relative;
  display: inline-block;
  margin-top: 95px;
}

.avatar-img {
  width: 80px;
  height: 80px;
}

.avatar-name {
  position: absolute;
  left: 50%;
  bottom: -8px; /* 关键：压到头像下半部分 */
  transform: translateX(-50%);

  background: #7564d1ff;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1.5px solid #ffffff;
  display: inline-block;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;

  white-space: nowrap;
}

.ground-image {
  position: absolute;
  top: 0;
  background-size: cover;
}
.fade-bg {
  width: 100vw;
  height: 380px;
  position: absolute;
  top: 0;
  background: linear-gradient(to top, #f5f6f8ff, rgba(255, 255, 255, 0));
}
.all {
  position: relative;
}
.other-home_box {
  min-height: 100vh;
  background: var(--ai-other-home-bg-color);
  background: #f5f6f8ff;
  position: absolute;
}

.top-user-info {
  // background: url("@/assets/public/top-home.png");
  position: relative; /* 或 absolute / fixed */

  background-size: cover;
  width: 100%;
  height: 346px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .bottom-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      color: var(--ai-other-home-right-desc-text-color);
      color: black !important;
      font-size: var(--ai-other-home-right-desc-text-weight);
      font-weight: var(--ai-other-home-right-desc-text-size);

      &:nth-child(2) {
        margin-left: 10px;
        width: var(--ai-other-home-right-btn-style-width);
        height: var(--ai-other-home-right-btn-style-height);
        flex-shrink: 0;
        border-radius: var(--ai-other-home-right-btn-style-border-radius);
        background: var(--ai-other-home-right-btn-style-bg-color);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .number-box {
    margin: 6px 0;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: var(--ai-other-home-top-data-desc-text-size);
        font-weight: var(--ai-other-home-top-data-desc-text-weight);
        color: black;

        &:nth-child(2) {
          font-size: var(--ai-other-home-top-data-text-text-size);
          font-weight: var(--ai-other-home-top-data-text-text-weight);
          color: #232323b2;
        }
      }
    }
  }
}

.avatar-info {
  padding: 96px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-head {
    width: 83px;
    height: 83px;
    border: 3px solid #fff;
  }
}

.bottom-card {
  .card-item + .card-item {
    margin-top: 20px;
  }

  .card-item {
    background: #fff;
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    .top-info {
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;

        .tag {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .bottom-img {
      padding: 0 12px 12px;
      display: flex;
      justify-content: space-between;

      li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .bottom-text {
      position: absolute;
      bottom: 0;
      // background: linear-gradient(90deg, #0e080f78 0%, rgba(14, 8, 15, 0) 100%);
      height: 42px;
      width: 100%;
      line-height: 42px;
      padding: 0 16px;
      font-size: var(--ai-other-home-card-desc-text-size);
      font-weight: var(--ai-other-home-card-desc-text-weight);
      color: var(--ai-other-home-card-desc-text-color);
      text-align: var(--ai-other-home-card-desc-text-sort);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 6px;
      padding-right: 46px;
    }

    .like-box {
      position: absolute;
      bottom: 26px;
      right: 16px;
      display: flex;
      flex-direction: column;
      align-self: center;
    }
  }
}
</style>
