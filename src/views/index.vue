<template>
  <div class="main">
    <div class="sidebar">
      <div class="title">历史对话记录</div>
      <el-button class="new-talk-button" type="primary" @click="creatTalk">新建对话</el-button>
      <el-scrollbar class="talk-list">
        <el-text class="talk-item"
                 truncated
                 v-for="(item, index) in talkList"
                 @click="changeTalk(index)">
                  <span :class="{'checked' : index === talkIndex }">
                   {{ index }} {{ item.title }}
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
        <img src="../assets/image/head.jpg" alt="head" class="avatar">
      </div>
      <el-scrollbar class="message-list">
        <div class="message robot">您好，我是Myself GPT智能助手，请问有什么能够帮您！\（^_^）/</div>
        <div v-for="item in talkList[talkIndex].messageList" v-if="talkList.length !== 0">
          <div class="message user" v-if="item.request">{{ item.request }}</div>
          <div class="message robot" v-if="item.response">{{ item.response }}</div>
          <div class="loading" v-if="!item.response">
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
        <el-button class="send-button" type="primary" @click="submit">发送</el-button>
      </div>
      <p class="tip">内容由讯飞星火大模型生成，仅供您参考</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {creatNewMessage, creatNewTalk, getTalkList} from "@/apis/API.js";

const input = ref('')

const talkList = ref([])
const talkIndex = ref()

// 生命周期函数
onMounted(() => getData())


// websocket相关内容
// todo: 这里应该从session中去取的，这里先用假数据
const ws = new WebSocket('ws://localhost:8089/api/websocket/1') // websocket对象

/**
 * 收到消息触发的函数
 * @param e websocket事件
 */
ws.onmessage = (e) => {
  console.log(e.data)
  let index = talkList.value[talkIndex.value].messageList.length - 1

  talkList.value[talkIndex.value].messageList[index].response = e.data
}

/**
 * 向服务器(websocket和http服务器）发送消息的方法
 * @param {Object} message 消息对象
 */
const sendMessage = (message) => {
  // websocket服务器
  ws.send(JSON.stringify(message))

  // 正常服务器
  const result = creatNewMessage(message.messageList, message.request, message.index)

}


/**
 * 获取talk列表
 * @returns {Promise<void>}
 */
const getData = async () => {
  // todo: 应该从session中去取的，这里先用假数据
  const [res] = await Promise.all([getTalkList('1')])
  talkList.value = res
  talkIndex.value = res.length - 1
}

/**
 * 发送信息
 */
const submit = () => {
  if (input.value === '') return
  const message = {
    index: talkList.value[talkIndex.value].messageList.length,
    messageList: talkIndex.value.toString(),
    request: input.value.toString(),
    response: '',
  }
  talkList.value[talkIndex.value].messageList.push(message)
  // todo: 发送服务器
  sendMessage(message)
  input.value = ""
}

/**
 * 创建新对话
 */
const creatTalk = () => {
  const result = creatNewTalk('1')
  // 创建成功
  if (result) {
    const index = talkList.value.length
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
 * 修改对话场景
 * @param index 当前对话index
 */
function changeTalk(index) {
  if (index === talkIndex.value) {
    return
  }

  talkIndex.value = index // 更新index
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
