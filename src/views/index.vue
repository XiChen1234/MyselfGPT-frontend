<template>
  <div class="main">
    <div class="sidebar">
      <div class="title">历史对话记录</div>
      <el-button class="new-talk-button" type="primary" @click="creatTalk">新建对话</el-button>
      <el-scrollbar class="talk-list">
        <el-text class="talk-item"
                 truncated
                 v-for="talk in talkList"
                 @click="changeTalk(talk.index)">
          <span :class="{ 'checked' : talk.index === talkIndex }">
            {{ talk.title }}
          </span>
        </el-text>
      </el-scrollbar>
    </div>
    <div class="container">
      <div class="header">
        <div class="title">
          <img src="../assets/image/logo.svg" alt="logo" class="logo">
          <span class="subtitle">你的智慧生活，一键触达</span>
        </div>
        <div style="margin-right: 30px">
          <img src="../assets/image/head.jpg" alt="head" class="avatar">
          <el-button type="danger" @click="exitLogin">退出登录</el-button>
        </div>
      </div>
      <el-scrollbar class="message-list">
        <div class="message robot">您好，我是Myself GPT智能助手，请问有什么能够帮您！\（^_^）/</div>
        <div v-for="message in messageList" v-if="messageList.length !== 0">
          <div class="message user" v-if="message.question">{{ message.question }}</div>
          <div class="message robot" v-if="message.answer">{{ message.answer }}</div>
          <div class="loading" v-if="!message.answer">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </el-scrollbar>
      <div class="input-area">
        <el-input class="input"
                  type="textarea"
                  v-model="input"
                  :autosize="{minRows:1, maxRows:4}"
        ></el-input>
        <el-button class="send-button" type="primary" @click="submit(input)">发送</el-button>
      </div>
      <p class="tip">内容由讯飞星火大模型生成，仅供参考</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {creatNewMessage, creatNewTalk, getTalkList, saveAnswer} from "@/apis/API.js";
import router from "@/router/index.js";

// 初始化数据
const talkList = ref([])
const talkIndex = ref()
const messageList = ref([])
const input = ref('')
const userId = 1

/**
 * 挂载阶段的钩子函数
 */
onMounted(() => {
  getData(userId.toString()) // 获取初始数据 todo: 应该从session中去取的，这里先用假数据
})

// websocket
const ws = new WebSocket('ws://localhost:8089/api/websocket/' + userId)
/**
 * websocket收到消息触发的函数
 * @param e 事件对象
 */
ws.onmessage = (e) => {
  console.log(e.data)

  const data = JSON.parse(e.data)
  const flag = data['flag'];
  const text = data['text'];
  const index = messageList.value.length - 1
  messageList.value[index].answer = text

  if (flag) {
    saveAnswer(userId.toString(), talkIndex.value, text)
  }
}

/**
 * 向服务器发送信息，并将其存储
 * @param {object} text 输入的信息
 */
function sendMessage(text) {
  // websocket服务器
  ws.send(text)

  // 正常服务器
  creatNewMessage(messageList.value.length, text, talkIndex.value)
}

/**
 * 发送消息
 * @param {string} text 输入的内容
 */
function submit(text) {
  if (text === '') return

  // 向服务器发送数据
  sendMessage(text)

  // 更新标题
  if (talkList.value[talkIndex.value].title === "新对话") {
    talkList.value[talkIndex.value].title = text
  }

  // 前端自行处理数据
  const message = {
    index: messageList.value.length,
    question: text,
    answer: ''
  }
  messageList.value.push(message)
  talkList.value[talkIndex.value].messageList = messageList.value
  input.value = ''
}

/**
 * 修改当前对话的场景
 * @param {number} index 目标索引
 */
function changeTalk(index) {
  if (index === talkIndex.value) return // 不切换则直接返回
  talkIndex.value = index
  messageList.value = talkList.value[index].messageList
}

/**
 * 获取talk列表
 * @param {string} userId 用户id
 */
// todo: 从session中取
async function getData(userId) {
  const [res] = await Promise.all([getTalkList(userId)])
  console.log(res)
  talkList.value = res
  talkIndex.value = res.length - 1
  messageList.value = res[res.length - 1].messageList
}

/**
 * 创建一个新对话
 */
// todo: 从session中取
function creatTalk() {
  const index = talkList.value.length
  const res = creatNewTalk(userId.toString())

  if (res) {
    const talk = {
      index: index,
      title: '新对话',
      messageList: []
    }
    talkList.value.push(talk)
    changeTalk(index)
  }
}

/**
 * 退出登录函数
 */
function exitLogin() {
  router.push("/login")
}

</script>

<style scoped lang="scss">
.html {
  scroll-behavior: smooth;
}

.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow-y: hidden;

  .sidebar {
    min-width: 200px;
    width: 200px;
    background-color: #1A1A22;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }

    .new-talk-button {
      margin: 10px;
    }

    .talk-list {
      width: 100%;
      display: flex;
      flex-direction: column;

      .talk-item {
        width: 100%;
        margin: auto;
        padding: 10px 20px;

        .checked {
          color: #f5f5f5;
        }
      }

      .talk-item:hover {
        background-color: #3F3F46;
      }
    }
  }

  .container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #F3F6F9;

    .header {
      background-color: #F3F6F9;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 20px;

        .logo {
          width: 180px;
          object-fit: contain;
        }
      }

      .avatar {
        margin: 0 20px;
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .message-list {
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: column;

      .message {
        margin: 20px;
        padding: 10px;
        font-size: 16px;
        width: fit-content;
        max-width: 78%;
        white-space: pre-wrap;
      }

      .message.user {
        margin-left: auto;
        background-color: rgba(216, 216, 216, 0.5);
        border-radius: 15px 15px 0 15px;
      }

      .message.robot {
        margin-right: auto;
        background-color: #5a8cf1;
        color: #fff;
        border-radius: 15px 15px 15px 0;
      }
    }

    .loading {
      margin: 20px;
      padding: 10px;
      width: 100px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        width: 10px;
        height: 10px;
        background-color: #1A1A22;
        border-radius: 50%;
        animation: ball-beat 0.7s infinite linear;
      }

      div:nth-child(2n-1) {
        animation-delay: -0.5s;
      }

      @keyframes ball-beat {
        50% {
          opacity: 0.2;
          transform: scale(0.75);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    }

    .input-area {
      width: 80%;
      max-height: 150px;
      margin: 20px auto;
      position: relative;
      background-color: #FFFFFF;
      border-radius: 20px;
      display: flex;
      align-items: flex-end;

      .input {
        margin: 20px;
      }

      .send-button {
        margin: 20px 20px 20px 0;
      }
    }

    .tip {
      margin: 0 auto;
    }
  }
}

.block {
  width: 200px;
  height: 50px;
  background-color: green;
}

.block1 {
  width: 200px;
  height: 50px;
  background-color: orange;
}
</style>
