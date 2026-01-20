<script setup lang="ts">
import { closeToast, showLoadingToast, showSuccessToast, showToast } from "vant";
import { useJump } from "@/hooks/useJump";
import { useWindow } from "@/hooks/useWindow";
import { useUserStore } from "@/stores";

defineOptions({
  name: "SendDynamic",
});

const { userInfo } = useUserStore();
const { appParams } = useJump();
const { winDynamicData, winPublishImageListData } = useWindow();
const listData = ref<DynamicInfo[]>(winDynamicData);

const formData = reactive({
  userId: userInfo.userId,
  dynamicType: 0,
  dynamicDesc: "",
  dynamicTitleType: 0,
  dynamicPic: [],
  dynamicTag: [],
});

const onSubmit = async () => {
  if (!formData.dynamicDesc) {
    return showToast("Please enter the content");
  }
  if (formData.dynamicPic.length === 0) {
    return showToast("Please upload at least one picture");
  }
  if (formData.dynamicPic[0].status === "uploading") {
    return showToast("Please wait for the picture to upload");
  }

  const data = {
    ...formData,
    dynamicVideo: "",
    dynamicLikeCount: 0,
    dynamicCommentCount: 0,
    dynamicId: `${Date.now()}_image`,
    dynamicPic: formData.dynamicPic.map((v) => v.url),
  } as DynamicInfo;

  listData.value.unshift(data);

  // 1. 显示 Loading（手动控制）
  showLoadingToast({
    message: "Loading...",
    forbidClick: true,
    duration: 0,
  });

  // 2. 随机延迟 500–2000ms
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (2000 - 500 + 1)) + 500)
  );

  // 3. 关闭 Loading
  closeToast();

  // 4. 成功提示
  showSuccessToast("Published successfully.");

  // 5. 延迟 1 秒再执行后续逻辑
  setTimeout(() => {
    appParams({
      key: "updatePost",
      value: listData.value,
      state: 0,
    });
  }, 1000);
};
</script>

<template>
  <div safe-area-inset-top px-layout-padding class="send-dynamic_box">
    <!-- 输入框 -->
    <text-box v-model="formData.dynamicDesc" />

    <div mt-9>
      <!-- 主题选项 -->
      <div>
        <div class="titlescasca">Topic</div>
        <ul flex justify-between>
          <li
            v-for="item in winPublishImageListData"
            :key="item.value"
            ai-default-btn
            :class="{
              fibsaoihvs9hnd: formData.dynamicTitleType === item.value,
              subfiquswikbav: formData.dynamicTitleType !== item.value,
            }"
            @click="
              formData.dynamicTitleType = item.value;
              formData.dynamicTag = [item.name];
            "
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 图片上传 -->
      <div mt-6>
        <div class="titlescasca">Upload(Pic)</div>
        <uploader-box v-model:list="formData.dynamicPic" />
      </div>

      <!-- 底部按钮 -->
      <div mt-20 flex justify-center>
        <van-image
          style="width: 180px"
          src="src/assets/public/voisbvdsg_aebnguia8fafi.png"
          fit="cover"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.subfiquswikbav {
  background: #efedeeff;
  color: #222222ff;
}
.fibsaoihvs9hnd {
  background: linear-gradient(to right, #ec5b79, #f093ae);
  color: #fff;
}
.titlescasca {
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.send-dynamic_box {
  padding-top: calc(var(--van-nav-bar-height) + var(--ai-view-padding-top));
  background: url("src/assets/public/aeuvb7ga3bca_asfui8sfhia.png");
  background-size: cover;
  min-height: 100vh;
}
</style>
