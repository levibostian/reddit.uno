<template>
  <div class="hello">
    <h1>subreddit {{ $route.params.subreddit }} here</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "subreddit-component",
});
</script>
