<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/">
              Home
            </nuxt-link>
            <!-- <a class="nav-link active" href="">Home</a> -->
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose" />&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a" />&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link ng-binding" :href="'#/@'+user.name">
                <img :src="user.image" class="user-pic">
                {{ user.username }}
              </a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link to="/signup">
                Sign up
              </nuxt-link>
              <nuxt-link to="/login">
                Sign in
              </nuxt-link>
              <!-- <a class="nav-link" href="">Sign up</a> -->
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState(['user'])
  }
}
</script>
