<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/comments')"
          q-btn
          to="/posts"
          class="glossy"
          size="sm"
          round
          color="secondary"
          icon="arrow_back"
        />

        <q-toolbar-title class="absolute-center">emOcean</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      showAddComment: false
    }
  }
}
</script>
