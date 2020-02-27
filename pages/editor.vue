<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagListTxt"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                >
                <div class="tag-list" />
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="hAdd"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addArticle } from '@/api/article'
export default {
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: '测试标题',
        description: 'markdown的 格式，你能解析的了吗？',
        body: '##  没有问题的，你来看我的表现',
        tagListTxt: 'reactjs angularjs dragons'
      }
    }
  },
  methods: {
    async hAdd () {
      this.$nuxt.$loading.start()
      try {
        const { title, description, body, tagListTxt } = this.article
        const tagList = tagListTxt.split(' ')

        const { data } = await addArticle({
          article: {
            title,
            description,
            body,
            tagList
          }
        })

        this.$router.push('/article/' + data.article.slug)
      } catch (err) {
        console.log(err)
        alert('error')
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
