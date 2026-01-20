<script setup lang="ts">
import type { AppCommunication } from "@/hooks/useJump";
import bhiufoa from "@/assets/public/9ojhndvnsvodin.png";
import hagqbvu from "@/assets/public/saihfoalksfvads.png";
import { useJump } from "@/hooks/useJump";

defineOptions({
  name: "SetupPage",
});

const { appParams, jumpToUserAgreement, jumpToBlackList } = useJump();

const listData = [
  { label: "Privacy Agreement", value: "0" },
  { label: "User Agreement", value: "1" },
  { label: "Blacklist", value: "2" },
];

const onState = (key: AppCommunication) => {
  appParams({ key, state: 2 });
};

const onSelect = (value: string) => {
  if (value === "2") {
    jumpToBlackList();
  }
  if (value === "0") {
    jumpToUserAgreement("/privacy-agreement");
  }
  if (value === "1") {
    jumpToUserAgreement("/user-agreement");
  }
};
</script>

<template>
  <div safe-area-inset-top class="setup-page_box">
    <ul p-layout-padding class="list-btn">
      <li v-for="item in listData" :key="item.value" @click="onSelect(item.value)">
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <!-- 按钮 -->
    <ul mt-60>
      <li flex justify-center>
        <van-image
          style="width: 310px"
          :src="bhiufoa"
          fit="cover"
          @click="onState('deleteaccount')"
        />
      </li>
      <li mt-5 flex justify-center>
        <van-image
          style="width: 310px"
          :src="hagqbvu"
          fit="cover"
          @click="onState('logout')"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.setup-page_box {
  padding-top: calc(var(--van-nav-bar-height) + var(--ai-view-padding-top));
  min-height: 100vh;
  background: var(--ai-setting-bg-color);
  background: #f5f6f8ff;
}

.list-btn {
  li + li {
    margin-top: 16px;
  }

  li {
    width: var(--ai-setting-select-style-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: var(--ai-setting-select-style-height);
    border-radius: var(--ai-setting-select-style-border-radius);
    background: var(--ai-setting-select-style-bg-color);
    background: #fff;

    span {
      font-size: var(--ai-setting-select-style-text-size);
      font-weight: var(--ai-setting-select-style-text-weight);

      color: black !important;
    }
  }
}

.bottom-btn {
  background-image: var(--ai-setting-btn-color) !important;
  font-size: var(--ai-setting-btn-text-size) !important;
  font-weight: var(--ai-setting-btn-text-weight) !important;
  color: var(--ai-setting-btn-text-color) !important;
}
</style>
