import { RedditHttp } from "../service"
import { isError, Result } from "../type/http_response"
import { Logger } from "../logger"
import { writeFileSync } from "fs"
import { PhotoSwipeImage } from "../type/photoswipe"
import { Subreddit, SubredditApiResponse, SubredditPost } from "../type/reddit/subreddit"
import { CommentsApiResponse, responseToParsedObject, SubredditPostComments } from "../type/reddit/comments"

export interface SubredditController {
  getPosts(subreddit: string): Promise<Subreddit | undefined>
  getPostComments(subreddit: string, postId: string): Promise<SubredditPostComments | undefined>
}

export class SubredditControllerImpl implements SubredditController {
  constructor(private http: RedditHttp, private logger: Logger) {}

  async getPosts(subreddit: string): Promise<Subreddit | undefined> {
    let response: Result<SubredditApiResponse> = await this.http.get(`/r/${subreddit}`)
    if (isError(response)) return undefined

    response = this.fixLinks(response)

    // for debugging, only 
    // writeFileSync("/tmp/posts.json", JSON.stringify(response, null, 2))

    response.data.children.forEach((post) => {
      post = this.processPost(post)
    })

    return response.data.children
  }

  async getPostComments(subreddit: string, postId: string): Promise<SubredditPostComments | undefined> {
    let response: Result<CommentsApiResponse> = await this.http.get(`/r/${subreddit}/comments/${postId}`)
    if (isError(response)) return undefined

    response = this.fixLinks(response)
    const postAndComments: SubredditPostComments = responseToParsedObject(response)

    postAndComments.post = this.processPost(postAndComments.post)

    // for debugging, only 
    writeFileSync("/tmp/comments.json", JSON.stringify(postAndComments, null, 2))

    return postAndComments
  }

  private fixLinks<T>(obj: T): T {
    // Fix URLs of images: https://old.reddit.com/r/redditdev/comments/9ncg2r/changes_in_api_pictures/
    return JSON.parse(JSON.stringify(obj).replaceAll("amp;", "")) as T
  }

  private processPost(post: SubredditPost): SubredditPost {    
      // create easy to use array for pug template 
      const rawGalleryPhotos = post.data.media_metadata
      if (rawGalleryPhotos) {
        const galleryImages: PhotoSwipeImage[] = [] // we are using a library for a gallery. 

        Object.values(rawGalleryPhotos).forEach((value) => {
          const photoToUse = this.getBestPhoto(value.p.map(p => { return { url: p.u, width: p.x, height: p.y }}))
          galleryImages.push({
            src: photoToUse.url,
            w: photoToUse.width,
            h: photoToUse.height
          })
        })

        post.gallery_images = galleryImages
      }

      const image = post.data.preview
      if (image) {
        post.image = this.getBestPhoto(image.images[0].resolutions)
      }

      return post 
  }

  private getBestPhoto(photos: { url: string; width: number; height: number }[]): { url: string; width: number; height: number } {
    // get smallest size photo that's over 500 px wide 
    const sortedPhotos = photos.filter(p => p.width > 500).sort((a, b) => a.width - b.width)
    if (sortedPhotos.length > 0) return sortedPhotos[0]

    // if no photo over 500px wide, use the biggest photo
    return photos.sort((a, b) => b.width - a.width)[0]
  }
}
