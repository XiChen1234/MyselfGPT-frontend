<template>
  <div class="main">
    <div class="sidebar">
      <div class="title">历史对话记录</div>
      <el-button class="new-talk-button" type="primary" @click="creatTalk">新建对话</el-button>
      <el-scrollbar class="talk-list">
        <el-text class="talk-item"
                 truncated
                 v-for="item in talkList.slice().reverse()" :key="item.index"
                 @click="changeTalk(item.index)">
          <span :class="{'checked' : item.index === indexTalk }">
            {{ item.title }}
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
        <div class="message"
             :class="{ 'user': item.author === 'user', 'robot': item.author === 'robot' }"
             v-for="item in talkList[indexTalk].messageList"
        >{{ item.text }}
        </div>
      </el-scrollbar>
      <div class="input-area">
        <el-input class="input"
                  type="textarea"
                  v-model="input"
                  :autosize="{minRows:1, maxRows:4}"
        ></el-input>
        <el-button class="send-button" type="primary" @click="sendMessage">发送</el-button>
      </div>
      <p class="tip">内容由讯飞星火大模型生成，仅供您参考</p>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import data from '@/views/data/data.js'

const talkList = reactive(data.talkList) // 存储对话列表
let indexTalk = ref(talkList.length - 1); // 响应式记录当前对话的index

const input = ref('')

/**
 * 发送信息
 */
const sendMessage = () => {
  const message = {
    author: "user",
    text: input.value
  }
  talkList[indexTalk.value].messageList.push(message)
  input.value = ''

  // todo: 向服务器发送信息，等待服务器返回结果
}

/**
 * 创建新对话
 */
const creatTalk = () => {
  const index = talkList.length
  const talk = {
    index: index,
    title: '新对话',
    messageList: []
  }
  talkList.push(talk)
  changeTalk(index)
  // todo: 与服务器进行交互
}

/**
 * 修改对话场景
 * @param index 当前对话index
 */
function changeTalk(index) {
  if (index === indexTalk.value) {
    return
  }

  indexTalk.value = index // 更新
}

// // 与服务器交互
// /**
//  * 发送信息到服务器，并且在界面上显示message
//  */
// const sendMessage = () => {
//   const message = {
//     author: "user",
//     text: input.value
//   }
//   talkList.value[indexTalk.value].messageList.push(message)
//   input.value = ''
// }
// /**
//  * 新建对话按钮激活函数
//  */
// const creatTalk = () => {
//   const index = talkList.value.length
//   const talk = {
//     index: index,
//     title: '新对话',
//     messageList: []
//   }
//   talkList.value.push(talk)
//   checkTalk(index)
//   // todo: 向服务器发送创建新对话的请求
// }
//
// // 纯前端
// function scrollbarDown() {
//
// }
//
// /**
//  * 切换talk列表中的talk项目
//  * @param index 项目索引
//  */
// function checkTalk(index) {
//   if (index === indexTalk) {
//     return
//   }
//   // todo: 切换talk
//   indexTalk.value = index;
// }
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
        background-color: #879EB3;
        color: #fff;
        border-radius: 15px 15px 15px 0;
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
