<template>
  <div class="hello">
    <h1>subreddit {{ $route.params.subreddit }} here</h1>
    <li v-for="post in subredditPosts" :key="post">
      {{ post }}
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getSubreddit } from "../lib/reddit-http-client";
import { SubredditPost } from "../types";

interface Data {
  subredditPosts: SubredditPost[];
}

export default defineComponent({
  name: "subreddit-component",
  data() {
    const data: Data = {
      subredditPosts: [],
    };

    return data;
  },
  async mounted() {
    const subredditPosts = await getSubreddit(
      this.$route.params.subreddit as string
    );
    this.subredditPosts = subredditPosts.data;
  },
});
</script>
