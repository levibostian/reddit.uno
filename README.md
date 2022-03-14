# reddit.uno
 
# Current status of work

I have been trying to build this app as a client-side only app. This is to prevent having to involve a server for any of the work at all. I have tried to do this by...

* You enter a URL in your web browser identical to what you would see for reddit. `https://www.reddit.uno/r/pcmasterace`, for example. The client side browser app would look at the URL and make a request to Reddit's API on your behalf. 
* The client side app would call the API to get JSON for the given endpoint that you want. Then, it would parse the JSON and render a very simple webpage with that data. 

Here is where we hit some problems. 
1. When sending a HTTP request to `https://www.reddit.com/N.json` or `https://api.reddit.com/N`, Firefox would block the request if the browser has the strict content blocking feature enabled. This means that Firefox users on desktop or mobile would need to disable any content blocking for this website to be able to perform the API request. 
2. CORS issues. When I was able to resolve the Firefox content blocking, I was facing CORS issues. If you view `./src/lib/reddit-http-client.ts` and `./src/lib/http-client.ts` at it's current state, this is able to successfully perform client side HTTP requests. However, the web server is what decides what CORS is enabled. The reddit API does not return back a `Access-Control-Allow-Origin` value. If it did, I would be able to make these requests. My guess (and from searching CORS in /r/redditdev) is that reddit changed their API at one point to only return `Access-Control-Allow-Origin` when you send an authenticated HTTP request. Or, a request not from a browser. If I use a desktop HTTP client (or curl) on my machine, the request works just fine and I get a JSON response. It's only when it's from a browser that's the issue. When I disable CORS in the `fetch()` request, I do not get a response JSON body. This is a known behavior I guess from the `fetch()` API. 

I am not surprised by these issues because I was attempting to use the reddit API without authentication even though the API docs state that all API requests must be authenticated with OAuth2. I wanted to use it without authenticated to see if it was possible to not involve a web server at all. Now that I see this is not possible, I must involve a web server. That's where I will begin from here. 