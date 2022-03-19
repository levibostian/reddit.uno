import { PhotoSwipeImage } from "../photoswipe";
import { RedditApiListing } from "./api/listing";
import { RedditApiT3 } from "./api/t3";


export interface SubredditApiResponse {
  //kind: Listing
  data: RedditApiListing<Subreddit>
}

// A subreddit is just a collection of posts 
export type Subreddit = SubredditPost[]

export interface SubredditPost {
  //kind: t3
  data: RedditApiT3

  // these are extra value added to object after API response gotten back. This makes it easier for this application
  // to use. 
  gallery_images?: PhotoSwipeImage[] // application picks a resolution for each image and changes to data type gallery library requires. 
  image?: { // application picks an image from all available resolutions and picks 1. This is that image. 
    url: string
    width: number 
    height: number 
  }  
}