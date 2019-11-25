<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item
        v-for="(post, key) in posts"
        :key="key"
        :to="'/posts/' + key + '/comments' "
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ post.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('store', ['posts'])
  },
  created () {

  }
}
</script>

<style>
</style>
