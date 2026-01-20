<script setup lang="ts">
import HangIcon from "@/assets/public/asfuoei8acoisa.png";
import Head from "@/assets/public/Head.png";
import { useJump } from "@/hooks/useJump";
import { useWindow } from "@/hooks/useWindow";

defineOptions({
  name: "CallIndex",
});

const router = useRouter();
const route = useRoute();
const { queryId } = useJump();
const { winUserListData } = useWindow();
const userData = ref<UserInfo>(null);
const loading = ref(true);
const getData = () => {
  userData.value = winUserListData.find((v) => v.userId === queryId.value);
  loading.value = false;
};

const onBack = () => {
  router.replace({
    path: `/private-chat`,
    query: { id: route.query.cid as string },
  });
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="call-box">
    <div v-if="!loading" flex flex-col justify-center items-center>
      <div
        class="ground-image"
        :style="{
          backgroundImage: `url(${userData.avator || Head})`,
          width: '375px',
          height: '380px',
        }"
      />
      <div class="fade-bg" />
      <div flex flex-col justify-center items-center>
        <div class="avatar-wrap">
          <van-image
            round
            ai-avatar
            :src="userData.avator || Head"
            fit="cover"
            class="avatar-img"
          />

          <span class="avatar-name">
            {{ userData.name }}
          </span>
        </div>
        <span class="opjrpsonv">Calling...</span>
      </div>

      <p
        class="mt-[26vh] !rounded-full !flex !justify-center !items-center !h-16 !w-16"
        @click="onBack"
      >
        <van-image round :src="HangIcon" fit="cover" />
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.opjrpsonv {
  position: absolute;
  top: 42%;
  color: #23232366;
  font-size: 13px;
}
.aheoaias {
  color: black !important;
}
.call-box {
  width: 100%;
  height: 100vh;
  background: var(--ai-private-chat-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // 导入背景图
  background-color: #f5f6f8;
  background-size: cover;
  position: relative;
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

.avatar-wrap {
  position: relative;
  display: inline-block;
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
</style>
