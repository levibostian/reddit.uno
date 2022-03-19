// The "data" object when "kind" = "more"
export interface RedditApiMore {
  count: number 
  name: string 
  id: string 
  parent_id: string 
  depth: 1
  children: string[] // array of IDs. 
}