import { Logger } from "../logger"
import http from "tiny-json-http"

import * as HttpResponse from "../type/http_response"
import { KeyObject } from "../type"

export class Http {
  constructor(
    public baseUrl: string,
    private logger: Logger,
    public headers?: { [key: string]: string }
  ) {}

  async get<T>(
    path: string,
    options?: { headers?: { [key: string]: string }; queryParams: { [key: string]: string } }
  ): Promise<HttpResponse.Type<T>> {
    const stacktraceError = new Error("")

    try {
      const successfulResponse = await http.get({
        url: `${this.baseUrl}${path}`,
        headers: this.combineHeaders(options?.headers),
        data: options?.queryParams || {}
      })

      return successfulResponse.body
    } catch (error) {
      return this.processErrorResponse(stacktraceError, error, path, undefined, options)
    }
  }

  async post<T>(
    path: string,
    body: KeyObject,
    options?: { headers?: { [key: string]: string } }
  ): Promise<HttpResponse.Type<T>> {
    const stacktraceError = new Error("")

    try {
      const successfulResponse = await http.post({
        url: `${this.baseUrl}${path}`,
        headers: this.combineHeaders(options?.headers),
        data: body
      })

      return successfulResponse.body
    } catch (error) {
      return this.processErrorResponse(stacktraceError, error, path, body, options)
    }
  }

  private combineHeaders(headers?: { [key: string]: string }): { [key: string]: string } {
    const combined: { [key: string]: string } = {}

    if (headers) {
      for (const key in headers) {
        combined[key] = headers[key]
      }
    }
    if (this.headers) {
      for (const key in headers) {
        combined[key] = headers[key]
      }
    }

    return combined
  }

  // We are using `any` for `error` because that's the type that axios gives us. The code below was suggested in the docs for Axios.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private processErrorResponse(
    stacktraceError: Error,
    error: any,
    path: string,
    body?: Object,
    options?: { headers?: { [key: string]: string } }
  ): HttpResponse.HttpError {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const code: number = error.response.status
      const errorBody: unknown = error.response.data
      // const headers = error.response.headers
      return new HttpResponse.HttpResponseError(code, errorBody)
    } else if (error.request) {
      // Request was made, but no response received
      return new HttpResponse.HttpNoResponseError()
    } else {
      this.logger.error(
        stacktraceError,
        `HTTPSetupError`,
        `Something happened in setting up the request that triggered an Error`,
        {
          path,
          body,
          options,
          error
        }
      )

      return new HttpResponse.HttpNoResponseError()
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export class RedditHttp extends Http {
  constructor(logger: Logger) {
    super("https://api.reddit.com", logger, {})
  }
}
