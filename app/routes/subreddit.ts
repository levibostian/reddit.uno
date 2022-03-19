import express from "express"
import { DI } from "../di"
import { SubredditPost } from "../type/reddit/subreddit_post"

const router = express.Router()

router.get("/r/:subreddit", async (req, res, next) => {
  const subreddit = req.params.subreddit
  const subredditController = DI.subredditController()
  const getSubredditPostsResponse = await subredditController.getPosts(subreddit)
  if (getSubredditPostsResponse == undefined) return res.render("error")

  const subredditPosts: SubredditPost[] = getSubredditPostsResponse.data.children

  return res.render("subreddit", {
    title: subreddit,
    subreddit,
    subredditPosts: subredditPosts
  })
})

export default router
