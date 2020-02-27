<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>  {{ article.title }} </h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image"></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <template v-if="isAuthor">
            <button class="btn btn-outline-secondary btn-sm">
              <i class="ion-edit" /> Edit Article
            </button>

            <button class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a" /> Delete Article
            </button>
          </template>
          <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round" />
              &nbsp;
              Follow Eric Simons <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart" />
              &nbsp;
              Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr>

      <div class="article-actions">
        <div class="article-meta">
          <a href=""><img :src="article.author.image"></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round" />
            &nbsp;
            Follow Eric Simons <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            &nbsp;
            Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <!-- 添加评论 -->
      <div v-if="user" class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" />
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit" />
                <i class="ion-trash-a" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有登陆，显示登陆链接 -->
      <div v-else class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <p style="display: inherit;">
            <a @click="hLogin">Sign in</a> or <a ui-sref="app.register" href="#/register">sign up</a> to add comments on this article.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticle } from '@/api/article'
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

export default {
  name: 'ArticleSlug',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    console.dir(data)
    data.article.body = md.render(data.article.body)
    return {
      article: data.article
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['user']),
    isAuthor () {
      if (!this.user) {
        return false
      }
      return this.article.author.username === this.user.username
    }
  },
  methods: {
    hLogin () {
      const curUrl = this.$router.currentRoute.path
      this.$router.push({
        path: '/login',
        query: {
          backUrl: curUrl
        }
      })
    }
  }
}
</script>
