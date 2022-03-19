// Setup all dependencies for dependency injection here. Important to do here as we allow overriding for testing.
import "./di"

import express from "express"
import helmet from "helmet"
import http, { Server } from "http"
import { Logger } from "./logger"
import { DI } from "./di"
import path from "path"
import routes from "./routes"

const logger: Logger = DI.logger()

const app = express()
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      /* eslint-disable @typescript-eslint/naming-convention */
      "img-src": ["https://*", "'self'"],
      "default-src": ["'self'", "https://*"],
      // blob: is used by video-js
      "script-src": [
        "https://unpkg.com",
        "'self'",
        "https://cdnjs.cloudflare.com",
        "'unsafe-inline'",
        "blob:",
        "https://cdn.statically.io"
      ]
      /* eslint-enable @typescript-eslint/naming-convention */
    }
  })
)
app.set("views", path.join(__dirname, "views", "pages"))
app.set("view engine", "pug")
app.use(routes)

const server: Server = http.createServer(app)

const port = 5000
server.listen(port)
logger.verbose(`============== RUNNING SERVER :${port} ==============`)
