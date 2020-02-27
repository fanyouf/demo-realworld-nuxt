<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">
            conduit
          </h1>

          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a class="nav-link disabled" href>Your Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href>Global Feed</a>
                </li>
              </ul>
            </div>

            <div
              v-for="article in articles"
              :key="article.slug"
              class="article-preview"
            >
              <div class="article-meta">
                <a href="profile.html">
                  <img :src="article.author.image">
                </a>
                <div class="info">
                  <a href class="author">{{ article.author.username }}</a>
                  <span class="date">{{ article.createAt }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart" />{{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link class="preview-link" :to="'/article/'+article.slug">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
              <!-- <a href class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </a> -->
            </div>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <a href class="tag-pill tag-default">programming</a>
                <a href class="tag-pill tag-default">javascript</a>
                <a href class="tag-pill tag-default">emberjs</a>
                <a href class="tag-pill tag-default">angularjs</a>
                <a href class="tag-pill tag-default">react</a>
                <a href class="tag-pill tag-default">mean</a>
                <a href class="tag-pill tag-default">node</a>
                <a href class="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',

  async asyncData (ctx) {
    console.dir(ctx)
    try {
      const { data } = await getArticles()

      return {
        articles: data.articles
      }
    } catch (err) {
      ctx.$errorHandler(err)
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="" scoped>
</style>
