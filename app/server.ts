// Setup all dependencies for dependency injection here. Important to do here as we allow overriding for testing.
import "./di"

import express from "express"
import helmet from "helmet"
import http, { Server } from "http"
import { Logger } from "./logger"
import { DI } from "./di"
import path from "path"

const logger: Logger = DI.logger()

const app = express()
app.use(helmet())
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('hello', { title: 'Hey', message: 'Hello there!' })
})

const server: Server = http.createServer(app)

const port = 5000
server.listen(port)
logger.verbose(`============== RUNNING SERVER :${port} ==============`)
