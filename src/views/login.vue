<template>
  <div class="container">
    <div class="chat_image"></div>
    <div class="panel">
      <el-form class="form">
        <h1 class="title">MySelfGPT - 登录</h1>
        <h3 class="title">你的智慧生活，一键触达</h3>
        <el-form-item prop="username">
          <el-input
              size="large"
              placeholder="请输入账号">
            <template #prefix>
              <span class="iconfont icon-username"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              size="large"
              placeholder="请输入密码">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button"><span>登录</span></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.container {
  background-image: url("../assets/image/login_bg.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;

  .chat_image {
    flex: 1;
    background-size: 400px;
    background-image: url("../assets/image/chat_img.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  .panel {
    flex: 0.75;
    width: 430px;
    margin-right: 10%;
    align-content: center;

    .form {
      padding: 25px;
      background-color: #fafafa;
      border-radius: 10px;

      .title {
        text-align: center;
      }

      .button {
        margin: auto;
        width: 80%;
      }
    }
  }
}
</style>
