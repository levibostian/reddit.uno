// Reddit API where kind = Listing
export interface RedditApiListing<ChildrenType> {
  after?: string // used for paging. add "after" query param to get next page of content 
  before?: string // used for paging like after. 
  children: ChildrenType
}