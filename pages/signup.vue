<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <nuxt-link to="/login">
              Have an account?
            </nuxt-link>
          </p>

          <!-- <ul class="error-messages">
            <li>That email is already taken</li>
          </ul> -->
          <ul class="error-messages">
            <li v-for="(item, key) in errors" :key="key">
              {{ key }} {{ item[0] }}
            </li>
          </ul>

          <form @submit.prevent>
            <fieldset class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/user'
// 只有在客户端才会去加载js-cookie
// process.client 是nuxt.js提供的api，表示是否是客户端
// process.server 是nuxt.js提供的api，表示是否是服务器端
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'noAuthenticated',
  name: 'Signup',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async submit () {
      try {
        const { data } = await register({
          user: this.user
        })

        Cookie.set('user', data.user)

        this.$store.commit('setUser', data.user)
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        if (err.response.status === 422) {
          this.errors = err.response.data.errors
        } else {
          throw err
        }
        // window.alert('注册失败')
      }
    }
  }
}
</script>
