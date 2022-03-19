import { SubredditController, SubredditControllerImpl } from "../controller/subreddit_controller"
import { ConsoleLogger, Logger } from "../logger"
import { RedditHttp } from "../service"

export enum Dependency {
  Logger,
  SubredditController,
  RedditHttp
}

class DiContainer {
  private overrides: { [key in Dependency]?: unknown } = {}
  private singletons: Map<Dependency, unknown> = new Map()

  override<T>(dependency: Dependency, value: T): void {
    this.overrides[dependency] = value
  }

  reset(): void {
    this.singletons = new Map()
    this.overrides = {}
  }

  logger(): Logger {
    return this.getOverride(Dependency.Logger) || new ConsoleLogger()
  }

  redditHttp(): RedditHttp {
    return this.getOverride(Dependency.RedditHttp) || new RedditHttp(this.logger())
  }

  subredditController(): SubredditController {
    return (
      this.getOverride(Dependency.SubredditController) ||
      new SubredditControllerImpl(this.redditHttp(), this.logger())
    )
  }

  private getOverride<T>(dependency: Dependency): T | undefined {
    const overrideValue = this.overrides[dependency] as T
    if (overrideValue) return overrideValue
    return undefined
  }
}

export const DI = new DiContainer()
