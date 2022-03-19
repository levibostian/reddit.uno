import { RedditApiListing } from "./listing";
import { RedditApiMore } from "./more";

export interface RedditApiT1 {
  body: string // might be markdown/encoded. Example: "[CLICK HERE TO ENTER!](http://sdqk.me/p/70Nr38mW/msi-x-pcmr-x-g-skill-white-pc-build-giveaway-qRSEyGet) (Winners' names will also be announced in this link after drawing).\n\n**Giveaway time**\n\nTime to win a Valentine-themed White PC build! We've joined forces with MSI and G.SKILL to make it happen!\u2060\n\n\u2060"
  body_html: string // ready to display html version of body 

  replies: RedditApiListing<RedditApiMore | RedditApiT1>

  author: string
  collapsed: boolean
  stickied: boolean
  permalink: string 
  ups: number 
  downs: number 
  depth: number
}