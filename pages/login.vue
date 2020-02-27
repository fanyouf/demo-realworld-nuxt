<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <nuxt-link to="/signup">
              need an account?
            </nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// console.log('..............login')
// 只有在客户端才会去加载js-cookie
// process.client 是nuxt.js提供的api，表示是否是客户端
// process.server 是nuxt.js提供的api，表示是否是服务器端
// const Cookie = process.client ? require('js-cookie') : undefined
const Cookie = require('js-cookie')
export default {
  middleware: 'noAuthenticated',
  name: '',
  data () {
    return {
      user: {
        username: '',
        email: 'fdstsfnipui@qq.com',
        password: '123fsdf5hdgsfsa'
      }
    }
  },
  methods: {
    async submit () {
      try {
        this.$toast.show('Logging in...')

        const { data } = await this.$axios({
          url: 'https://conduit.productionready.io/api/users/login',
          method: 'POST',
          data: { user: this.user }
        })

        Cookie.set('user', data.user)

        this.$toast.success('Successfully authenticated')
        this.$store.commit('setUser', data.user)

        const jumpTo = this.$router.currentRoute.query.backUrl || '/'

        this.$router.push(jumpTo)
      } catch (err) {
        console.log(err)
        window.alert('注册失败')
      }
    }
  }
}
</script>
