<template>
  <div class="main">
    <div class="sidebar">侧边栏</div>
    <div class="container">
      <div class="header">
        <div class="title">
          <img src="../assets/image/logo.svg" alt="logo" class="logo">
          <span class="subtitle">你的智慧生活，一键触达</span>
        </div>
        <img src="../assets/image/head.jpg" alt="head" class="avatar">
      </div>
      <el-scrollbar class="message-list">
        <div class="message user">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</div>
        <div class="message robot">你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好</div>
      </el-scrollbar>
      <div class="input-area">
        <el-input class="input"
                  type="textarea"
                  v-model="input"
                  :autosize="{minRows:1, maxRows:4}"
        ></el-input>
        <el-button class="button" type="primary">发送</el-button>
      </div>
      <p class="tip">内容由讯飞星火大模型生成，仅供您参考</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const input = ref('')
</script>

<style scoped lang="scss">
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
      .button {
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
