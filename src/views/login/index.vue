<template>
  <div class="login">
    <el-form :label-position="'top'"
      ref="form"
      :model="form"
      class="loginform"
      label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  class="loginbtn" type="primary" :loading="loading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import request from '@/utils/request'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      loading: false,
      form: {
        phone: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit () {
      // 1.表单验证
      // 2.提交表单
      // 3.处理请求结果 成功=>跳转 失败=>提示
      this.loading = true
      const { data } = await request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(this.form),
        url: '/front/user/login',
      })
      console.log(data)
      this.loading = false
      if (data.state !== 1) {
        return this.$message.error(data.message)
      }
      this.$router.push({ name: 'home' })
      this.$message.success(data.message)
    },
  },
})
</script>

<style lang="scss" scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginform{
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  .loginbtn{
    width: 100%;
  }
}
</style>
