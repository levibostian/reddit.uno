import { Subreddit } from "../types";
import * as httpClient from "./http-client";

const redditApiHost = "https://www.reddit.com";

export const getSubreddit = async (
  subredditName: string
): Promise<Subreddit> => {
  return httpClient.get(redditApiHost, `/r/${subredditName}.json`);
};
