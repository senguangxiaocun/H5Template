<script setup lang="ts">
import Head from "@/assets/public/Head.png";
import Jfgei from "@/assets/public/vugdksivbjaud4_5vsdvaodivh8k.png";
import { detailId } from "@/hooks/useDetail";
import { useUserStore } from "@/stores";

const { userInfo } = useUserStore();

const props = withDefaults(
  defineProps<{
    list?: CommentInfo[];
  }>(),
  {
    list: () => [],
  }
);

// 举报弹框
const isReport = ref(false);
</script>

<template>
  <div safe-area-inset-bottom>
    <empty v-if="props.list.length === 0" />
    <div
      v-for="(item, index) in props.list"
      :key="index"
      p-4
      ai-fill-bg
      ai-rounded
      class="card-comment"
    >
      <ul flex items-start justify-between>
        <li flex items-center>
          <van-image round ai-avatar :src="item?.avator || Head" fit="cover" />
          <span ml-3 ai-user-name>{{ item?.name || "" }} :</span>
        </li>
        <li flex-1 mx-3>
          <span ai-text-desc class="block mt-2">
            {{ item?.content || "" }}
          </span>
        </li>
        <li v-if="userInfo.userId !== item.userId" flex items-center>
          <van-image
            :src="Jfgei"
            :style="{
              width: 'var(--report-image-width)',
              height: 'var(--report-image-height)',
            }"
            @click="
              () => {
                isReport = true;
                detailId = item.userId;
              }
            "
          />
        </li>
      </ul>
    </div>

    <report-box v-model:show="isReport" />
  </div>
</template>

<style lang="less" scoped>
.card-comment + .card-comment {
  margin-top: 12px;
}
</style>
