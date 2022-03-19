import { Subreddit } from "../type/reddit"
import { RedditHttp } from "../service"
import { isError, Result } from "../type/http_response"
import { Logger } from "../logger"
import { writeFileSync } from "fs"
import { PhotoSwipeImage } from "../type/reddit/photoswipe"
import { SubredditPostImage, SubredditPostMediaMetadataPhoto } from "../type/reddit/subreddit_post"

export interface SubredditController {
  getPosts(subreddit: string): Promise<Subreddit | undefined>
}

export class SubredditControllerImpl implements SubredditController {
  constructor(private http: RedditHttp, private logger: Logger) {}

  async getPosts(subreddit: string): Promise<Subreddit | undefined> {
    let response: Result<Subreddit> = await this.http.get(`/r/${subreddit}`)
    if (isError(response)) return undefined

    // Fix URLs of images: https://old.reddit.com/r/redditdev/comments/9ncg2r/changes_in_api_pictures/
    response = JSON.parse(JSON.stringify(response).replaceAll("amp;", "")) as Subreddit
    writeFileSync("/tmp/posts.json", JSON.stringify(response, null, 2))

    response.data.children.forEach((post) => {
      // create easy to use array for pug template 
      const rawGalleryPhotos = post.data.media_metadata
      if (rawGalleryPhotos) {
        const galleryImages: PhotoSwipeImage[] = [] // we are using a library for a gallery. 

        Object.values(rawGalleryPhotos).forEach((value) => {
          const photoToUse = this.getBestGalleryPhoto(value.p)
          galleryImages.push({
            src: photoToUse.u,
            w: photoToUse.x,
            h: photoToUse.y
          })
        })

        post.data.gallery_images = galleryImages
      }

      const image = post.data.preview
      if (image) {
        post.data.image = this.getBestPhoto(image.images[0].resolutions)
      }
    })

    return response
  }

  private getBestPhoto(photos: SubredditPostImage[]): SubredditPostImage {
    // get smallest size photo that's over 500 px wide 
    const sortedPhotos = photos.filter(p => p.width > 500).sort((a, b) => a.width - b.width)
    if (sortedPhotos.length > 0) return sortedPhotos[0]

    // if no photo over 500px wide, use the biggest photo
    return photos.sort((a, b) => b.width - a.width)[0]
  }

  private getBestGalleryPhoto(photos: SubredditPostMediaMetadataPhoto[]): SubredditPostMediaMetadataPhoto {
    // get smallest size photo that's over 500 px wide 
    const sortedPhotos = photos.filter(p => p.x > 500).sort((a, b) => a.x - b.x)
    if (sortedPhotos.length > 0) return sortedPhotos[0]

    // if no photo over 500px wide, use the biggest photo
    return photos.sort((a, b) => b.x - a.x)[0]
  }
}
