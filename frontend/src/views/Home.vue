<template>
  <div class="home">
    <section class="postlist">
      <h2>Posts récents</h2>
      <PostsList 
      v-for="item in listePosts"
      :id="item.id"
      :title="item.title"
      :content="item.content"
      :image="item.image"
      :key="item.title"
      />
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'Home',
  components: {
    PostsList
  },
  data() {
    return {
      listePosts : [
        {
          id:1,
          title: 'Titre du post 1',
          content: 'Contenu du post 1',
          image: {
            source: 'images/logo.png',
            alt: 'Logo'
            }
        },
        {
          id:2,
          title: 'Titre du post 2',
          content: 'Contenu du post 2',
          image: {
            source: 'images/logo.png',
            alt: 'Logo'
            }
        },
        {
          id:3,
          title: 'Titre du post 3',
          content: 'Contenu du post 3',
          image: {
            source: 'images/logo.png',
            alt: 'Logo'
            }
        }
        
      ]
    }
    }
}
</script>
