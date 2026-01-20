/**
 * 全局图片配置项
 */

import SendIcon from '@/assets/images/ahfsouefbzkjbv_aiehfoaincklais.png'
import Like from '@/assets/images/azxvt2ycyua4yvyucai7av1.png'
import loveIcon from '@/assets/images/azxvt2ycyua4yvyucai7av2.png'
import LeftIcon from '@/assets/nav-bar/fheyiappashczbhdfq.png'
import RightMore from '@/assets/nav-bar/zvcjhvahywv3vajfc6bcjk.png'
import Add from '@/assets/public/add.png'
import DialogBox from '@/assets/public/dialog-box.png'
import Message from '@/assets/public/message.png'
import RightIcon from '@/assets/public/right-icon.png'

export const useAppImgStyle = () => {
  // const styleJson = window.styleJson

  /** 输入框右侧图标 */
  const inputSendIcon = computed(() => SendIcon)

  /** 首页详情页点赞图标 */
  const detailLikeIcon = computed(() => loveIcon)

  /** 举报图标 */
  const reportIcon = computed(() => RightMore)

  /** 返回图标 */
  const backIcon = computed(() => LeftIcon)

  /** 聊天机器人页面底部按钮图标 */
  const chatBtnIcon = computed(() => RightIcon)
  /** 背景图 */
  const chatBgImage = computed(() => DialogBox)
  /** ========== */

  /** 短视频添加图标 */
  const addIcon = computed(() => Add)
  /** 短视频留言图标 */
  const messageIcon = computed(() => Message)
  /** 短视频点赞图标 */
  const likeIcon = computed(() => Like)

  /** 其它主页添加图标 */
  const otherHomeAddIcon = computed(() => Add)
  /** 其它主页留言图标 */
  const otherHomeMessageIcon = computed(() => Message)
  /** 其它主页点赞图标 */
  const otherHomeLikeIcon = computed(() => Like)

  return { inputSendIcon, detailLikeIcon, reportIcon, backIcon, chatBtnIcon, chatBgImage, addIcon, messageIcon, likeIcon, otherHomeAddIcon, otherHomeMessageIcon, otherHomeLikeIcon }
}
