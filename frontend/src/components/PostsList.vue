<script>
export default {
    name: 'PostsList',
    props: ['title', 'content', 'image', 'id']
}
</script>

<template>
    <div class="post-item">
        <img
            class="menu-item__image"
            :src="image.source"
            :alt="image.alt"
        />
        <div>
            <h3><router-link :to="'/posts/' + id">{{ title }}</router-link></h3>
            <p>{{ content }}
                <br><router-link :to="'/posts/' + id">Lire la suite ...</router-link>
            </p>
        </div>

    </div>
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }
</style>