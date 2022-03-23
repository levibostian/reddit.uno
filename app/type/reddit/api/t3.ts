export interface RedditApiT3 {
  title: string

  ups: number
  downs: number
  author: string
  num_comments: number
  created_uts: number
  stickied: boolean
  permalink: string 

  // embedded HTML 
  media_embed?: {
    content: string
  }
  
  // Gallery of images post type 
  is_gallery: boolean
  media_metadata?: { // used for image gallery posts
    [key: string]: {
      p: { // array of photos of different resolutions
        y: number
        x: number 
        u: string
      }[]

      s: { // source image 
        y: number 
        x: number 
        u: string 
      }
    } 
  } 

  // post types that are just 1 image 
  preview?:{
    images: {
      source: {
        url: string
        width: number 
        height: number 
      }
      resolutions: {
        url: string 
        width: number 
        height: number 
      }[]
    }[]
  }

  // post types that are a video 
  secure_media?: {
    reddit_video: {
      fallback_url: string
      height: number
      width: number
      scrubber_media_url: string
      dash_url: string
      duration: number
      hls_url: string
      is_gif: boolean
      transcoding_status: string
    }
  } 
}
