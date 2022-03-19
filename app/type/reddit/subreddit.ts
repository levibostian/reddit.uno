import { SubredditPost } from "./subreddit_post"

export interface Subreddit {
  data: SubredditData
}

export interface SubredditData {
  children: SubredditPost[]
}
