import { KeyObject } from "./type/object"

export interface Logger {
  debug(message: string, extras?: KeyObject): void
  verbose(message: string, extras?: KeyObject): void
  error(stacktraceError: Error, title: string, message: string, extras?: KeyObject): void
}

export class ConsoleLogger implements Logger {
  debug(message: string, extras?: KeyObject): void {
    const extraInfo = extras ? JSON.stringify(extras) : "(none)"
    console.debug(`DEBUG: ${message} - Extra: ${extraInfo}`)
  }

  verbose(message: string, extras?: KeyObject): void {
    const extraInfo = extras ? JSON.stringify(extras) : "(none)"
    console.debug(`${message} - Extra: ${extraInfo}`)
  }

  error(stacktraceError: Error, title: string, message: string, extras?: KeyObject): void {
    console.error(
      `ERROR: ${title}, message: ${message || stacktraceError.message}, extras: ${JSON.stringify({
        stacktraceError,
        extras
      })}`
    )
  }
}
