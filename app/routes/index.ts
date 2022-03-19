import express from "express"
import subredditRouter from "./subreddit"
import path from "path"

const router = express.Router()

router.get("/", (req, res, next) => {
  return res.render("hello", { title: "Hey", message: "Hello there!" })
})

let version: string | undefined
router.get("/version", async (req, res, next) => {
  if (!version) {
    const filePath: {
      version: string
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require(path.join(__dirname, "../package.json"))

    version = filePath.version
  }

  return res.send({
    version: version
  })
})

router.use(subredditRouter)

export default router
