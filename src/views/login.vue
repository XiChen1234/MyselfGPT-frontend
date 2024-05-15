<template>
  <div class="container">
    <div class="chat_image"></div>
    <div class="panel">
      <el-form
          class="form"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          @submit.prevent>
        <h1 class="title">MySelfGPT - 登录</h1>
        <h3 class="title">你的智慧生活，一键触达</h3>
        <el-form-item prop="username">
          <el-input
              size="large"
              placeholder="请输入账号"
              v-model="formData.username">
            <template #prefix>
              <span class="iconfont icon-username"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              size="large"
              type="password"
              placeholder="请输入密码"
              v-model="formData.password">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              class="button"
              type="primary"
              @click="loginSubmit"><span>登录</span></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import Message from "@/util/Message.js";
import Request from "@/util/Request.js";

const router = useRouter();
const route = useRoute();

// api接口集合
const api = {
  login: "/login"
}

const formData = reactive({
  username: '',
  password: ''
})
const formDataRef = ref()

// 校验规则
const rules = ref({
  username: [
    {required: true, message: "账号不能为空", trigger: 'blur'},
    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: "密码不能为空", trigger: 'blur'},
    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
  ]
})

/**
 * 登录
 */
const loginSubmit = async () => {
  await formDataRef.value?.validate().catch(err => {
    throw err
  })

  // 发送服务器登录请求
  let result = Request({
      url: api.login,
      method: 'POST',
      data: formData,
      showLoading: true
    })
  if (!result) {
    return
  }

  // 登录成功处理逻辑
  Message.success("登录成功")
  await router.push("/index") // todo: 假登录功能。
}
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
