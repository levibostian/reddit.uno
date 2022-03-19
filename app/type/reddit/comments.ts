import { RedditApiListing } from "./api/listing";
import { RedditApiT1 } from "./api/t1";
import { SubredditPost } from "./subreddit";

// It's an array with 2 items. 
// index 0: 1, t3 item with the original post content
// index 1: 
export type CommentsApiResponse = (Post | Comments)[]

export const responseToParsedObject = (response: CommentsApiResponse): SubredditPostComments => {
  return {
    post: (response[0] as Post).data.children[0],
    comments: (response[1] as Comments).data.children
  }
}

// index 0. it's children is only 1 entry long. 
interface Post {
  data: RedditApiListing<SubredditPost[]>
} 

// index 1
interface Comments {
  data: RedditApiListing<SubredditPostComment[]>
}

type SubredditPostComment = RedditApiT1

// An easier to use form of the API response. Controller makes this format. 
export interface SubredditPostComments {
  post: SubredditPost
  comments: SubredditPostComment[]
}