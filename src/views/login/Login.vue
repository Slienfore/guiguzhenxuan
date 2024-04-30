<script setup lang="ts">
import {Lock, User} from '@element-plus/icons-vue'
import {reactive, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import useUserStore from '@/store/modules/user'
import {ElNotification} from 'element-plus'
import {getTime} from "@/utils/time"

const useStore = useUserStore()// 用户 Store
const router = useRouter()// 路由器
const route = useRoute()// 路由
const form = ref()// form 组件

const loading = ref(false)
const loginForm = reactive({username: 'admin', password: '111111'})

const login = async () => {
  loading.value = true
  try {
    await useStore.userLogin(loginForm)

    // 判断是否还包含 历史重定向路径
    const redirect: any = route.query.redirect
    router.push({path: redirect || '/'})

    ElNotification({type: 'success', message: '欢迎回来', title: `Hi~, ${getTime()}好`})
  } catch (e) {
    ElNotification({type: 'error', message: e.message})
  } finally {
    loading.value = false
  }
}

const checkName = (rule: any, val: any, callback) => {
  val.length >= 5 ? callback() : callback(new Error('账号长度至少为五位'))
}

// 表单校验规则
const rules = {
  username: [{validator: checkName, trigger: 'change'}],
  password: [{required: true, min: 6, max: 15, message: '密码长度至少为六位', trigger: 'change'}]
}
</script>

<template>
  <div class="container">
    <el-row>
      <!--占位组件(左右对半), xs 栅格系统, 当屏幕 < 768px 时候, 占比为 0-->
      <ElCol :span="12" :xs="0"/>

      <ElCol :span="12" :xs="24">
        <el-form :model="loginForm" :rules="rules" ref="form"
                 class="login-form">
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" :disabled="loading" @click="login" size="large" round type="primary">登录
            </el-button>
          </el-form-item>
        </el-form>
      </ElCol>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 65%;
    top: 50%;
    left: 50%;
    transform: translate(-55%, 25%);
    padding: 30px;
    border-radius: 12px;
    background: url('../../assets/images/login_form.png');
    background-size: cover;

    h1 {
      color: #fff;
      font-size: 40px;
      font-family: 'JetBrains Mono';
    }

    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }
  }
}
</style>