<template>
  <div class="login">
    <el-form :label-position="'top'"
      ref="form"
      :model="form"
      class="loginform"
      label-width="80px"
      :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  class="loginbtn" type="primary" :loading="loading" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
    name: 'Login',
    data () {
        return {
            loading: false,
            form: {
                phone: '',
                password: '',
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 6, max: 18, message: '长度在6-18位', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        async onSubmit (formName: string) {
            try {
                this.loading = true
                await (this.$refs[formName] as Form).validate()
                const { data } = await login(this.form)
                console.log(data)
                this.loading = false
                if (data.state !== 1) {
                    return this.$message.error(data.message)
                }
                this.$store.commit('setUser', data.content)
                this.$router.push(this.$route.query.redirect as string || '/')
                this.$message.success(data.message)
            } catch (error) {
                console.error('登录失败', error)
            }
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
