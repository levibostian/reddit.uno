import { PhotoSwipeImage } from "./photoswipe"

export interface SubredditPost {
  data: SubredditPostData
}

export interface SubredditPostData {
  ups: number
  downs: number
  title: string
  is_gallery: boolean
  media_metadata?: SubredditPostMediaMetadata // used for image gallery posts
  preview?: SubredditPostPreview // used for image posts
  secure_media?: SubredditSecureMedia // used for video posts
  author: string
  num_comments: number
  created_uts: number
  stickied: boolean
  permalink: string 

  // added after downloading from reddit for simplified pug displaying
  gallery_images?: PhotoSwipeImage[] // easier to access array of images with pre-chosen size of image to use
  image?: SubredditPostImage  // easier to access image with pre-chosen size of image to use
}

export interface SubredditPostMediaMetadata {
  [key: string]: SubredditPostMediaMetadataItem
}
export interface SubredditPostMediaMetadataItem {
  p: SubredditPostMediaMetadataPhoto[]
}

export interface SubredditPostMediaMetadataPhoto {
  u: string
  x: number
  y: number
}

export interface SubredditSecureMedia {
  reddit_video: SubredditRedditVideo
}

export interface SubredditRedditVideo {
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

export interface SubredditPostPreview {
  images: SubredditPostImages[]
}

export interface SubredditPostImages {
  source: SubredditPostImage
  resolutions: SubredditPostImage[]
}

export interface SubredditPostImage {
  url: string
  width: number
  height: number
}
