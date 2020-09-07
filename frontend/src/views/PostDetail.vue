<template>
    <div class="post-details">
        <h2>{{ title }}</h2>
        <img
            class="menu-item__image"
            :src="image.source"
            :alt="image.alt"
        />
        <p>{{ content }}</p>
    </div>
    
</template>

<script>


export default {
    name: 'PostDetail',
    components: {

    },
    data() {
        return {
            id:1,
            title: 'Titre du post 1',
            content: 'Contenu du post 1',
            image: {
                source: 'images/logo.png',
                alt: 'Logo'
                }
        }
    }
}
</script>
<style lang="scss">
    a {
        text-decoration:none;
    }
</style>