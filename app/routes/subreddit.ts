import express from "express"
import { DI } from "../di"
import { subredditCategories, SubredditCategory } from "../type/reddit/subreddit"

const router = express.Router()

router.get("/r/:subreddit", async (req, res, next) => {
  const subreddit = req.params.subreddit
  const subredditController = DI.subredditController()
  const subredditPosts = await subredditController.getPosts(subreddit)
  if (subredditPosts == undefined) return res.render("error")

  return res.render("subreddit", {
    title: subreddit,
    subreddit,
    subredditPosts: subredditPosts
  })
})

router.get("/r/:subreddit/:category", async (req, res, next) => {
  const category = req.params.category as SubredditCategory
  const subreddit = req.params.subreddit
  if (!subredditCategories.includes(category)) {
    return res.redirect(`/r/${subreddit}`)
  }

  const subredditController = DI.subredditController()
  const subredditPosts = await subredditController.getPosts(subreddit, category)
  if (subredditPosts == undefined) return res.render("error")

  return res.render("subreddit", {
    title: subreddit,
    subreddit,
    subredditPosts: subredditPosts
  })
})

// Example: https://reddit.com/r/pcmasterrace/comments/t5y932/msi_x_pcmr_worldwide_giveaway_win_a/
router.get("/r/:subreddit/comments/:postId/:postName", async (req, res, next) => {
  const subreddit = req.params.subreddit
  const postId = req.params.postId
  
  return res.redirect(`/r/${subreddit}/comments/${postId}`)
})

// example: https://reddit.com/r/pcmasterrace/comments/t5y932/
router.get("/r/:subreddit/comments/:postId/", async (req, res, next) => {
  const subreddit = req.params.subreddit
  const postId = req.params.postId 
  const subredditController = DI.subredditController()
  const comments = await subredditController.getPostComments(subreddit, postId)
  if (comments == undefined) return res.render("error")

  return res.render("comments", {
    title: comments.post.data.title,
    post: comments.post,
    comments: comments.comments
  })
})

export default router
